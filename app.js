const forks = [
  { id: "g", name: "Glamsterdam", year: "2026", x: 180 },
  { id: "h", name: "Hegota", year: "2027", x: 310 },
  { id: "i", name: "I*", year: "2027-28", x: 450 },
  { id: "j", name: "J*", year: "2028", x: 595 },
  { id: "k", name: "K*", year: "2028-29", x: 740 },
  { id: "l", name: "L*", year: "2029", x: 885 },
  { id: "long", name: "longer term", year: "", x: 1040 },
  { id: "north", name: "north stars", year: "", x: 1160 }
];

const layers = [
  { className: "cl", label: "Consensus Layer (CL)" },
  { className: "dl", label: "Data Layer (DL)" },
  { className: "el", label: "Execution Layer (EL)" },
  { className: "cross", label: "Cross-layer" }
];

const nodes = [
  {
    id: "epbs",
    title: "ePBS",
    layer: "CL",
    fork: "Glamsterdam",
    x: 180,
    y: 116,
    kind: "headliner",
    tags: ["scale", "lean"],
    body: "Enshrined proposer-builder separation moves block construction into a clearer protocol shape.",
    impact: "A cleaner base for faster slots, distributed builders, and censorship-resistance work."
  },
  {
    id: "focil",
    title: "FOCIL",
    layer: "CL",
    fork: "Hegota",
    x: 310,
    y: 98,
    kind: "headliner",
    tags: ["lean"],
    body: "Fork-choice enforced inclusion lists strengthen transaction inclusion guarantees.",
    impact: "Makes censorship resistance explicit before the deeper Lean consensus changes arrive."
  },
  {
    id: "decoupled-consensus",
    title: "decoupled consensus",
    layer: "CL",
    fork: "I*",
    x: 450,
    y: 96,
    kind: "headliner",
    tags: ["lean", "scale"],
    body: "The available chain and finality path split so Ethereum can become simpler and faster.",
    impact: "Sets up one or two-round finality with stronger theoretical security properties."
  },
  {
    id: "quick-slots",
    title: "quick slots",
    layer: "CL",
    fork: "J*",
    x: 595,
    y: 82,
    kind: "onchain",
    tags: ["scale", "lean"],
    body: "Slot time reductions happen repeatedly as clients and protocol machinery get safer.",
    impact: "Shorter user waiting time without treating speed as a one-off parameter bump."
  },
  {
    id: "one-round-finality",
    title: "1-round finality",
    layer: "CL",
    fork: "L*",
    x: 885,
    y: 102,
    kind: "headliner",
    tags: ["lean"],
    body: "Lean consensus targets faster finality while simplifying today's machinery.",
    impact: "Turns finality into a seconds-scale primitive for applications and bridges."
  },
  {
    id: "recursive-starks",
    title: "recursive STARK verification",
    layer: "Cross",
    fork: "I* to L*",
    x: 600,
    y: 650,
    kind: "headliner",
    tags: ["lean", "scale"],
    body: "Verification moves from direct re-execution toward recursive proofs as an enshrined first-class protocol component.",
    impact: "Simpler verification, real-time proving, and future VM flexibility."
  },
  {
    id: "pq-heartbeat",
    title: "post-quantum heartbeat",
    layer: "CL",
    fork: "J*",
    x: 595,
    y: 160,
    kind: "headliner",
    tags: ["quantum"],
    body: "Quantum safety moves up the priority stack, with urgent work on blob and signature designs.",
    impact: "Lets the roadmap replace quantum-vulnerable cryptography before it becomes an emergency."
  },
  {
    id: "pq-attestations",
    title: "PQ attestations",
    layer: "CL",
    fork: "L*",
    x: 885,
    y: 168,
    kind: "onchain",
    tags: ["quantum"],
    body: "Consensus messages shift toward hash-based or otherwise quantum-safe alternatives.",
    impact: "Protects validator security over a much longer cryptographic horizon."
  },
  {
    id: "distributed-builders",
    title: "distributed block building",
    layer: "CL",
    fork: "longer term",
    x: 1040,
    y: 138,
    kind: "onchain",
    tags: ["scale", "lean"],
    body: "Block building becomes less dependent on single centralized actors.",
    impact: "Improves robustness as Ethereum scales bandwidth, gas, and proof workloads."
  },
  {
    id: "fast-l1",
    title: "fast L1",
    layer: "CL",
    fork: "north star",
    x: 1160,
    y: 92,
    kind: "north",
    tags: ["scale", "lean"],
    body: "Transaction inclusion and chain finality happen in seconds.",
    impact: "Ethereum feels live while preserving the base layer's neutrality and security."
  },
  {
    id: "data-availability",
    title: "data availability increases",
    layer: "DL",
    fork: "I* onward",
    x: 595,
    y: 268,
    width: 300,
    kind: "onchain",
    tags: ["scale"],
    body: "Blob capacity grows over many steps, tied to data availability sampling and safer client performance.",
    impact: "More room for rollups without asking every node to download everything."
  },
  {
    id: "lean-da",
    title: "PQ leanDA sampling",
    layer: "DL",
    fork: "J*",
    x: 595,
    y: 332,
    kind: "headliner",
    tags: ["quantum", "scale", "lean"],
    body: "Lean data availability combines sampling with post-quantum assumptions.",
    impact: "Keeps L2 data scaling compatible with the quantum-safe roadmap."
  },
  {
    id: "blob-futures",
    title: "short-dated blob futures",
    layer: "DL",
    fork: "longer term",
    x: 1040,
    y: 328,
    kind: "onchain",
    tags: ["scale"],
    body: "Blob markets mature so bandwidth can scale with better planning and pricing.",
    impact: "Gives rollups a steadier path to buy capacity."
  },
  {
    id: "teragas-l2",
    title: "teragas L2",
    layer: "DL",
    fork: "north star",
    x: 1160,
    y: 268,
    kind: "north",
    tags: ["scale"],
    body: "L2 data throughput targets roughly one gigabyte per second via data availability sampling.",
    impact: "Makes mass-scale rollup activity a base-layer design goal."
  },
  {
    id: "gas-limit",
    title: "gas limit increases",
    layer: "EL",
    fork: "Glamsterdam onward",
    x: 520,
    y: 424,
    width: 430,
    kind: "onchain",
    tags: ["scale"],
    body: "Gas limit increases happen repeatedly over the next several years as optimization permits.",
    impact: "Scales L1 capacity through measured increments instead of a single oversized leap."
  },
  {
    id: "multigas",
    title: "multidimensional pricing",
    layer: "EL",
    fork: "I*",
    x: 450,
    y: 492,
    kind: "onchain",
    tags: ["scale", "state"],
    body: "Different resources get different prices instead of being flattened into one gas dimension.",
    impact: "Makes state, computation, bandwidth, and proving costs easier to tune separately."
  },
  {
    id: "state-types",
    title: "new state types",
    layer: "EL",
    fork: "I* to L*",
    x: 610,
    y: 546,
    kind: "headliner",
    tags: ["state", "scale"],
    body: "Ethereum keeps dynamic state while adding scalable but more restrictive state forms.",
    impact: "ERC20s, NFTs, and many DeFi patterns can get much lower fees without forcing all apps to rewrite."
  },
  {
    id: "utxo-storage",
    title: "UTXO storage",
    layer: "EL",
    fork: "L*",
    x: 885,
    y: 548,
    kind: "onchain",
    tags: ["state", "privacy", "scale"],
    body: "A UTXO-like state option is explored for tokens and privacy-friendly applications.",
    impact: "Creates a path to much cheaper transfers while preserving complex dynamic state where needed."
  },
  {
    id: "state-scale",
    title: "2 TB dynamic + 100 TB scalable state",
    layer: "EL",
    fork: "longer term",
    x: 1040,
    y: 548,
    kind: "onchain",
    tags: ["state", "scale"],
    body: "The roadmap imagines moderate dynamic state plus much larger restrictive scalable state.",
    impact: "Forces first-class research into who stores which state, why, and how it is served."
  },
  {
    id: "privacy-mempool",
    title: "privacy mempool",
    layer: "EL",
    fork: "L*",
    x: 885,
    y: 596,
    kind: "headliner",
    tags: ["privacy"],
    body: "Private, intermediary-free transactions become a design constraint for mempool and frame work.",
    impact: "Treats privacy as a first-class L1 goal instead of an afterthought."
  },
  {
    id: "riscv-leanisa",
    title: "RISC-V / leanISA frames",
    layer: "EL",
    fork: "L*",
    x: 885,
    y: 492,
    kind: "headliner",
    tags: ["lean", "privacy", "scale"],
    body: "Ethereum likely needs a VM or ISA below the EVM for recursive STARKs and programmable privacy.",
    impact: "Moves the EVM toward a compiler-level feature while the protocol sees a proof-friendly ISA."
  },
  {
    id: "native-rollups",
    title: "native rollups",
    layer: "EL",
    fork: "L*",
    x: 885,
    y: 448,
    kind: "onchain",
    tags: ["scale", "lean"],
    body: "Rollup verification becomes more natively aligned with L1 proof systems.",
    impact: "Narrows the gap between L1 security and L2 scale."
  },
  {
    id: "gigagas-l1",
    title: "gigagas L1",
    layer: "EL",
    fork: "north star",
    x: 1160,
    y: 424,
    kind: "north",
    tags: ["scale"],
    body: "The L1 north star targets roughly one gigagas per second with zkEVMs and real-time proving.",
    impact: "Makes high-throughput L1 execution part of the long-term design center."
  },
  {
    id: "private-l1",
    title: "private L1",
    layer: "EL",
    fork: "north star",
    x: 1160,
    y: 596,
    kind: "north",
    tags: ["privacy"],
    body: "Shielded transfers and private flows become normal L1 capabilities.",
    impact: "Lets wallets and apps build privacy without relying on trusted intermediaries."
  },
  {
    id: "post-quantum-l1",
    title: "post quantum L1",
    layer: "Cross",
    fork: "north star",
    x: 1160,
    y: 650,
    kind: "north",
    tags: ["quantum"],
    body: "Every quantum-vulnerable component is replaced with a quantum-safe alternative.",
    impact: "Gives Ethereum a centuries-long cryptographic security horizon."
  }
];

