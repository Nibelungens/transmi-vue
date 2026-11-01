# Copilot instructions for transmi-vue

## Project overview

This repository is a Vue 3 front-end for the Transmission BitTorrent client. The app talks to a running Transmission RPC endpoint through a reverse-proxy path (`/api`) and renders torrent state, controls, and settings with BootstrapVueNext.

The project is centered around:
- `src/main.js`: Vue app bootstrap, global filters, BootstrapVueNext setup, and axios interceptor initialization
- `src/App.vue`: top-level shell that mounts the torrent list and wires refresh/notification events
- `src/store/index.store.js`: creates the Vuex store with namespaced modules for torrents, config, token, and notifications
- `src/services/api/*.js`: Transmission RPC calls and request argument builders
- `src/components/*`: screen-level Vue components and detail panels
- `src/config/interceptor.http.js`: injects the `x-transmission-session-id` header and retries on 409 session-token renewal

The app expects a Transmission daemon behind the proxy configured by `templates/nginx.conf.template`:

```nginx
rewrite ^/api /transmission/rpc break;
proxy_pass ${URL_TRANSMISION};
```

## Build, test, and lint commands

Use the repo scripts from the project root (Node.js 22.12+, 24.x, or 26+):

```bash
npm install
npm run serve
npm run build
npm run lint
npm run test:unit
```

Run a single test file with Vitest:

```bash
npm run test:unit -- tests/unit/components/ListTorrentsView.spec.js
```

CI uses Node 22.x (`.github/workflows/test.yml` and `.github/workflows/build.yml`), with Vite, Vitest, and the Vue 3 toolchain.

## Architecture and data flow

### 1) App bootstrap
`src/main.js` creates the Vue app, registers the global display filters and UI plugins, and installs the HTTP interceptor before mounting the root component.

### 2) Vuex state model
The app keeps state in namespaced modules:
- `Torrents`: currently loaded torrents and selected torrents
- `Config`: session config, sorting preferences, download-dir metadata
- `Token`: Transmission session token and auth state
- `Notification`: user-facing alert state

State is mutated through `commit(...)` from components and services; the app does not rely on centralized async logic beyond the store.

### 3) Transmission RPC access
API calls are centralized in:
- `src/services/api.transmission.mixin.js`: exposes service instances used by components
- `src/services/api/api_parent.transmission.service.js`: performs the actual `axios.post('/api', ...)` RPC call
- `src/services/api/*`: method-specific wrappers such as torrent, queue, and config endpoints
- `src/services/class/arguments.*.class.js`: serializes arguments sent to Transmission

This pattern is important when adding or changing RPC operations: keep the method in the service layer, and use the existing argument classes instead of constructing raw ad hoc payloads.

### 4) UI refresh and event model
The app uses a lightweight event bus (`src/config/bus.event.js`) to coordinate cross-component events, especially for refresh actions and notifications. `src/App.vue` listens for refresh and UI events and polls the torrent list via the torrent service.

The data refresh cycle is driven by the `interval.mixin.js` and `result.mixin.js` patterns, which are reused by components and detail views.

## Key conventions

- Prefer the existing Vuex 4 modules and namespaced mutation patterns over ad hoc component state.
- Use the `@` alias for imports as used throughout the repo; keep paths consistent with the existing code.
- Keep Transmission API logic in `src/services` rather than in components.
- Use the existing filtering helpers in `src/filters` for display formatting instead of embedding formatting logic directly in templates.
- The repository is plain JavaScript, not TypeScript. Favor the current ES module / Vue 3 conventions used by the existing codebase.
- Use BootstrapVueNext and the repo's established component structure instead of introducing a different UI framework or new state approach.
- Session token handling is a first-class concern: when a 409 response comes back from Transmission, the interceptor updates the token and retries the same request.
- When working on UI behavior, check both the relevant component and the matching store mutation/action pattern; many view updates are store-driven.

## Repo-specific notes

- The README documents development under `npm run serve` and `npm run build`, and the Docker setup is intended to proxy the app to a Transmission backend via `URL_TRANSMISION`.
- Tests live under `tests/unit/components` and are organized around component behavior.
- The project is intentionally a thin front-end around the Transmission RPC API; most domain logic lives in the API wrappers and view formatting, not in a separate backend.
