# Community and Contributing

Mujina is a [256 Foundation](https://256foundation.org) project,
built in the open by software and hardware engineers, protocol
authors, and mining operators. Everything happens in public
channels, and every channel welcomes newcomers.

## Where things happen

- **[GitHub][repo]**: the source, issues, and pull requests.
- **[GitHub Discussions][discussions]**: questions, ideas, and bug
  triage. Start here if you are not sure where something belongs.
- **[The 256 Foundation forum][forum]**: longer-form threads across
  the Foundation's projects, including Mujina.
- **[Telegram][telegram]**: real-time chat with the 256 Foundation
  community.
- **[Dev calls][dev-calls]**: regular calls where contributors
  coordinate, open to anyone who wants to join. Records and agendas
  are posted in the Dev Calls discussion category, so you can follow
  along or catch up without attending.

[repo]: https://github.com/256foundation/mujina
[discussions]: https://github.com/256foundation/mujina/discussions
[forum]: https://forum.256foundation.org
[telegram]: https://t.me/the256foundation
[dev-calls]: https://github.com/256foundation/mujina/discussions/categories/dev-calls

## Contributing code

The project needs more skills than Rust. Board bring-up needs
embedded and hardware people, ideally with the board in hand; most
ASIC protocol work needs reverse engineers; the docs and this site
need writers; and every driver needs testers with hardware. You
don't need an ASIC to start: the CPU backend runs the whole system on any
Linux machine, and [the tutorial](/tutorial/first-run) takes about
fifteen minutes.

The [contribution guide][contributing] is the canonical reference for
process and requirements: how to report a bug, propose a feature, and
get a pull request merged. In short:

- **Found a bug?** Search existing issues and discussions first, then
  open an [Issue Triage discussion][triage].
- **Have an idea?** Open a discussion in the [Ideas
  category][ideas] before writing code.
- **Want to dive in?** Every open issue is ready to work on. Issues
  tagged [good first issue][gfi] suit newcomers.

[contributing]: https://github.com/256foundation/mujina/blob/main/CONTRIBUTING.md
[triage]: https://github.com/256foundation/mujina/discussions/new?category=issue-triage
[ideas]: https://github.com/256foundation/mujina/discussions/new?category=ideas
[gfi]: https://github.com/256foundation/mujina/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22

## Design proposals

Substantial design work is recorded as a MIP, a Mujina Improvement
Proposal, modeled on Bitcoin's BIPs. MIPs live in the
[mujina-mips repository][mips]. Most ideas start and stay as
discussions; an idea becomes a MIP when it needs a written, editable
design document.

[mips]: https://github.com/256foundation/mujina-mips

## Contributing to this site

This site lives in its [own repository][site-repo] and takes pull
requests like any other project; its [contributing
guide][site-contributing] covers the workflow. Every page ends
with an edit link that opens a pull request from your browser. The [compatibility
matrix](/reference/hardware-compatibility) especially depends on the
community: if you
maintain a fork or a board driver, its row is yours to keep
accurate.

[site-repo]: https://github.com/256foundation/mujina-website
[site-contributing]: https://github.com/256foundation/mujina-website/blob/main/CONTRIBUTING.md

## Supporting this work

Mujina is run and funded by the [256
Foundation](https://256foundation.org), which builds open tools for
Bitcoin mining across the whole stack: open hashboard and control
board hardware, and this firmware to run them. Mujina takes no
donations of its own; to support the work, support the Foundation.

## License

Mujina is licensed under the GNU General Public License v3.0 or
later.
