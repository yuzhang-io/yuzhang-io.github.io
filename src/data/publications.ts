// ---------------------------------------------------------------------------
// Publication list. This is the single source of truth for /publications.
//
// To add a paper: copy a block, put it in the right year, keep years newest
// first. Wrap your own name in **double asterisks** and it renders bold.
// Everything except `title`, `authors`, `venue` and `year` is optional.
//
// A preprint goes in this same list with kind: "preprint" and
// note: "Preprint". That renders the badge and keeps it out of the
// peer-reviewed count in the page header.
//
// Last verified against Crossref: 2026-11-04
// ---------------------------------------------------------------------------

export type PubKind = "article" | "chapter" | "conference" | "preprint";

export interface Publication {
  title: string;
  /** Semicolon-separated. Wrap your name in **asterisks** to bold it. */
  authors: string;
  venue: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  /** Use only when there is no DOI. */
  url?: string;
  kind?: PubKind;
  /** Short status line, e.g. "Accepted". Leave out for published papers. */
  note?: string;
  /** Optional press coverage, rendered as a small line under the venue. */
  press?: { label: string; url: string }[];
}

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Quantitative systems pharmacology model predicts enhanced antitumor efficacy of combined CTLA-4 and PD-1 blockade in a syngeneic mouse model of breast cancer",
    authors:
      "**Zhang, Y.**; Wang, H.; Furukawa, N.; Patil, A.; Arulraj, T.; Popel, A. S.",
    venue: "ACS Pharmacology & Translational Science",
    volume: "9(10)",
    pages: "2877–2888",
    year: 2026,
    doi: "10.1021/acsptsci.6c00347",
  },
  {
    title:
      "FlashBind: Towards accurate and efficient structure-based virtual screening",
    authors:
      "Jiang, S.; Chen, Y.; Krishnan, A.; **Zhang, Y.**; Jin, W.",
    venue: "Transactions on Machine Learning Research (TMLR)",
    year: 2026,
    kind: "conference",
    note: "Accepted",
    doi: "10.64898/2025.12.22.695983",
  },
  {
    title: "A generative deep learning approach to de novo antibiotic design",
    authors:
      "Krishnan, A.; Anahtar, M. N.; Valeri, J. A.; Jin, W.; Donghia, N. M.; Sieben, L.; Luttens, A.; **Zhang, Y.**; … ; Wong, F.; Collins, J. J.",
    venue: "Cell",
    volume: "188(21)",
    pages: "5962–5979.e22",
    year: 2025,
    doi: "10.1016/j.cell.2025.07.033",
    press: [
      { label: "BBC", url: "https://www.bbc.com/news/articles/cgr94xxye2lo" },
      { label: "MIT News", url: "https://news.mit.edu/2025/using-generative-ai-researchers-design-compounds-kill-drug-resistant-bacteria-0814" },
      { label: "CNET", url: "https://www.cnet.com/tech/services-and-software/generative-ai-gave-mit-scientists-a-new-tool-to-fight-antibiotic-resistant-bacteria/" },
      { label: "IEEE Spectrum", url: "https://spectrum.ieee.org/ai-drug-design-mit-antibiotics" },
    ],
  },
  {
    title:
      "Promoting vascular stability through Src inhibition and Tie2 activation: A model-based analysis",
    authors: "**Zhang, Y.**; Kontos, C. D.; Annex, B. H.; Popel, A. S.",
    venue: "iScience",
    volume: "28(6)",
    pages: "112625",
    year: 2025,
    doi: "10.1016/j.isci.2025.112625",
  },
  {
    title:
      "Accelerating scientific discovery with autonomous goal-evolving agents",
    authors:
      "Du, Y.; Yu, B.; Liu, T.; Shen, T.; Chen, J.; Rittig, J. G.; Sun, K.; Zhang, Y. (Yikun); Krishnan, A.; **Zhang, Y.**; … ; Head-Gordon, T.; Gomes, C. P.; Sun, H.; Duan, C.; Schwaller, P.; Jin, W.",
    venue: "arXiv:2512.21782",
    year: 2025,
    kind: "preprint",
    note: "Preprint",
    doi: "10.48550/arXiv.2512.21782",
  },
  {
    title:
      "Signaling-biophysical modeling unravels mechanistic control of red blood cell phagocytosis by macrophages in sickle cell disease",
    authors:
      "**Zhang, Y.**; Qiang, Y.; Li, H.; Li, G.; Lu, L.; Dao, M.; Karniadakis, G. E.; Popel, A. S.; Zhao, C.",
    venue: "PNAS Nexus",
    volume: "3(2)",
    pages: "pgae031",
    year: 2024,
    doi: "10.1093/pnasnexus/pgae031",
  },
  {
    title:
      "Virtual clinical trials via a QSP immuno-oncology model to simulate the response to a conditionally activated PD-L1-targeting antibody",
    authors:
      "Ippolito, A.; Wang, H.; **Zhang, Y.**; Vakil, V.; Popel, A. S.",
    venue: "Journal of Pharmacokinetics and Pharmacodynamics",
    volume: "51(6)",
    pages: "747–757",
    year: 2024,
    doi: "10.1007/s10928-024-09928-5",
  },
  {
    title:
      "Eliciting the antitumor immune response with a conditionally activated PD-L1 targeting antibody analyzed with a quantitative systems pharmacology model",
    authors:
      "Ippolito, A.; Wang, H.; **Zhang, Y.**; Vakil, V.; Bazzazi, H.; Popel, A. S.",
    venue: "CPT: Pharmacometrics & Systems Pharmacology",
    volume: "13(1)",
    pages: "93–105",
    year: 2024,
    doi: "10.1002/psp4.13060",
  },
  {
    title:
      "A mechanistic systems biology model of brain microvascular endothelial cell signaling reveals dynamic pathway-based therapeutic targets",
    authors:
      "Li, G.; Ma, Y.; Zhang, S.; Lin, W.; Yao, X.; Zhou, Y.; Zhao, Y.; Rao, Q.; Qu, Y.; Gao, Y.; Chen, L.; **Zhang, Y.**; Han, F.; Sun, M.; Zhao, C.",
    venue: "Redox Biology",
    volume: "78",
    pages: "103415",
    year: 2024,
    doi: "10.1016/j.redox.2024.103415",
  },
  {
    title:
      "Combining multikinase tyrosine kinase inhibitors targeting the VEGF and CD47 signaling pathways is predicted to increase the efficacy of antiangiogenic combination therapies",
    authors: "**Zhang, Y.**; Popel, A. S.; Bazzazi, H.",
    venue: "ACS Pharmacology & Translational Science",
    volume: "6(5)",
    pages: "710–726",
    year: 2023,
    doi: "10.1021/acsptsci.3c00008",
  },
  {
    title:
      "Using quantitative systems pharmacology modeling to optimize combination therapy of anti-PD-L1 checkpoint inhibitor and T cell engager",
    authors:
      "Anbari, S.; Wang, H.; **Zhang, Y.**; Wang, J.; Pilvankar, M.; Nickaeen, M.; Hansel, S.; Popel, A. S.",
    venue: "Frontiers in Pharmacology",
    volume: "14",
    pages: "1163432",
    year: 2023,
    doi: "10.3389/fphar.2023.1163432",
  },
  {
    title:
      "Systems biology of angiogenesis signaling: Computational models and omics",
    authors:
      "**Zhang, Y.**; Wang, H.; Oliveira, R. H. M.; Zhao, C.; Popel, A. S.",
    venue: "WIREs Mechanisms of Disease",
    volume: "14(4)",
    pages: "e1550",
    year: 2022,
    doi: "10.1002/wsbm.1550",
    press: [
      { label: "Advanced Science News", url: "https://www.advancedsciencenews.com/decoding-the-language-of-cells-with-virtual-modeling/" },
    ],
  },
  {
    title:
      "Systems biology modeling of endothelial cell and macrophage signaling in angiogenesis in human diseases",
    authors: "**Zhang, Y.**; Zhao, C.; Popel, A. S.",
    venue: "The Vasculome (Elsevier)",
    pages: "163–172",
    year: 2022,
    kind: "chapter",
    doi: "10.1016/B978-0-12-822546-2.00021-6",
  },
  {
    title:
      "Dynamic multiscale regulation of perfusion recovery in experimental peripheral arterial disease",
    authors:
      "Zhao, C.; Heuslein, J. L.; **Zhang, Y.**; Annex, B. H.; Popel, A. S.",
    venue: "JACC: Basic to Translational Science",
    volume: "7(1)",
    pages: "28–50",
    year: 2022,
    doi: "10.1016/j.jacbts.2021.10.014",
  },
  {
    title:
      "A systems biology model of junctional localization and downstream signaling of the Ang–Tie signaling pathway",
    authors: "**Zhang, Y.**; Kontos, C. D.; Annex, B. H.; Popel, A. S.",
    venue: "npj Systems Biology and Applications",
    volume: "7(1)",
    pages: "34",
    year: 2021,
    doi: "10.1038/s41540-021-00194-6",
  },
  {
    title:
      "Angiopoietin-Tie signaling pathway in endothelial cells: A computational model",
    authors: "**Zhang, Y.**; Kontos, C. D.; Annex, B. H.; Popel, A. S.",
    venue: "iScience",
    volume: "20",
    pages: "497–511",
    year: 2019,
    doi: "10.1016/j.isci.2019.10.006",
  },
  {
    title:
      "Mechanistically detailed systems biology modeling of the HGF/Met pathway in hepatocellular carcinoma",
    authors:
      "Jafarnejad, M.; Sové, R. J.; Danilova, L.; Mirando, A. C.; **Zhang, Y.**; Yarchoan, M.; Tran, P. T.; Pandey, N. B.; Fertig, E. J.; Popel, A. S.",
    venue: "npj Systems Biology and Applications",
    volume: "5(1)",
    pages: "29",
    year: 2019,
    doi: "10.1038/s41540-019-0107-2",
  },
  {
    title:
      "Mechanistic computational models of microRNA-mediated signaling networks in human diseases",
    authors: "Zhao, C.; **Zhang, Y.**; Popel, A. S.",
    venue: "International Journal of Molecular Sciences",
    volume: "20(2)",
    pages: "421",
    year: 2019,
    doi: "10.3390/ijms20020421",
  },
  {
    title:
      "Three-dimensional transport model for intravitreal and suprachoroidal drug injection",
    authors:
      "**Zhang, Y.**; Bazzazi, H.; Lima e Silva, R.; Pandey, N. B.; Green, J. J.; Campochiaro, P. A.; Popel, A. S.",
    venue: "Investigative Ophthalmology & Visual Science",
    volume: "59(12)",
    pages: "5266–5276",
    year: 2018,
    doi: "10.1167/iovs.17-23632",
  },
  {
    title:
      "Computer simulation of TSP1 inhibition of VEGF–Akt–eNOS: An angiogenesis triple threat",
    authors:
      "Bazzazi, H.; **Zhang, Y.**; Jafarnejad, M.; Isenberg, J. S.; Annex, B. H.; Popel, A. S.",
    venue: "Frontiers in Physiology",
    volume: "9",
    pages: "644",
    year: 2018,
    doi: "10.3389/fphys.2018.00644",
  },
  {
    title:
      "Computational modeling of synergistic interaction between αVβ3 integrin and VEGFR2 in endothelial cells",
    authors: "Bazzazi, H.; **Zhang, Y.**; Jafarnejad, M.; Popel, A. S.",
    venue: "Journal of Theoretical Biology",
    volume: "455",
    pages: "212–221",
    year: 2018,
    doi: "10.1016/j.jtbi.2018.06.029",
  },
];
