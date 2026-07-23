# Mujina website: common project commands.
#
# Run `just` with no arguments to see the recipe list.
# Override the bind address or port like `host=127.0.0.1 just dev`.

host := "0.0.0.0"
port := "5173"

_default:
    @just --list --unsorted

# Install npm dependencies
install:
    npm install

# Run the dev server with hot reload
dev:
    npm run dev -- --host {{host}} --port {{port}}

# Build the static site to .vitepress/dist (honors DOCS_BASE)
build:
    npm run build

# Serve the production build locally for inspection
preview: build
    npm run preview -- --host {{host}} --port {{port}}

# What CI runs: clean install, then build
ci:
    npm ci
    npm run build

# Remove build output and dev cache; keep node_modules
clean:
    rm -rf .vitepress/dist .vitepress/cache

# Remove build output, dev cache, and node_modules
distclean: clean
    rm -rf node_modules
