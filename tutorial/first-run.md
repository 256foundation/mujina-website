# Your First Run

In this tutorial you will build Mujina from source and run it as a
complete miner, using your CPU in place of ASIC mining hardware. By
the end you will have watched a complete miner work on your own
machine: jobs flowing to hash threads, candidate shares coming
back, and a live REST API reporting on all of it. You need no mining
hardware and no pool account.

Expect about fifteen minutes, most of it compile time.

::: info Current as of July 2026
Mujina changes quickly. The log lines and API output below were
captured in July 2026 and may differ from what you see; the overall
flow should not.
:::

## Before you start

You need:

- A Linux machine. Mujina runs only on Linux.
- The Rust toolchain, installed with [rustup](https://rustup.rs).
- Two build dependencies. On Debian or Ubuntu:

```bash
sudo apt install libudev-dev libssl-dev
```

## Get the source

Clone the repository and enter it:

```bash
git clone https://github.com/256foundation/mujina.git
cd mujina
```

## Start the miner

Start the daemon with the CPU backend enabled:

```bash
MUJINA_CPUMINER_THREADS=2 \
MUJINA_USB_DISABLE=1 \
  cargo run --release --bin mujina-minerd
```

The first build takes a few minutes. Then the miner starts and prints
lines like these:

```
16:13:58 INFO  daemon: USB discovery disabled (MUJINA_USB_DISABLE set)
16:13:58 INFO  daemon: CPU miner enabled
               threads=2, duty=50
16:13:58 INFO  daemon: Using dummy job source (set MUJINA_POOL_URL to use Stratum v1)
16:13:58 INFO  backplane: CPU miner board connected.
               board=CPU Miner, threads=2, duty=50
16:13:58 INFO  daemon: Started.
16:13:58 INFO  api::server: API server listening.
               url=http://127.0.0.1:7785
```

Read the log from the top. The two variables you set enabled the
CPU mining backend with two hashing threads and skipped the search
for USB hardware. With no pool configured, the miner started its
built-in dummy job source, which generates synthetic work so the
hash threads have something to mine. A virtual "CPU Miner" board
connected, just as an ASIC board would. The REST API came up.

You are now mining. Not profitably: your CPU does a few
megahashes a second; an ASIC does terahashes. But every part of
Mujina that would drive real hardware is running.

Leave the miner running. About every half minute it reports:

```
16:15:25 INFO  scheduler: Mining status.
               uptime=30s, hashrate=5.2 MH/s, shares=0
```

## Watch the miner work

The default log level stays quiet between status reports. Stop the
miner with Ctrl+C, and restart it with debug logging:

```bash
MUJINA_CPUMINER_THREADS=2 \
MUJINA_USB_DISABLE=1 \
MUJINA_LOG=debug \
  cargo run --release --bin mujina-minerd
```

Now the log shows each step as it happens:

```
16:14:55 DEBUG scheduler: Thread registered
               thread=CPU Core 0
16:14:55 DEBUG cpu_miner::hasher: Share found
16:14:55 DEBUG scheduler: Share found
               source=dummy, job_id=dummy-0, nonce=0x127eb,
               hash=00004d313bd03f2d5971d0f7cd4ca965..., share_difficulty=0.0000506,
               threshold=2.33K
```

Each `Share found` pair is a hash thread turning up a candidate
nonce, which the scheduler checks against the job's share threshold.
At CPU speed, candidates that clear a real threshold are rare; that
is why the status line's `shares` count stays at zero while the
hash threads keep working.

## Query the miner's API

The daemon serves a REST API while it runs. From a second terminal:

```bash
curl http://127.0.0.1:7785/api/v0/health
```

```
OK
```

The full state snapshot lives at `/api/v0/miner`, with subtrees at
`/api/v0/boards` and `/api/v0/sources`. Browse them all in the
Swagger UI at `http://127.0.0.1:7785/swagger-ui`, which the daemon
serves from its own OpenAPI spec.

## Stop the miner

Press Ctrl+C in the miner's terminal. The daemon shuts down cleanly
and reports its final status before exiting:

```
16:15:40 INFO  daemon: Received SIGTERM.
16:15:40 INFO  scheduler: Mining status.
               uptime=44s, hashrate=4.9 MH/s, shares=1
16:15:40 INFO  daemon: Exiting.
```

## What you've built

You have run the entire Mujina stack: daemon, scheduler, a mining
backend, a job source, and the API, on nothing but a CPU. This was
not a simulation; it was the real miner. Attach an ASIC board and
the same daemon runs the same way. Only the hashrate changes: about
a million times faster.

From here:

- Put Mujina on real hardware: [Set Up a Bitaxe
  Gamma](/howto/set-up-a-bitaxe-gamma).
- Point your miner at a real pool: [Connect to a
  Pool](/howto/connect-to-a-pool).
- Run the same setup anywhere containers run: [Run in a
  Container](/howto/run-in-a-container).
- Look up every knob you just used: [Environment
  Variables](/reference/environment-variables).
- Understand what Mujina is trying to be: [Why
  Mujina](/explanation/why-mujina).
