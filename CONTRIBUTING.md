# Contributing to mujina.org

This repository is the source of [mujina.org](https://mujina.org),
the Mujina project's website. Pull requests are welcome, and most
changes here are small: a wording fix, a corrected fact, a
compatibility-matrix row. Those need no discussion; if the change
is obviously correct and self-contained, open the PR.

## Small edits, from the site itself

Every page ends with an "Edit this page on GitHub" link. It opens
the page's markdown in GitHub's web editor, forks the repository
into your account if you lack write access, commits your edit to a
branch there, and offers to open the pull request, all in the
browser. This is the right path for typos, wording, and single-page
corrections.

## Larger changes, locally

For a new page, a reorganization, or anything touching several
files, open an issue here first so the shape can be agreed before
you write. Then work from a clone; the [README](README.md) covers
setup. Two rules:

- Read [AGENTS.md](AGENTS.md) before writing. It records the
  site's conventions: the Diataxis organization, the prose
  register (plain technical English, like a good man page), and
  the vocabulary rules. Contributions are reviewed against it.
- Run `just checks` before you open the PR. It builds the site and
  fails on dead internal links.

## The compatibility matrix

The [matrix](reference/hardware-compatibility.md) describes work by
several authors, and the authors know it best: if you maintain a
fork or a board driver, its row is yours to keep accurate. State
only what is verifiable, link the repository where the code lives,
and prefer understatement to optimism.

## Commits

Make each commit exactly one logical change. One-change commits
can be reverted cleanly and reviewed quickly, and the site should
build after every one. A good test: if the subject line needs
"and", you probably have two commits.

Messages follow [conventional
commits](https://www.conventionalcommits.org/), with the subject
in imperative mood ("add", not "added") and the body explaining
what and why, wrapped at 72 characters:

```
feat: add a board guide for the EmberOne/00

Cover flashing the USB-serial firmware and starting the miner,
adapted from the in-tree notes. The matrix's guide column gains
its third entry.
```

Common types here: `feat` for new pages or sections, `fix` for
factual corrections, `style` for wording and formatting, `chore`
for build and deploy plumbing.

## Pull requests

Rebase on the latest `main`, run `just checks`, and give the PR a
conventional-commit title. Commit messages describe the individual
changes; use the PR body for context that ties them together. If
the work is unfinished but you want early feedback, open the PR as
a draft.