const dependencies = [
  ["epbs", "decoupled-consensus"],
  ["focil", "decoupled-consensus"],
  ["decoupled-consensus", "quick-slots"],
  ["decoupled-consensus", "one-round-finality"],
  ["quick-slots", "fast-l1"],
  ["one-round-finality", "fast-l1"],
  ["epbs", "distributed-builders"],
  ["distributed-builders", "fast-l1"],
  ["pq-heartbeat", "pq-attestations"],
  ["pq-attestations", "post-quantum-l1"],
  ["data-availability", "teragas-l2"],
  ["lean-da", "post-quantum-l1"],
  ["lean-da", "teragas-l2"],
  ["blob-futures", "teragas-l2"],
  ["gas-limit", "gigagas-l1"],
  ["multigas", "state-types"],
  ["state-types", "utxo-storage"],
  ["utxo-storage", "state-scale"],
  ["state-scale", "gigagas-l1"],
  ["utxo-storage", "private-l1"],
  ["privacy-mempool", "private-l1"],
  ["recursive-starks", "riscv-leanisa"],
  ["recursive-starks", "native-rollups"],
  ["riscv-leanisa", "privacy-mempool"],
  ["native-rollups", "gigagas-l1"],
  ["recursive-starks", "post-quantum-l1"]
];

