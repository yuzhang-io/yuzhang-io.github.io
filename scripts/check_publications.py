#!/usr/bin/env python3
"""
Find papers that are not yet in src/data/publications.ts and add them.

Run by .github/workflows/check-publications.yml on a schedule. It never
pushes to main: it writes the changes to a branch and the workflow opens a
pull request, because author matching on a name as common as "Yu Zhang"
cannot be trusted to be right every time. Review the diff before merging.

Two sources, deliberately narrow:

  1. ORCID 0000-0003-3643-6589 - Yu's own record, so it is unambiguous.
     It is only as complete as she keeps it.
  2. Crossref - papers that list BOTH a "Zhang, Yu" AND one of her known
     collaborators. The collaborator is what makes this safe; searching
     Crossref for "Yu Zhang" alone returns hundreds of other people.

Standard library only, so the workflow needs no pip install.
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ORCID = "0000-0003-3643-6589"
COLLABORATORS = ["Popel", "Collins", "Jin", "Zhao", "Annex", "Kontos", "Bazzazi"]
SINCE = "2017-01-01"
DATA_FILE = "src/data/publications.ts"
UA = {"User-Agent": "yuzhang-io-publication-check/1.0"}

# DOI prefixes and venues that are not papers: preprint mirrors of work
# already listed, and conference abstracts published in journal supplements.
SKIP_DOI_PREFIX = ("10.2139/",)            # SSRN
SKIP_VENUE_PATTERNS = (re.compile(r"faseb", re.I),)


def fetch(url: str, accept_json: bool = True, tries: int = 5):
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            if accept_json:
                req.add_header("Accept", "application/json")
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 503):
                time.sleep(5 * (attempt + 1))
                continue
            raise
        except urllib.error.URLError:
            time.sleep(3 * (attempt + 1))
    raise RuntimeError(f"gave up fetching {url}")


def existing_dois() -> set[str]:
    src = open(DATA_FILE, encoding="utf-8").read()
    return {d.lower() for d in re.findall(r'doi:\s*"([^"]+)"', src)}


def is_yu(author: dict) -> bool:
    return (author.get("family", "") or "").lower() == "zhang" and (
        author.get("given", "") or ""
    ).lower().startswith("yu")


def from_orcid() -> set[str]:
    out = set()
    data = fetch(f"https://pub.orcid.org/v3.0/{ORCID}/works")
    for group in data.get("group") or []:
        summary = group["work-summary"][0]
        for eid in (summary.get("external-ids") or {}).get("external-id") or []:
            if eid.get("external-id-type") == "doi":
                out.add((eid.get("external-id-value") or "").lower())
    return {d for d in out if d}


def from_crossref() -> set[str]:
    out = set()
    for collab in COLLABORATORS:
        offset = 0
        while offset < 300:
            url = (
                "https://api.crossref.org/works?rows=100"
                f"&offset={offset}"
                f"&filter=from-pub-date:{SINCE},type:journal-article"
                "&select=DOI,author,container-title"
                f"&query.author={urllib.parse.quote(collab)}"
            )
            try:
                items = fetch(url)["message"]["items"]
            except Exception as exc:  # one bad collaborator must not kill the run
                print(f"  ! crossref {collab} offset={offset}: {exc}", file=sys.stderr)
                break
            if not items:
                break
            for it in items:
                authors = it.get("author") or []
                if not any(is_yu(a) for a in authors):
                    continue
                if not any(
                    (a.get("family", "") or "").lower() == collab.lower()
                    for a in authors
                ):
                    continue
                out.add((it.get("DOI") or "").lower())
            offset += 100
            time.sleep(1)
    return {d for d in out if d}


def crossref_meta(doi: str) -> dict | None:
    try:
        return fetch(f"https://api.crossref.org/works/{urllib.parse.quote(doi)}")["message"]
    except Exception:
        return None


def initials(given: str) -> str:
    return "".join(part[0] + "." for part in given.split() if part)


def format_authors(authors: list[dict]) -> str:
    names = []
    for a in authors:
        fam = a.get("family") or a.get("name") or "?"
        label = f"{fam}, {initials(a.get('given', ''))}".rstrip(", ")
        names.append(("**" + label + "**") if is_yu(a) else label)
    if len(names) <= 9:
        return "; ".join(names)
    # long list: keep the lead authors, Yu, and the senior authors
    yu = next((i for i, n in enumerate(names) if n.startswith("**")), None)
    keep = set(range(5)) | {len(names) - 2, len(names) - 1}
    if yu is not None:
        keep.add(yu)
    out, previous = [], None
    for i in sorted(keep):
        if previous is not None and i != previous + 1:
            out.append("…")
        out.append(names[i])
        previous = i
    return "; ".join(out).replace("; …; ", "; … ; ")


def ts_entry(meta: dict) -> str:
    title = (meta.get("title") or ["Untitled"])[0]
    title = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", title)).strip()
    venue = (meta.get("container-title") or ["?"])[0]
    year = (meta.get("issued", {}).get("date-parts") or [[None]])[0][0] or 0
    volume, issue = meta.get("volume"), meta.get("issue")
    vol = f"{volume}({issue})" if volume and issue else (volume or "")
    # journals that use article numbers (eads4699) expose it as article-number
    pages = meta.get("page") or meta.get("article-number") or ""

    def esc(s: str) -> str:
        return s.replace("\\", "\\\\").replace('"', '\\"')

    lines = [
        "  {",
        f'    title:\n      "{esc(title)}",',
        f'    authors:\n      "{esc(format_authors(meta.get("author") or []))}",',
        f'    venue: "{esc(venue)}",',
    ]
    if vol:
        lines.append(f'    volume: "{esc(vol)}",')
    if pages:
        lines.append(f'    pages: "{esc(pages)}",')
    lines.append(f"    year: {year},")
    lines.append(f'    doi: "{meta.get("DOI")}",')
    lines.append("  },")
    return "\n".join(lines)


def main() -> int:
    have = existing_dois()
    print(f"{len(have)} DOIs already in {DATA_FILE}")

    candidates = set()
    try:
        orcid = from_orcid()
        print(f"  ORCID    : {len(orcid)} works")
        candidates |= orcid
    except Exception as exc:
        print(f"  ! ORCID failed: {exc}", file=sys.stderr)
    try:
        cr = from_crossref()
        print(f"  Crossref : {len(cr)} works via collaborators")
        candidates |= cr
    except Exception as exc:
        print(f"  ! Crossref failed: {exc}", file=sys.stderr)

    new = sorted(d for d in candidates - have if not d.startswith(SKIP_DOI_PREFIX))
    if not new:
        print("\nNothing new. Publication list is up to date.")
        return 0

    blocks, summary = [], []
    for doi in new:
        meta = crossref_meta(doi)
        if not meta:
            print(f"  ! no Crossref metadata for {doi}, skipping")
            continue
        venue = (meta.get("container-title") or [""])[0]
        if any(p.search(venue) for p in SKIP_VENUE_PATTERNS):
            print(f"  - skipping conference abstract: {doi} ({venue})")
            continue
        year = (meta.get("issued", {}).get("date-parts") or [[0]])[0][0] or 0
        blocks.append((year, ts_entry(meta)))
        title = re.sub(
            r"\s+", " ", re.sub(r"<[^>]+>", "", (meta.get("title") or [""])[0])
        ).strip()[:90]
        summary.append(f"- **{year}** · _{venue}_ · [{doi}](https://doi.org/{doi})\n  {title}")
        time.sleep(0.5)

    if not blocks:
        print("\nNothing new after filtering.")
        return 0

    blocks.sort(key=lambda b: -b[0])
    src = open(DATA_FILE, encoding="utf-8").read()
    anchor = "export const PUBLICATIONS: Publication[] = [\n"
    if anchor not in src:
        print("could not find the PUBLICATIONS array", file=sys.stderr)
        return 1
    src = src.replace(anchor, anchor + "\n".join(b for _, b in blocks) + "\n", 1)
    open(DATA_FILE, "w", encoding="utf-8").write(src)

    body = (
        f"Found {len(blocks)} publication(s) not yet listed.\n\n"
        + "\n".join(summary)
        + "\n\n---\n"
        "Added at the top of the array; the page groups and sorts by year, so "
        "position only affects ordering within a year.\n\n"
        "**Check before merging:** that each paper is actually yours (the "
        "Crossref source matches on surname plus a known collaborator, which is "
        "narrow but not infallible), and that your name is the one in bold.\n"
    )
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as fh:
            fh.write("found=true\n")
            fh.write("body<<PR_BODY_EOF\n" + body + "\nPR_BODY_EOF\n")
    print(f"\nAdded {len(blocks)} entr(y/ies) to {DATA_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
