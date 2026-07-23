# Hardware Compatibility

Mujina aims to run any hashboard from any vendor. Mujina is not
ported to a board: a driver for the board is added to Mujina, and
the shared core does the rest. Drivers arrive board by board. Some
live outside the main repository, in forks. This matrix records
where each board stands.

Status vocabulary, used consistently below:

- **Working**: runs in mainline Mujina today.
- **In progress**: code exists, but support is incomplete.
- **In a fork**: works, but in a fork that mainline may diverge from.

Fork support is usually on its way to mainline: either its author
is refining it for merging, or that refining waits for someone to
take it up.

## Matrix

| Hardware                    | Status      | Where the code lives  | Guide          |
|-----------------------------|-------------|-----------------------|----------------|
| Bitaxe Gamma                | Working     | [mainline]            | [setup guide]  |
| CPU backend (no hardware)   | Working     | [mainline]            | [the tutorial] |
| EmberOne/00                 | Working     | [mainline]            | none yet       |
| Antminer S19j Pro, S19k Pro | In a fork   | [Schnitzel's fork]    | none yet       |
| Intel BZM2 boards           | In progress | [johnny9's fork]      | none yet       |

[mainline]: https://github.com/256foundation/mujina
[bitaxe-raw]: https://github.com/bitaxeorg/bitaxe-raw
[EmberOne USB-serial]: https://github.com/256foundation/emberone-usbserial-fw
[Schnitzel's fork]: https://github.com/Schnitzel/mujina
[johnny9's fork]: https://github.com/johnny9/mujina/tree/bonanza
[setup guide]: /howto/set-up-a-bitaxe-gamma
[the tutorial]: /tutorial/first-run

## Board notes

### Bitaxe Gamma

One BM1370 ASIC, about 1 TH/s at stock settings. Mining, hardware
monitoring, and the REST API are functional. The board's ESP32 must
run the [bitaxe-raw] firmware, which passes the ASIC's serial bus
through USB; [Set Up a Bitaxe
Gamma](/howto/set-up-a-bitaxe-gamma) covers flashing it and
starting the miner.

For a newcomer who wants real hardware, this is the board to start
with: open source, single chip, cheap, and the one mainline
development happens on.

### CPU backend

A virtual board: software SHA-256 hashing at a few MH/s per
thread, for development and testing. Enabled by environment
variable; see [Environment
Variables](/reference/environment-variables).

### EmberOne/00

Twelve BM1362 ASICs. The 256 Foundation's open source hashboard, a
sister project to Mujina. The board's USB interface runs the
[EmberOne USB-serial] firmware. Mainline support works today. The
driver is being reworked and under active development.

### Antminer S19j Pro, S19k Pro

BM1362-family ASICs. Support lives in [Schnitzel's fork], where it
powers RY3T Nova prototypes on S19 hardware; it has not been merged
into mainline. Getting Mujina onto an S19's stock control board also
takes a loader; approaches are collected in [this forum
thread][s19-loader].

Bringing this work into mainline and making it product-grade is a
current focus. Until then, running Mujina on an S19
means prototype software and an unsettled install path, not a
replacement for stock firmware.

[s19-loader]: https://forum.256foundation.org/t/best-practices-for-hacking-mujina-onto-other-miners/48

### Intel BZM2

Bonanza Mine 2 ASICs. Driver work is in progress in [johnny9's
fork], on the `bonanza` branch; nothing has merged into mainline.

## Corrections

This page is current as of July 2026. Rows describe work by several
authors, and the authors know it best: if you maintain a fork or a
driver and your row is missing or wrong, [edit this page][edit] or
say so in the [Telegram group][telegram].

[edit]: https://github.com/256foundation/mujina-website
[telegram]: https://t.me/the256foundation
