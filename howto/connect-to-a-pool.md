# Connect to a Pool

This guide points a running Mujina miner at a Stratum v1 pool. It
assumes you can already start the miner; if not, take the
[tutorial](/tutorial/first-run) first.

## Configure the pool connection

Set the pool URL and your worker credentials, then start the daemon:

```bash
MUJINA_POOL_URL="stratum+tcp://pool.example.com:3333" \
MUJINA_POOL_USER="your-address.worker" \
MUJINA_POOL_PASS="x" \
  cargo run --bin mujina-minerd
```

- `MUJINA_POOL_URL` selects the Stratum v1 job source. Without it,
  the miner uses its built-in dummy source.
- `MUJINA_POOL_USER` is the worker name your pool expects, typically
  a payout address with a worker suffix. Set it: the default is a
  shared testing name.
- `MUJINA_POOL_PASS` is the worker password. Most pools ignore it;
  the default is `x`.

Combine these with whatever backend you mine on: a USB board needs
nothing more, and a CPU-only run adds `MUJINA_CPUMINER_THREADS` and
`MUJINA_USB_DISABLE` as in the tutorial.

The miner negotiates version rolling with the pool automatically.

## Verify shares reach the pool

Watch the log for the pool connection and the periodic status line:

```
INFO  scheduler: Mining status.
      uptime=120s, hashrate=..., shares=3
```

A rising `shares` count means the pool is accepting your work. Check
the pool's dashboard to confirm it sees the worker.

## Test submission at CPU speed

Pools set share difficulty for ASIC-speed miners, so a CPU would wait
days to find a single share. To exercise the submission path anyway,
force a share rate:

```bash
MUJINA_CPUMINER_THREADS=2 \
MUJINA_USB_DISABLE=1 \
MUJINA_POOL_URL="stratum+tcp://pool.example.com:3333" \
MUJINA_POOL_USER="your-address.worker" \
MUJINA_POOL_FORCED_RATE=6 \
  cargo run --bin mujina-minerd
```

`MUJINA_POOL_FORCED_RATE` is a target in shares per minute; `6`
targets one share every ten seconds. The miner lowers its local share
threshold to hit the rate, but the pool still applies real
difficulty, so expect it to reject these shares as below difficulty.
That is the point: you are verifying connectivity and the submission
flow, not earning rewards.

## Related pages

- Every variable used here: [Environment
  Variables](/reference/environment-variables).
- The same configuration in a container: [Run in a
  Container](/howto/run-in-a-container).
