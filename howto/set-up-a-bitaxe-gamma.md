# Set Up a Bitaxe Gamma

This guide takes a stock Bitaxe Gamma and puts it under Mujina's
control: flash the board's ESP32 with rhapd-bitaxe-gamma, connect
it, and start the miner. It assumes you can build and run
mujina-minerd; if not, take the [tutorial](/tutorial/first-run)
first.

The board ships with esp-miner, firmware that mines on its own.
Under Mujina the ESP32 stops mining. The [rhapd-bitaxe-gamma]
firmware passes the ASIC's serial bus, I2C, GPIO, and ADC through
USB. mujina-minerd on your computer drives the board through those
connections.

rhapd-bitaxe-gamma replaces bitaxe-raw, which is deprecated. Mujina
still drives a board that runs bitaxe-raw. To move such a board to
rhapd-bitaxe-gamma, flash it with the steps below.

::: info Current as of September 2026
The flashing steps follow the [rhapd-bitaxe-gamma] README; where
they drift, the README wins.
:::

## What you need

- A Bitaxe Gamma and its power supply.
- A USB data cable to your Linux machine.
- The Rust toolchain, installed with [rustup](https://rustup.rs).
- The [just](https://just.systems) command runner:

  ```bash
  cargo install just --locked
  ```

- Python 3, which the flash recipe runs.
- Permission to open serial devices. On Debian and Ubuntu, add
  yourself to the `dialout` group, then log in again:

  ```bash
  sudo usermod -aG dialout $USER
  ```

## Flash rhapd-bitaxe-gamma

Clone the firmware and install its toolchain:

```bash
git clone https://github.com/256foundation/rhapd-bitaxe-gamma.git
cd rhapd-bitaxe-gamma
just setup-tools
```

`just setup-tools` installs espup, the esp Rust toolchain, and
espflash, each at the version the repository's justfile names.

Hold the BOOT button while attaching power. That puts the ESP32 in
its bootloader. With the board attached over USB, build and flash:

```bash
just flash
```

The recipe restarts the board into rhapd-bitaxe-gamma when the
flash finishes.

To flash the board again later, run `just flash` with no button
pressed. rhapd-bitaxe-gamma accepts a command that reboots it into
the bootloader, and the recipe sends that command first. To return
to stock or to flash any other firmware, hold BOOT while attaching
power, as above.

## Check the serial ports

With rhapd-bitaxe-gamma running, the board presents two USB serial
ports:

```bash
ls /dev/ttyACM*
```

The first port carries board control (I2C, GPIO, ADC); the second
carries the ASIC's serial bus. mujina-minerd finds and claims both
on its own; you never open them yourself.

## Start the miner

From your mujina clone, start the daemon with your pool settings:

```bash
MUJINA_POOL_URL="stratum+tcp://pool.example.com:3333" \
MUJINA_POOL_USER="your-address.worker" \
  cargo run --bin mujina-minerd
```

The daemon discovers the board over USB and starts scheduling jobs
to it. Watch the log for the board connecting, and check your
pool's dashboard for the worker. The board also appears in the REST
API under `/api/v0/boards`.

## Related pages

- Pool settings in detail: [Connect to a
  Pool](/howto/connect-to-a-pool).
- Every variable the daemon reads: [Environment
  Variables](/reference/environment-variables).
- The board's status row: [Hardware
  Compatibility](/reference/hardware-compatibility).

[rhapd-bitaxe-gamma]: https://github.com/256foundation/rhapd-bitaxe-gamma
