import { createHash } from "node:crypto";

export const WORKSTREAMS = [
  {
    id: "recursive-starks",
    name: "Recursive STARK verification",
    objective: "Replace re-execution with chained proof verification.",
    artifact: "recursive proof aggregator",
    readiness: "prototype"
  },
  {
    id: "quantum-safety",
    name: "Quantum-safe replacements",
    objective: "Model hash-based commitments for keys, blobs, and validator messages.",
    artifact: "hash commitment adapter",
    readiness: "prototype"
  },
  {
    id: "lean-consensus",
    name: "Lean consensus",
    objective: "Simulate decoupled availability and finality with one-round finality targets.",
    artifact: "availability/finality simulator",
    readiness: "prototype"
  },
  {
    id: "multidimensional-gas",
    name: "Multidimensional gas",
    objective: "Price execution, state, bandwidth, proof, and privacy resources separately.",
    artifact: "resource vector fee engine",
    readiness: "prototype"
  },
  {
    id: "scalable-state",
    name: "Scalable state types",
    objective: "Route dynamic state, UTXO state, ring buffers, keyed nonces, and temporary state.",
    artifact: "state classifier and commitment model",
    readiness: "prototype"
  },
  {
    id: "privacy-flow",
    name: "Privacy-friendly transaction flow",
    objective: "Carry shielded payloads through mempool and frames without exposing secrets.",
    artifact: "private frame envelope",
    readiness: "prototype"
  },
  {
    id: "client-architecture",
    name: "Client architecture changes",
    objective: "Split execution, state serving, proof, and finality responsibilities.",
    artifact: "pipeline orchestrator",
    readiness: "prototype"
  },
  {
    id: "vm-isa",
    name: "VM/ISA evolution",
    objective: "Expose a proof-friendly instruction layer below the EVM.",
    artifact: "leanISA micro-interpreter",
    readiness: "prototype"
  }
];

export const DEPENDENCIES = [
  {
    from: "quantum-safety",
    to: "privacy-flow",
    reason: "Private frames must commit to hidden payloads with post-quantum-safe primitives."
  },
  {
    from: "quantum-safety",
    to: "recursive-starks",
    reason: "Proof and blob commitments should avoid quantum-vulnerable assumptions."
  },
  {
    from: "scalable-state",
    to: "multidimensional-gas",
    reason: "Different state classes need separate resource accounting before pricing works."
  },
  {
    from: "privacy-flow",
    to: "multidimensional-gas",
    reason: "Private transactions add proof, bandwidth, and privacy-specific resource costs."
  },
  {
    from: "vm-isa",
    to: "recursive-starks",
    reason: "A proof-friendly instruction trace becomes a public input to recursive verification."
  },
  {
    from: "multidimensional-gas",
    to: "client-architecture",
    reason: "Clients need resource-vector admission, execution, and accounting boundaries."
  },
  {
    from: "scalable-state",
    to: "client-architecture",
    reason: "State custody and serving responsibilities depend on the state type model."
  },
  {
    from: "recursive-starks",
    to: "lean-consensus",
    reason: "Consensus can finalize proof-backed block summaries instead of replaying everything."
  },
  {
    from: "client-architecture",
    to: "lean-consensus",
    reason: "Availability, proving, state serving, and finality need explicit client role boundaries."
  }
];

export const READINESS_GATES = [
  {
    id: "g1-public-inputs",
    workstream: "recursive-starks",
    gate: "Block public inputs include tx root, state root, VM trace root, and parent proof hash.",
    evidence: "proveExecution() and verifyProof()"
  },
  {
    id: "g2-pq-commitments",
    workstream: "quantum-safety",
    gate: "Addresses and commitments use hash-based placeholder adapters.",
    evidence: "quantumSafeAddress() and quantumSafeCommitment()"
  },
  {
    id: "g3-decoupled-finality",
    workstream: "lean-consensus",
    gate: "Availability and finality are measured separately under quorum assumptions.",
    evidence: "simulateLeanConsensus()"
  },
  {
    id: "g4-resource-vector",
    workstream: "multidimensional-gas",
    gate: "Transactions produce compute, state, bandwidth, proof, and privacy resource vectors.",
    evidence: "estimateGasVector() and priceGas()"
  },
  {
    id: "g5-state-routing",
    workstream: "scalable-state",
    gate: "Dynamic, UTXO, ring-buffer, keyed-nonce, static, and temporary state are classifiable.",
    evidence: "classifyStateAccess() and assignStateCustody()"
  },
  {
    id: "g6-private-envelope",
    workstream: "privacy-flow",
    gate: "Private mempool-visible envelopes omit secrets and expose commitments/nullifiers.",
    evidence: "createPrivateFrame()"
  },
  {
    id: "g7-client-pipeline",
    workstream: "client-architecture",
    gate: "A full transaction path flows through state, gas, privacy, VM, proof, custody, and finality.",
    evidence: "runOneShotProgram()"
  },
  {
    id: "g8-isa-trace",
    workstream: "vm-isa",
    gate: "A proof-friendly instruction trace produces a deterministic trace root.",
    evidence: "executeLeanISA()"
  }
];