const roadmap = document.querySelector("#roadmap");
const dependencyLayer = document.querySelector("#dependencyLayer");
const searchInput = document.querySelector("#searchInput");
const resetButton = document.querySelector("#resetButton");
const detailTitle = document.querySelector("#detailTitle");
const detailBody = document.querySelector("#detailBody");
const detailLayer = document.querySelector("#detailLayer");
const detailFork = document.querySelector("#detailFork");
const detailImpact = document.querySelector("#detailImpact");

let activeFilter = "all";
let selectedId = "recursive-starks";

function renderBase() {
  layers.forEach((layer) => {
    const band = document.createElement("div");
    band.className = `layer-band ${layer.className}`;
    const title = document.createElement("div");
    title.className = "layer-title";
    title.textContent = layer.label;
    band.append(title);
    roadmap.append(band);
  });

  forks.forEach((fork) => {
    const label = document.createElement("div");
    label.className = "fork-label";
    label.style.left = `${fork.x}px`;
    label.innerHTML = `${fork.year}<strong>${fork.name}</strong>`;
    roadmap.append(label);
  });
}

function renderNodes() {
  nodes.forEach((node) => {
    const card = document.createElement("button");
    card.className = "node-card";
    card.type = "button";
    card.id = node.id;
    card.dataset.layer = node.layer;
    card.dataset.kind = node.kind;
    card.dataset.tags = node.tags.join(" ");
    card.style.left = `${node.x - (node.width || 132) / 2}px`;
    card.style.top = `${node.y}px`;
    card.style.width = `${node.width || 132}px`;
    card.textContent = node.title;
    card.addEventListener("click", () => selectNode(node.id));
    roadmap.append(card);
  });
}

