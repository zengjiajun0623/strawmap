import test from "node:test";
import assert from "node:assert/strict";
import {
  assignStateCustody,
  classifyStateAccess,
  createPrivateFrame,
  estimateGasVector,
  executeLeanISA,
  priceGas,
  proveExecution,
  runOneShotProgram,
  simulateLeanConsensus,
  verifyProof
} from "../src/lean-lab.mjs";

test("recursive proof placeholder verifies and detects tampering", () => {
  const proof = proveExecution({
    block: { number: 1, transactions: [{ id: "tx" }], stateRoot: "state" },
    vmTraceRoot: "trace"
  });

  assert.equal(verifyProof(proof), true);
  assert.equal(verifyProof({ ...proof, publicInputs: { ...proof.publicInputs, stateRoot: "tampered" } }), false);
});

test("multidimensional gas rewards scalable state types", () => {
  const dynamicVector = estimateGasVector({ stateAccess: { shape: "dynamic" }, writes: 10, reads: 2, compute: 10 });
  const utxoVector = estimateGasVector({ stateAccess: { shape: "utxo" }, writes: 10, reads: 2, compute: 10 });

  assert.equal(classifyStateAccess({ shape: "utxo" }), "utxo");
  assert.ok(priceGas(utxoVector) < priceGas(dynamicVector));
});

test("private frames hide transaction secrets while preserving commitments", () => {
  const frame = createPrivateFrame({
    from: "alice",
    to: "bob",
    nonce: 1,
    secret: "do-not-leak",
    private: true,
    stateAccess: { shape: "utxo" }
  });

  assert.equal(frame.kind, "private-frame");
  assert.equal(JSON.stringify(frame.visible).includes("do-not-leak"), false);
  assert.equal(frame.commitment.scheme, "sha256-hash-commitment-v0");
});

test("lean consensus finalizes available blocks with quorum", () => {
  const result = simulateLeanConsensus({
    validators: [
      { id: "a", stake: 40, vote: "slot-1" },
      { id: "b", stake: 35, vote: "slot-1" },
      { id: "c", stake: 25, vote: "slot-2" }
    ],
    blocks: [{ id: "slot-1" }]
  });

  assert.equal(result.head, "slot-1");
  assert.equal(result.finalized[0].final, true);
});

test("leanISA executes proof-friendly programs with trace roots", () => {
  const result = executeLeanISA([
    ["PUSH", 2],
    ["PUSH", 3],
    "ADD",
    ["STORE", "sum"]
  ]);

  assert.equal(result.memory.sum, 5);
  assert.equal(typeof result.traceRoot, "string");
  assert.equal(result.traceRoot.length, 64);
});

test("state custody assigns deterministic replicas", () => {
  const custody = assignStateCustody(
    [{ id: "erc20-note", access: { shape: "utxo" } }],
    [{ id: "node-a" }, { id: "node-b" }, { id: "node-c" }],
    2
  );

  assert.equal(custody[0].class, "utxo");
  assert.equal(custody[0].custodians.length, 2);
});

test("one-shot program covers the full Lean Ethereum lab path", () => {
  const report = runOneShotProgram("test-seed");

  assert.equal(report.workstreams.length, 8);
  assert.equal(report.proofVerified, true);
  assert.equal(report.consensus.head, "slot-1");
  assert.ok(report.summary.totalFee > 0);
  assert.ok(report.summary.stateClasses.includes("utxo"));
  assert.ok(report.summary.privateFrames >= 1);
});
