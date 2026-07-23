# Set Up a Bitaxe Gamma

This guide takes a stock Bitaxe Gamma and puts it under Mujina's
control: flash the board's ESP32 with bitaxe-raw, connect it, and
start the miner. It assumes you can build and run mujina-minerd; if
not, take the [tutorial](/tutorial/first-run) first.

The board ships with esp-miner, firmware that mines on its own.
Under Mujina the ESP32 stops mining: the [bitaxe-raw] firmware only
passes the ASIC's serial bus, I2C, GPIO, and ADC through USB, and
mujina-minerd on your computer drives the board.

::: info Current as of July 2026
The flashing steps follow the [bitaxe-raw] README; where they
drift, the README wins.
:::

## What you need

- A Bitaxe Gamma and its power supply.
- A USB data cable to your Linux machine.
- The Rust toolchain, installed with [rustup](https://rustup.rs).
- Permission to open serial devices. On Debian and Ubuntu, add
  yourself to the `dialout` group, then log in again:

```bash
sudo usermod -aG dialout $USER
```

## Flash bitaxe-raw

Install the ESP32 toolchain and the flashing tools:

```bash
RUSTUP_TOOLCHAIN=stable cargo install espup --locked
espup install
cargo install cargo-espflash espflash --locked
```

Load the environment espup installed:

```bash
. $HOME/export-esp.sh
```

With the board attached over USB, build and flash:

```bash
git clone https://github.com/bitaxeorg/bitaxe-raw.git
cd bitaxe-raw
cargo build --release
cargo espflash flash --release --chip esp32s3
```

espflash does not restart the ESP32 after flashing. Press the
board's RESET button to boot bitaxe-raw.

To flash the board again later, hold the BOOT button while
attaching power; that puts the ESP32 in its bootloader. The same
route flashes any firmware, including a return to stock.

## Check the serial ports

With bitaxe-raw running, the board presents two USB serial ports:

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

[bitaxe-raw]: https://github.com/bitaxeorg/bitaxe-raw
