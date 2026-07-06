# Contributing

This repo is a prototype lab, not an Ethereum mainnet upgrade proposal. Good
contributions make the Lean Ethereum roadmap more executable.

## What to add

- A small simulator for a roadmap claim.
- A verifier or invariant check.
- A test vector that captures expected behavior.
- A dependency edge with a clear reason.
- A failing test that defines missing implementation work.
- A short doc that explains how client teams or researchers would plug in.

## Standards

- Prefer runnable artifacts over prose.
- Keep modules dependency-free unless the benefit is obvious.
- Do not imply mainnet readiness.
- Add tests for every new workstream behavior.
- Keep public-facing copy clear that this is a research/devnet lab.

## Before opening a PR

```sh
npm test
npm run simulate
npm run inspect
npm run spec
npm run report:check
```
