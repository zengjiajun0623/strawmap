# Lean Ethereum Strawmap Lab

An interactive public roadmap and runnable implementation lab for Lean Ethereum,
built as a dense coordination artifact for researchers, app developers, client
teams, and Ethereum governance participants.

Live site: <https://zengjiajun0623.github.io/strawmap/>

The map keeps the spirit of [strawmap.org](https://strawmap.org/): a technical,
multi-year L1 roadmap with Consensus, Data, and Execution layers, dependency
arrows, headliners, and north stars. It foregrounds the themes from
[Vitalik Buterin's July 4, 2026 thread](https://x.com/VitalikButerin/status/2073459000398463446):
recursive STARK verification, quantum safety, privacy as a first-class goal,
multidimensional gas, scalable state types, and VM/ISA evolution.

The lab intentionally does not pretend to upgrade Ethereum mainnet. It builds
the most concrete one-shot prototype package possible inside this repo:
executable specs, simulations, test vectors, and developer-facing docs that
show how the roadmap could become an aggressive research/devnet program.

## Implementation lab

Runnable artifacts:

- `src/lean-lab.mjs`: one-shot prototype engine
- `bin/simulate.mjs`: simulation CLI
- `test/lean-lab.test.mjs`: test vectors for the prototype
- `docs/one-shot-devnet.md`: research/devnet implementation plan

Covered workstreams:

- recursive STARK verification placeholder and proof verification
- quantum-safe hash commitments and addresses
- lean consensus availability/finality simulation
- multidimensional gas pricing
- scalable state classification and custody assignment
- privacy-friendly private transaction frames
- client pipeline orchestration
- proof-friendly leanISA micro-interpreter

## Run locally

No dependency install step is required.

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173/>.

You can also open `index.html` directly in a browser, but a local server is the
best preview path because it matches static hosting behavior.

Run the one-shot implementation lab:

```sh
npm test
npm run simulate
```

## Deploy

The public site is static and can be deployed from the repository root with
GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host. The lab
scripts run locally with Node.js.

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
- Runnable artifacts should turn roadmap claims into data structures,
  simulators, verifiers, test vectors, or documented interfaces.