export const GAS_WEIGHTS = Object.freeze({
  compute: 1,
  stateRead: 4,
  stateWrite: 16,
  bandwidth: 2,
  proof: 5,
  privacy: 7
});

export function hashHex(value) {
  const input = typeof value === "string" ? value : JSON.stringify(canonicalize(value));
  return createHash("sha256").update(input).digest("hex");
}

export function shortHash(value, length = 16) {
  return hashHex(value).slice(0, length);
}

export function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, canonicalize(item)])
  );
}

export function merkleRoot(leaves) {
  if (leaves.length === 0) return hashHex("empty");
  let level = leaves.map((leaf) => hashHex(leaf));
  while (level.length > 1) {
    const next = [];
    for (let index = 0; index < level.length; index += 2) {
      const left = level[index];
      const right = level[index + 1] ?? left;
      next.push(hashHex({ left, right }));
    }
    level = next;
  }
  return level[0];
}

export function quantumSafeAddress(publicKey) {
  return `pq_${shortHash({ scheme: "hash-address-v0", publicKey }, 24)}`;
}

export function quantumSafeCommitment(message, domain = "lean-ethereum") {
  return {
    scheme: "sha256-hash-commitment-v0",
    domain,
    commitment: hashHex({ domain, message })
  };
}

export function classifyStateAccess(access) {
  if (access.scope === "temporary") return "temp";
  if (access.shape === "utxo") return "utxo";
  if (access.shape === "ring-buffer") return "ring-buffer";
  if (access.keyedNonce === true) return "keyed-nonce";
  if (access.static === true) return "static";
  return "dynamic";
}

export function estimateGasVector(transaction) {
  const stateClass = classifyStateAccess(transaction.stateAccess);
  const writeMultiplier = {
    dynamic: 3,
    utxo: 0.8,
    "ring-buffer": 0.7,
    "keyed-nonce": 0.6,
    static: 0.5,
    temp: 0.2
  }[stateClass];

  const privacyCost = transaction.private ? 18 : 0;
  const proofCost = transaction.requiresProof ? 22 : 5;

  return {
    compute: transaction.compute ?? 10,
    stateRead: transaction.reads ?? 1,
    stateWrite: Math.ceil((transaction.writes ?? 1) * writeMultiplier),
    bandwidth: Math.ceil(JSON.stringify(transaction).length / 128),
    proof: proofCost,
    privacy: privacyCost
  };
}

export function priceGas(vector, weights = GAS_WEIGHTS) {
  return Object.entries(weights).reduce((total, [resource, weight]) => {
    return total + (vector[resource] ?? 0) * weight;
  }, 0);
}

export function createPrivateFrame(transaction) {
  if (!transaction.private) {
    return {
      kind: "public-frame",
      visible: canonicalize(transaction),
      commitment: quantumSafeCommitment(transaction, "public-frame")
    };
  }

  const publicEnvelope = {
    from: quantumSafeAddress(transaction.from),
    to: transaction.to ? quantumSafeAddress(transaction.to) : "shielded-pool",
    stateClass: classifyStateAccess(transaction.stateAccess),
    nullifier: shortHash({ secret: transaction.secret, nonce: transaction.nonce }, 24),
    resourceVector: estimateGasVector(transaction)
  };

  return {
    kind: "private-frame",
    visible: publicEnvelope,
    commitment: quantumSafeCommitment(transaction, "private-frame")
  };
}

