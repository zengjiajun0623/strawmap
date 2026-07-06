# Lean Ethereum Strawmap

An interactive public roadmap product for Lean Ethereum, built as a dense
coordination artifact for researchers, app developers, and Ethereum governance
participants.

The map keeps the spirit of [strawmap.org](https://strawmap.org/): a technical,
multi-year L1 roadmap with Consensus, Data, and Execution layers, dependency
arrows, headliners, and north stars. It foregrounds the themes from
[Vitalik Buterin's July 4, 2026 thread](https://x.com/VitalikButerin/status/2073459000398463446):
recursive STARK verification, quantum safety, privacy as a first-class goal,
multidimensional gas, scalable state types, and VM/ISA evolution.

## Run locally

No install step is required.

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173/>.

You can also open `index.html` directly in a browser, but a local server is the
best preview path because it matches static hosting behavior.

## Deploy

This repo is static: `index.html`, `styles.css`, `app.js`, and `favicon.svg`.
It can be deployed from the repository root with GitHub Pages, Netlify, Vercel,
Cloudflare Pages, or any static host.

For GitHub Pages, use:

- Source: deploy from branch
- Branch: `main`
- Folder: `/`

## Product standard

- The first screen should show the actual roadmap interface, not a marketing page.
- The roadmap should remain dense enough for advanced Ethereum readers.
- Search, theme filters, north-star selection, and the Lean path shortcut should
  make the map easier to inspect without hiding technical structure.
- Public copy should treat the map as a draft coordination artifact, not an
  official prediction.
