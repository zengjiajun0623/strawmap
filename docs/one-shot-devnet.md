# One-Shot Lean Ethereum Devnet Program

This repo does not claim to upgrade Ethereum mainnet. It is a runnable lab for
compressing the Lean Ethereum roadmap into a single aggressive research/devnet
program.

## Workstreams

1. Recursive STARK verification
   - Artifact: recursive proof aggregator placeholder in `src/lean-lab.mjs`.
   - Done when: block execution can be represented by public inputs and a proof
     chain that detects tampering.

2. Quantum-safe replacements
   - Artifact: hash-based address and commitment adapters.
   - Done when: transaction, validator, and blob commitments can be modeled
     without elliptic-curve assumptions.

3. Lean consensus
   - Artifact: decoupled availability/finality simulator.
   - Done when: a block can be available and finalized under explicit quorum
     assumptions.

4. Multidimensional gas
   - Artifact: resource-vector fee engine.
   - Done when: compute, state, bandwidth, proof, and privacy resources are
     separately measurable and priceable.

5. Scalable state types
   - Artifact: state classifier and custody assignment model.
   - Done when: dynamic, UTXO, ring-buffer, keyed-nonce, static, and temporary
     state can be routed differently.

6. Privacy-friendly transaction flow
   - Artifact: private frame envelope.
   - Done when: public mempool data excludes secrets while preserving a
     verifiable commitment to the hidden payload.

7. Client architecture changes
   - Artifact: one-shot pipeline orchestrator.
   - Done when: transactions move through state routing, pricing, privacy
     framing, VM execution, proof generation, and consensus finality.

8. VM/ISA evolution
   - Artifact: leanISA micro-interpreter.
   - Done when: a proof-friendly instruction trace can become part of block
     public inputs.

## Run

```sh
npm test
npm run simulate
npm run inspect
npm run spec
npm run report
```

The simulation emits a JSON report with workstreams, private/public frames, gas
vectors, proof inputs, finality output, state custody assignments, and summary
metrics.

The inspect command emits the dependency graph and implementation matrix. It is
the executable version of the roadmap's "what depends on what" layer.

The spec command executes every JSON scenario in `scenarios/`. A scenario is a
portable devnet fixture: validator set, transaction mix, quorum, custody
replicas, and expected assertions. Add a scenario when a roadmap claim needs a
named test case that contributors can inspect and extend. Use
`npm run spec -- --full` when you need the full report for every scenario.

The report command writes `reports/*.md` and `reports/*.json` from the same
scenario specs. CI runs `npm run report:check` so checked-in reports cannot drift
from the executable scenarios.

## Devnet principle

The lab should prefer small executable artifacts over broad prose. Every roadmap
claim should eventually become one of:

- a data structure,
- a simulator,
- a verifier,
- a test vector,
- a failing test that defines missing work,
- or a documented interface for client teams and researchers.
