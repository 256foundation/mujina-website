# Where Mujina Is Today

Mujina is young software with a working core. This page sets out
what works, what does not exist yet, and where the effort is going,
so you can decide what to do with Mujina today: run it, build on
it, or watch it and come back.

::: info Current as of July 2026
This page tracks a moving project. [Follow the
work](#follow-the-work) lists where change shows up first.
:::

## What works today

mujina-minerd is a complete miner: it connects to a Stratum v1
pool, negotiating version rolling, schedules jobs across hash
threads, and submits shares. It drives real hardware end to end,
using the single-chip [Bitaxe
Gamma](/reference/hardware-compatibility#bitaxe-gamma) as a
developer-friendly hashboard, with
temperature and hashrate monitoring and USB hotplug. There is also a
CPU-based virtual hashboard, so the whole miner runs on a Linux
machine with no mining hardware at all; [the
tutorial](/tutorial/first-run) has it working in about fifteen
minutes. A REST API reports live state, can pause and resume mining,
and serves its own Swagger UI. A published container image runs the
daemon anywhere containers run.

## What does not exist yet

Anyone deciding whether to run Mujina should know these gaps up
front:

- **Performance tuning.** There are no frequency, voltage, or power
  controls, and no autotuning.
- **Efficiency numbers.** The project has not measured or published
  J/TH figures on any board.
- **Load control and automation.** The API can pause and resume
  mining; it cannot yet set power targets, schedule boards, or
  work with home automation.
- **Pool failover.** The daemon connects to one pool at a time, and
  only over Stratum v1.
- **Turnkey installation.** There are no prebuilt images. Running
  Mujina means building from source or running the container, and
  installing it on a stock control board is an unsettled problem.
  The goal is Mujina OS: complete operating system images for
  control boards. None exist yet.

## Is Mujina for you yet?

**Developers and tinkerers: yes, today.** The CPU backend puts the
whole system on your machine in minutes, and the Bitaxe Gamma is
cheap real hardware that works today. Start with [the
tutorial](/tutorial/first-run), then [join in](/community).

**Home miners with S19-class machines: not yet as a firmware
replacement.** S19-class support is prototype work in a fork.

**Mining operations: not yet.** Nothing here is production-grade for
a fleet: no tuning, no published efficiency, no fleet management.
Follow the project; do not deploy it yet.

## Where the work is going

[Why Mujina](/explanation/why-mujina) states the aims. The work
happening now:

- **S19-class support in mainline.** Making the prototype S19j/S19k
  Pro fork product-grade and merging it into mainline is a current
  focus.
- **EmberOne/00 bring-up.** Mainline support for the 256 Foundation's
  open hashboard is being reworked and is in progress.
- **Intel BZM2 drivers.** Work in progress lives on [johnny9's bonanza
  branch][bzm2-branch].

The [compatibility matrix](/reference/hardware-compatibility)
records each board's status as this work moves.

## Follow the work

Changes show up in the working channels first:

- [Dev call records][dev-calls]: agendas and records of the regular
  contributor calls, the best summary of recent work.
- [GitHub][repo]: commits, pull requests, and discussions.
- This page and the [matrix](/reference/hardware-compatibility)
  carry "current as of" dates and are updated as things change.

If you looked at Mujina and decided "not yet", the dev call records
and compatibility [matrix](/reference/hardware-compatibility) are
the cheapest way to check back without following day to day.

[bzm2-branch]: https://github.com/johnny9/mujina/tree/bonanza
[dev-calls]: https://github.com/256foundation/mujina/discussions/categories/dev-calls
[repo]: https://github.com/256foundation/mujina