export function executeLeanISA(program, initialMemory = {}) {
  const memory = { ...initialMemory };
  const stack = [];

  for (const instruction of program) {
    const [op, arg] = Array.isArray(instruction) ? instruction : [instruction];
    if (op === "PUSH") stack.push(arg);
    else if (op === "LOAD") stack.push(memory[arg] ?? 0);
    else if (op === "STORE") memory[arg] = stack.pop();
    else if (op === "ADD") stack.push(stack.pop() + stack.pop());
    else if (op === "MUL") stack.push(stack.pop() * stack.pop());
    else if (op === "HASH") stack.push(shortHash(stack.pop(), 24));
    else if (op === "ASSERT_EQ") {
      const right = stack.pop();
      const left = stack.pop();
      if (left !== right) throw new Error(`ASSERT_EQ failed: ${left} !== ${right}`);
    } else {
      throw new Error(`Unknown leanISA opcode: ${op}`);
    }
  }

  return {
    stack,
    memory,
    traceRoot: merkleRoot(program.map((instruction, index) => ({ index, instruction })))
  };
}

export function proveExecution({ block, parentProof = null, vmTraceRoot }) {
  const publicInputs = {
    blockNumber: block.number,
    txRoot: merkleRoot(block.transactions),
    stateRoot: block.stateRoot,
    vmTraceRoot,
    parentProof: parentProof?.proofHash ?? null
  };

  return {
    proofSystem: "recursive-stark-placeholder-v0",
    publicInputs,
    proofHash: hashHex({ proofSystem: "recursive-stark-placeholder-v0", publicInputs })
  };
}

export function verifyProof(proof) {
  return (
    proof?.proofSystem === "recursive-stark-placeholder-v0" &&
    proof.proofHash === hashHex({ proofSystem: proof.proofSystem, publicInputs: proof.publicInputs })
  );
}

export function simulateLeanConsensus({ validators, blocks, quorum = 0.67 }) {
  const totalStake = validators.reduce((sum, validator) => sum + validator.stake, 0);
  const finalized = [];

  for (const block of blocks) {
    const availabilityStake = validators
      .filter((validator) => validator.available !== false)
      .reduce((sum, validator) => sum + validator.stake, 0);
    const finalityStake = validators
      .filter((validator) => !validator.offline && validator.vote === block.id)
      .reduce((sum, validator) => sum + validator.stake, 0);

    const available = availabilityStake / totalStake >= quorum;
    const final = available && finalityStake / totalStake >= quorum;
    finalized.push({
      blockId: block.id,
      available,
      final,
      availabilityRatio: round(availabilityStake / totalStake),
      finalityRatio: round(finalityStake / totalStake)
    });
  }

  return {
    quorum,
    finalized,
    head: finalized.findLast((item) => item.final)?.blockId ?? null
  };
}

export function assignStateCustody(stateObjects, nodes, replicas = 2) {
  return stateObjects.map((object) => {
    const ranked = nodes
      .map((node) => ({ node, score: hashHex(`${object.id}:${node.id}`) }))
      .sort((left, right) => left.score.localeCompare(right.score))
      .slice(0, replicas)
      .map(({ node }) => node.id);
    return { stateId: object.id, class: classifyStateAccess(object.access), custodians: ranked };
  });
}

export function validateDependencyGraph(workstreams = WORKSTREAMS, dependencies = DEPENDENCIES) {
  const ids = new Set(workstreams.map((workstream) => workstream.id));
  const missing = dependencies.filter((edge) => !ids.has(edge.from) || !ids.has(edge.to));
  if (missing.length > 0) {
    return { ok: false, missing, cycles: [], order: [] };
  }

  const outgoing = new Map([...ids].map((id) => [id, []]));
  const indegree = new Map([...ids].map((id) => [id, 0]));
  for (const edge of dependencies) {
    outgoing.get(edge.from).push(edge.to);
    indegree.set(edge.to, indegree.get(edge.to) + 1);
  }

  const queue = [...ids].filter((id) => indegree.get(id) === 0).sort();
  const order = [];
  while (queue.length > 0) {
    const id = queue.shift();
    order.push(id);
    for (const next of outgoing.get(id).sort()) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
    queue.sort();
  }

  const cycles = [...indegree.entries()].filter(([, degree]) => degree > 0).map(([id]) => id);
  return { ok: missing.length === 0 && cycles.length === 0, missing, cycles, order };
}

