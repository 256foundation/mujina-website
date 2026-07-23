# Run in a Container

This guide runs mujina-minerd as a container, which suits pool
stress-testing, CI, and trying Mujina without a Rust toolchain.
Since real mining needs specialized hardware, the container is
mainly a testing tool.

Examples use Podman; Docker commands are identical, substituting
`docker` for `podman`.

## Run from the registry

Pull and run the published image:

```bash
podman run --rm -it \
  -e MUJINA_USB_DISABLE=1 \
  -e MUJINA_CPUMINER_THREADS=2 \
  -e MUJINA_POOL_URL="stratum+tcp://pool.example.com:3333" \
  -e MUJINA_POOL_USER="your-address.worker" \
  ghcr.io/256foundation/mujina-minerd:latest
```

This starts a two-thread CPU miner connected to your pool. Any
variable from the [environment
reference](/reference/environment-variables) can be passed with
`-e`, including `MUJINA_POOL_FORCED_RATE` to [test share submission
at CPU speed](/howto/connect-to-a-pool#test-submission-at-cpu-speed).

## Publish the API port

The REST API listens on port 7785 inside the container, bound to
localhost by default. To reach it from the host, bind it to all
interfaces and publish the port:

```bash
podman run --rm -it \
  -p 7785:7785 \
  -e MUJINA_API_LISTEN=0.0.0.0:7785 \
  -e MUJINA_USB_DISABLE=1 \
  -e MUJINA_CPUMINER_THREADS=2 \
  ghcr.io/256foundation/mujina-minerd:latest
```

Then query `http://localhost:7785/api/v0/health`, or browse the
Swagger UI at `http://localhost:7785/swagger-ui`.

## Build the image yourself

From a clone of the [source
repository](https://github.com/256foundation/mujina):

```bash
just container-build
```

Or directly with Podman:

```bash
podman build -t mujina-minerd:latest -f Containerfile .
```

The Containerfile uses a multi-stage build: a full Rust toolchain for
compilation, then a slim Debian runtime. The final image is around
100 MB and runs as a non-root user.
