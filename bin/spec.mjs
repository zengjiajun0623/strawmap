#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { runScenarioSpec } from "../src/lean-lab.mjs";

const args = process.argv.slice(2);
const full = args.includes("--full");
const scenarioFiles = args.filter((arg) => arg !== "--full");
const files = scenarioFiles.length > 0 ? scenarioFiles : await discoverScenarioFiles();
const reports = [];

for (const file of files) {
  const scenario = JSON.parse(await readFile(file, "utf8"));
  reports.push(runScenarioSpec(scenario));
}

const summary = {
  ok: reports.every((report) => report.ok),
  scenarioCount: reports.length,
  scenarios: reports.map((report) => ({
    id: report.scenarioId ?? report.scenario?.id,
    name: report.scenario?.name,
    ok: report.ok,
    checks: report.assertions?.checks?.length ?? 0,
    failures: report.failures ?? report.assertions?.failures ?? []
  }))
};

console.log(JSON.stringify(full ? { summary, reports } : summary, null, 2));

if (!summary.ok) {
  process.exitCode = 1;
}

async function discoverScenarioFiles() {
  const dir = "scenarios";
  const entries = await readdir(dir);
  return entries.filter((entry) => entry.endsWith(".json")).sort().map((entry) => join(dir, entry));
}
