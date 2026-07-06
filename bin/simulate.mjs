#!/usr/bin/env node
import { runOneShotProgram } from "../src/lean-lab.mjs";

const seed = process.argv[2] ?? "lean-devnet-0";
const report = runOneShotProgram(seed);

console.log(JSON.stringify(report, null, 2));
