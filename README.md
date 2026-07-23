# mujina.org

The source for [mujina.org](https://mujina.org), the website of the
Mujina open source Bitcoin mining firmware project. The site is
built with [VitePress](https://vitepress.dev) and deployed to
GitHub Pages. The miner firmware itself lives at
<https://github.com/256foundation/mujina>.

## Run the site locally

You need Node.js and [just](https://just.systems/).

```
just install   # npm install
just dev       # dev server with hot reload
```

Run `just` with no arguments to list the other recipes. `just
build` builds the static site and fails on dead internal links; run
it before you open a pull request.

## Where things are

- Pages are markdown, organized by [Diataxis](https://diataxis.fr)
  mode: `tutorial/`, `howto/`, `reference/`, `explanation/`.
  `index.md` is the landing page; `community.md` sits outside the
  modes.
- Nav and sidebar: `.vitepress/config.mts`.
- Theme: CSS-only overrides in `.vitepress/theme/custom.css`.
- Images and other static assets: `public/`.

## Contributing

Pull requests are welcome. [CONTRIBUTING.md](CONTRIBUTING.md)
covers the workflow, commit atomicity, and message conventions.
[AGENTS.md](AGENTS.md) records the site's content conventions: the
organization, the prose register, and what the compatibility
matrix may claim.

The [hardware compatibility
matrix](reference/hardware-compatibility.md) depends on the
community most of all: if you maintain a fork or a board driver,
its row is yours to keep accurate.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on push to
`main`. One workflow serves both cases: `DOCS_BASE` sets the base
path for fork previews, and the CNAME for mujina.org is emitted
only when building the production repository.
