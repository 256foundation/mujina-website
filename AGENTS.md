# AGENTS.md

Guidance for AI agents and human contributors working on this
repository.

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution
workflow: commit atomicity, conventional commit messages, and pull
request expectations. This file covers what CONTRIBUTING.md does
not: the site's structure, conventions, and editorial rules.

## What this repository is

The source for [mujina.org](https://mujina.org), the user-facing
website of the Mujina open source Bitcoin mining firmware project.
The site is built with VitePress and deployed to GitHub Pages by
GitHub Actions. The Mujina source code lives elsewhere:
<https://github.com/256foundation/mujina>.

## Tech stack

- VitePress 1.x with the default theme. No plugins.
- Theme customization is CSS-only: design tokens and overrides in
  `.vitepress/theme/custom.css`. Comments there record color
  rationale and WCAG contrast constraints; keep them true.
- Site config, nav, and sidebar: `.vitepress/config.mts`.
- Static assets in `public/`, derived from the mascot art.
- `just` is the command runner and the source of truth for build
  commands. The deploy workflow is plumbing around it.

## Developing

Run `just` with no arguments to list recipes. The ones that matter:

```
just install    # npm install
just dev        # dev server with hot reload
just build      # static build to .vitepress/dist (honors DOCS_BASE)
just preview    # build, then serve the production build
just ci         # what CI runs: npm ci + build
```

Always verify with `just build` before committing; it fails on dead
internal links.

## Content organization: Diataxis

Pages are organized strictly by [Diataxis](https://diataxis.fr)
mode, and the sidebar mirrors the structure:

- `tutorial/` - lessons; the reader learns by guided doing
- `howto/` - task-oriented guides for competent users
- `reference/` - neutral facts, optimized for lookup
- `explanation/` - context and reasoning, read away from the work
- `index.md` (landing) and `community.md` sit outside the modes

Keep each page in one mode; link across modes instead of mixing
them. A how-to does not teach, a reference does not instruct, an
explanation contains no steps.

## Content conventions

- The in-tree docs of the main Mujina repository are canonical for
  developer detail. Site guides adapt them and carry a "current as
  of <month year>" note; update the note when revising a page.
- The compatibility matrix (`reference/hardware-compatibility.md`)
  uses a fixed status vocabulary (Working, In progress, In a fork,
  Proposed) and describes work by several authors. State only what
  is verifiable, link the author's repository, and prefer
  understatement to optimism.
- Real command output beats invented output. The tutorial's log and
  API excerpts were captured from an actual run; keep that standard
  when updating them.
- The editorial voice is institutional: the project and the 256
  Foundation act; the site names no individual as its face or
  maintainer. Naming a fork's author in the matrix is factual
  attribution and fine.
- The site asks for no donations. Support routes to the 256
  Foundation (`community.md`, "Supporting this work"); keep that a
  redirect, not a pitch.
- Project maturity is stated the way the matrix states board
  status: plain declaratives, a "current as of" date, no promised
  dates, trajectory described as work in motion.
  `explanation/status.md` is the pattern.
- Show candor, never claim it: the words "honest" and "honestly" do
  not appear in site copy. State the plain fact and let it speak.
- "Rackmount" is not this domain's word. Prefer "industrial
  machines" or a concrete class like "S19-class".
- The 256 Foundation hashboard is spelled "EmberOne/00".
- Mujina is not "ported" to boards; a driver for the board is
  added to Mujina. Never use "port" for board support. Network
  ports are fine.
- Board guides (hardware details, firmware flashing) belong on
  this site, not as links into the source repository; the in-tree
  guides will eventually move here.
- The Linux kernel analogy lives in exactly two places: asserted on
  the landing page, developed on why-mujina. Do not add it to a
  third page.
- "Pipeline" is the source repository's internal vocabulary; site
  copy says "the miner" or names its concrete parts (scheduler,
  hash threads) instead.
- Register: plain technical English, like a good man page. Prefer
  short Anglo-Saxon verbs over Latinate ones (use, not utilize;
  show, not demonstrate; start, not initiate). Choose the verb an
  engineer would say aloud. No metaphor, no drama, no
  throat-clearing introductions. If a sentence works without an
  adjective, delete the adjective.
- No faulty coordination: never join unrelated clauses with "and"
  (e.g. "owners write the drivers, and the matrix tracks each
  board's state"). One assertion per sentence; keep the subject
  steady. Cut a second point before cramming it in, especially in
  feature cards, where the link text often already carries it.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main`. The same
workflow serves production and fork previews: `DOCS_BASE` sets the
site base path (`/` in production, `/<repo-name>/` on forks), and
the CNAME for mujina.org is emitted only when building the
production repository. If the repository is renamed, update
`PRODUCTION_REPO` in the workflow.