function drawDependencies() {
  dependencyLayer.replaceChildren();
  dependencies.forEach(([fromId, toId]) => {
    const from = nodes.find((node) => node.id === fromId);
    const to = nodes.find((node) => node.id === toId);
    if (!from || !to) return;

    const fromWidth = from.width || 132;
    const toWidth = to.width || 132;
    const startX = from.x + fromWidth / 2 - 20;
    const startY = from.y + 23;
    const endX = to.x - toWidth / 2 + 8;
    const endY = to.y + 23;
    const midX = startX + Math.max(36, (endX - startX) * 0.5);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "rgba(50, 56, 65, 0.34)");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("data-from", fromId);
    path.setAttribute("data-to", toId);
    dependencyLayer.append(path);
  });
}

function selectNode(id) {
  selectedId = id;
  const node = nodes.find((item) => item.id === id);
  if (!node) return;

  detailTitle.textContent = node.title;
  detailBody.textContent = node.body;
  detailLayer.textContent = node.layer;
  detailFork.textContent = node.fork;
  detailImpact.textContent = node.impact;

  document.querySelectorAll(".node-card").forEach((card) => {
    card.classList.toggle("selected", card.id === id);
  });

  const related = new Set([id]);
  dependencies.forEach(([from, to]) => {
    if (from === id) related.add(to);
    if (to === id) related.add(from);
  });

  document.querySelectorAll(".dependency-layer path").forEach((path) => {
    const isRelated = path.dataset.from === id || path.dataset.to === id;
    path.setAttribute("stroke", isRelated ? "#111" : "rgba(50, 56, 65, 0.18)");
    path.setAttribute("stroke-width", isRelated ? "3" : "1.5");
  });

  document.querySelectorAll(".node-card").forEach((card) => {
    card.classList.toggle("dimmed", !related.has(card.id));
  });
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".node-card").forEach((card) => {
    const node = nodes.find((item) => item.id === card.id);
    const matchesTheme = activeFilter === "all" || node.tags.includes(activeFilter);
    const haystack = `${node.title} ${node.body} ${node.impact} ${node.layer} ${node.fork} ${node.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    card.classList.toggle("hidden-by-query", !matchesTheme || !matchesQuery);
  });
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

document.querySelectorAll(".star-card").forEach((button) => {
  button.addEventListener("click", () => selectNode(button.dataset.star));
});

searchInput.addEventListener("input", applyFilters);

resetButton.addEventListener("click", () => {
  activeFilter = "all";
  searchInput.value = "";
  document.querySelectorAll(".segment").forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.filter === "all");
  });
  document.querySelectorAll(".node-card").forEach((card) => {
    card.classList.remove("dimmed", "hidden-by-query");
  });
  selectNode("recursive-starks");
});

renderBase();
renderNodes();
drawDependencies();
selectNode(selectedId);
