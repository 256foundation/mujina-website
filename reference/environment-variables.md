# Environment Variables

mujina-minerd can read some of its configuration from environment
variables. The groups below mirror the daemon's own reference:
`mujina-minerd --help` prints the same variables for exactly the
build you are running, and is authoritative when this page lags.

This page is current as of July 2026.

## Pool (job source)

| Variable                  | Description                                                                                              | Default          |
|---------------------------|----------------------------------------------------------------------------------------------------------|------------------|
| `MUJINA_POOL_URL`         | Stratum v1 pool URL, e.g. `stratum+tcp://pool.example.com:3333`. When unset, the daemon runs a built-in dummy job source instead. | unset            |
| `MUJINA_POOL_USER`        | Worker username sent to the pool, e.g. `myworker.1`.                                                     | `mujina-testing` |
| `MUJINA_POOL_PASS`        | Worker password sent to the pool.                                                                        | `x`              |
| `MUJINA_POOL_FORCED_RATE` | Override the share target so the source receives roughly this many shares per minute regardless of pool difficulty, for testing share submission at low hashrate. Requires `MUJINA_POOL_URL`. | unset            |

## CPU miner

| Variable                  | Description                                                                                        | Default                    |
|---------------------------|----------------------------------------------------------------------------------------------------|----------------------------|
| `MUJINA_CPUMINER_THREADS` | Number of CPU mining threads. Setting this enables the CPU mining backend, which needs no ASIC hardware. | unset (CPU mining disabled) |
| `MUJINA_CPUMINER_DUTY`    | CPU duty cycle percent (1-100). Each thread hashes this fraction of every second and sleeps the rest, capping sustained CPU load. | `50`                       |

## API server

| Variable            | Description                                                                            | Default          |
|---------------------|----------------------------------------------------------------------------------------|------------------|
| `MUJINA_API_LISTEN` | Address the REST API listens on, e.g. `0.0.0.0:7785`. A bare host or IP gets the default port `:7785` appended. | `127.0.0.1:7785` |

## Hardware

| Variable             | Description                                                          | Default                       |
|----------------------|----------------------------------------------------------------------|-------------------------------|
| `MUJINA_USB_DISABLE` | Set to any value to skip USB board discovery, useful for CPU-only runs. | unset (USB discovery enabled) |

## Logging

| Variable   | Description                                                                                             | Default                  |
|------------|---------------------------------------------------------------------------------------------------------|--------------------------|
| `RUST_LOG` | Log filter in tracing-subscriber EnvFilter syntax, e.g. `mujina_miner=trace`, appended after the built-in defaults so its directives win. | `warn,mujina_miner=info` |

## See also

- [Your First Run](/tutorial/first-run) uses the CPU miner and
  hardware variables in a working session.
- [Connect to a Pool](/howto/connect-to-a-pool) uses the pool
  variables against a real pool.
- The [REST API documentation][api-docs] in the source tree covers
  the endpoints the API server exposes.

[api-docs]: https://github.com/256foundation/mujina/blob/main/docs/api.md
