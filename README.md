# Vijayaadhithan Tamilselvan — Portfolio

Professional portfolio covering enterprise AI engineering, hybrid search, conversational commerce, data systems, and research. The site uses semantic HTML, responsive CSS, and lightweight JavaScript, with no build or dependency installation required.

## Local preview

Open `index.html` directly, or rebuild the versioned assets and serve the directory:

```sh
python3 scripts/build-assets.py
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit `http://127.0.0.1:4173`. Relative links support both direct file previews and GitHub Pages project hosting at `/web/`.

## Content map

- `index.html`: professional introduction, Accenture outcomes, experience, selected products, research, skills, education, and contact.
- `work/querix-search.html`: search, catalog ETL, frontend, and analytics responsibilities.
- `work/conversational-commerce.html`: commerce ETL, conversation state, catalog storage, and Qdrant retrieval.
- `work/enterprise-ai.html`: Accenture contributions, component ownership, and reported outcomes.
- `work/swedish-htr.html`: university team project and contextualized historical evaluation.
- `work/doorstep.html`: web and native Android marketplace architecture.
- `work/staffing-assistant.html`: enterprise staffing prototype.
- `work/twitch-sustainability.html`: master's thesis, methods, and limitations.
- `assets/css/main.css`: off-white, charcoal, and muted-blue design system, responsive homepage, and motion styles.
- `assets/css/portfolio.css`: shared case-study layouts and the illustrative commerce walkthrough.
- `assets/css/site.css`: generated stylesheet combining the homepage and case-study styles. Every page references the same content-versioned bundle, preventing older cached styles from being mixed with newer markup.
- `scripts/build-assets.py`: regenerate the bundle and update the CSS and JavaScript versions in all eight HTML pages after editing source assets.
- `assets/js/main.js`: accessible navigation, reading progress, section tracking, reveal effects, motion control, and commerce example steps.
- `images/og-professional.png`: social preview matching the new positioning and visual direction.
- `images/vijayaadhithan-portrait.png`: the author's supplied `Downloads/me.png`, copied unchanged. The homepage uses CSS framing to display it; the earlier outdoor portrait is not referenced.

## Content and evidence

The November 2026 update uses the supplied project READMEs, resumes, thesis, and the author's additional descriptions of Accenture work. Each public project links to its documentation; enterprise work is identified as professional experience rather than a public benchmark.

- Source identification is explicitly separate from the downstream retrieval agent.
- The reported 40% reduction concerns candidate projects per claim, not a measured 40% token reduction.
- The ontology's reported 3% accuracy improvement is not characterized as percentage points; its baseline and metric definition were not supplied.
- The author subsequently supplied the figures to use: average matching accuracy from 40% to over 80% (93% peak), 85% binning coverage, over 10,000 claims per run, 25% lower batch-processing time, and missed projects reduced from 500/week to fewer than 10/week. These replace the earlier conflicting values in the site copy.
- Honda Agent contributions include concurrent LLM extraction, Pandas-based multi-format ingestion, tri-layer confidence scoring, and contribution to securing an enterprise contract. Source identification, ontology work, retrieval evaluation, and the separate claims-analysis workstream retain their own scope.
- HTR metrics include the repository's experimental context and both CER and WER.
- Commerce examples are illustrative, make no live requests, and preserve historical-price and private-access boundaries.
- `documents/Vjaadhi_Resume_1.pdf` remains the supplied canonical resume. The additional experience is included in the site; the original PDF has not been rewritten.
- `documents/Thesis.pdf` is the supplied research document. The commercial agreement and its personal and financial details are not included in the public files.

The homepage prioritizes a recruiter's first scan: role, specialization, resume, and three Accenture outcomes, followed by concise experience and project summaries. Full technical context remains on the case-study pages.

The commerce walkthrough supports keyboard-operated buttons and an announced state region. Navigation uses ordinary links; case-study content does not depend on JavaScript. Motion includes short entrance transitions, workflow lines, pipeline reveals, and a reading-progress indicator. Continuous motion pauses offscreen and in background tabs. The footer control pauses animations across the browsing session; system reduced-motion preferences are respected, including changes made while the page is open.

### Repository availability

Public requests on 8 November 2026 returned 404 for these supplied URLs (both repository roots and README pages):

- https://github.com/Vijayaadhithan/querix-semantic-search
- https://github.com/Vijayaadhithan/ETL_Pipeline
- https://github.com/Vijayaadhithan/querixco

Their case-study content is grounded in the current local checkouts. Visitor-facing links use the accessible Querix architecture, pipeline, and developer documentation instead. Recheck availability before adding public source-code buttons; a 404 does not establish whether a repository is private, renamed, or removed.

The conversational commerce, commerce ETL, Swedish HTR, and DoorStep README links returned 200. No repository permissions were changed.
