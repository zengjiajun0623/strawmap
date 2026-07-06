#!/usr/bin/env node
import { buildImplementationMatrix, validateDependencyGraph } from "../src/lean-lab.mjs";

const graph = validateDependencyGraph();
const matrix = buildImplementationMatrix();

if (!graph.ok) {
  console.error(JSON.stringify(graph, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ graph, matrix }, null, 2));
}