export function buildImplementationMatrix() {
  const graph = validateDependencyGraph();
  return WORKSTREAMS.map((workstream) => {
    const gates = READINESS_GATES.filter((gate) => gate.workstream === workstream.id);
    const upstream = DEPENDENCIES.filter((edge) => edge.to === workstream.id).map((edge) => edge.from);
    const downstream = DEPENDENCIES.filter((edge) => edge.from === workstream.id).map((edge) => edge.to);
    return {
      ...workstream,
      gates,
      upstream,
      downstream,
      executionOrder: graph.order.indexOf(workstream.id)
    };
  }).sort((left, right) => left.executionOrder - right.executionOrder);
}

export function runOneShotProgram(seed = "lean-devnet-0") {
  const validators = [
    { id: "lighthouse-pq", stake: 32, vote: "slot-1" },
    { id: "teku-pq", stake: 32, vote: "slot-1" },
    { id: "nimbus-pq", stake: 32, vote: "slot-1" },
    { id: "reth-proof", stake: 32, vote: "slot-1" },
    { id: "erigon-state", stake: 16, vote: "slot-1", available: true }
  ];

  const transactions = [
    {
      id: "erc20-utxo-transfer",
      from: "alice",
      to: "bob",
      nonce: 1,
      secret: "alice-note",
      private: true,
      requiresProof: true,
      stateAccess: { shape: "utxo" },
      compute: 18,
      reads: 2,
      writes: 2
    },
    {
      id: "uniswap-dynamic-swap",
      from: "carol",
      nonce: 7,
      private: false,
      requiresProof: true,
      stateAccess: { shape: "dynamic" },
      compute: 45,
      reads: 8,
      writes: 5
    },
    {
      id: "rollup-blob-sample",
      from: "rollup-a",
      nonce: 3,
      private: false,
      requiresProof: true,
      stateAccess: { shape: "ring-buffer" },
      compute: 14,
      reads: 1,
      writes: 1
    }
  ];

  const frames = transactions.map(createPrivateFrame);
  const gas = transactions.map((transaction) => {
    const vector = estimateGasVector(transaction);
    return { id: transaction.id, stateClass: classifyStateAccess(transaction.stateAccess), vector, fee: priceGas(vector) };
  });
  const isa = executeLeanISA([
    ["PUSH", seed],
    ["HASH"],
    ["STORE", "devnetSeed"],
    ["LOAD", "blockGas"],
    ["PUSH", gas.reduce((sum, item) => sum + item.fee, 0)],
    "ADD",
    ["STORE", "accountedGas"]
  ], { blockGas: 0 });
  const block = {
    id: "slot-1",
    number: 1,
    transactions: frames.map((frame) => frame.visible),
    stateRoot: merkleRoot(gas)
  };
  const proof = proveExecution({ block, vmTraceRoot: isa.traceRoot });
  const consensus = simulateLeanConsensus({ validators, blocks: [block] });
  const custody = assignStateCustody(
    transactions.map((transaction) => ({ id: transaction.id, access: transaction.stateAccess })),
    validators,
    2
  );
  const dependencyGraph = validateDependencyGraph();
  const implementationMatrix = buildImplementationMatrix();

  return {
    seed,
    workstreams: WORKSTREAMS,
    dependencies: DEPENDENCIES,
    readinessGates: READINESS_GATES,
    dependencyGraph,
    implementationMatrix,
    transactions: transactions.map(({ secret, ...transaction }) => transaction),
    frames,
    gas,
    isa,
    block,
    proof,
    proofVerified: verifyProof(proof),
    consensus,
    custody,
    summary: {
      totalFee: gas.reduce((sum, item) => sum + item.fee, 0),
      finalHead: consensus.head,
      privateFrames: frames.filter((frame) => frame.kind === "private-frame").length,
      stateClasses: [...new Set(gas.map((item) => item.stateClass))],
      dependencyGraphValid: dependencyGraph.ok,
      readinessGateCount: READINESS_GATES.length
    }
  };
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}
