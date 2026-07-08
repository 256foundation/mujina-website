# mujina.org

This repository serves [mujina.org](https://mujina.org), which redirects
to the Mujina source repository:
<https://github.com/256foundation/mujina>.

Mujina will want a proper user-facing site eventually. Until then,
pointing at the source repository beats pointing at a stale page. This
site used to carry the original grant proposal, which remains available
in git history.

## How the redirect works

GitHub Pages serves static files and cannot issue server-side
redirects, so the redirect happens in the browser. `index.html` carries
an instant meta refresh pointing at the source repository. `404.html`
carries the same refresh, so stale deep links redirect too instead of
showing an error page. `CNAME` binds the custom domain to this
repository, and `.nojekyll` tells Pages to publish these files as-is
rather than running a Jekyll build.
