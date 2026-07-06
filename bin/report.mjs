#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runScenarioSpec } from "../src/lean-lab.mjs";

const args = process.argv.slice(2);
const check = args.includes("--check");
const scenarioFiles = args.filter((arg) => arg !== "--check");
const files = scenarioFiles.length > 0 ? scenarioFiles : await discoverScenarioFiles();
const reports = [];
const stale = [];

await mkdir("reports", { recursive: true });

for (const file of files) {
  const scenario = JSON.parse(await readFile(file, "utf8"));
  const report = runScenarioSpec(scenario);
  reports.push(report);
  const base = scenario.id;
  await writeOrCheck(join("reports", `${base}.json`), `${JSON.stringify(report, null, 2)}\n`);
  await writeOrCheck(join("reports", `${base}.md`), renderMarkdownReport(report));
}

const index = renderIndex(reports);
await writeOrCheck(join("reports", "README.md"), index);

const summary = {
  ok: reports.every((report) => report.ok),
  mode: check ? "check" : "write",
  stale,
  reports: reports.map((report) => ({
    id: report.scenario.id,
    ok: report.ok,
    markdown: `reports/${report.scenario.id}.md`,
    json: `reports/${report.scenario.id}.json`
  }))
};

console.log(JSON.stringify(summary, null, 2));
if (!summary.ok || stale.length > 0) {
  process.exitCode = 1;
}

async function writeOrCheck(path, content) {
  if (!check) {
    await writeFile(path, content);
    return;
  }

  let existing = "";
  try {
    existing = await readFile(path, "utf8");
  } catch {
    stale.push(path);
    return;
  }
  if (existing !== content) stale.push(path);
}

async function discoverScenarioFiles() {
  const entries = await readdir("scenarios");
  return entries.filter((entry) => entry.endsWith(".json")).sort().map((entry) => join("scenarios", entry));
}

function renderIndex(reports) {
  const lines = [
    "# Scenario Reports",
    "",
    "Generated from `scenarios/*.json` with `npm run report`.",
    "",
    "| Scenario | Status | Final head | Total fee | Private frames |",
    "| --- | --- | --- | ---: | ---: |"
  ];
  for (const report of reports) {
    lines.push(
      `| [${report.scenario.name}](${report.scenario.id}.md) | ${report.ok ? "pass" : "fail"} | ${report.summary.finalHead ?? "none"} | ${report.summary.totalFee} | ${report.summary.privateFrames} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

function renderMarkdownReport(report) {
  const checks = report.assertions.checks
    .map((check) => `| ${check.id} | ${check.pass ? "pass" : "fail"} | \`${formatValue(check.actual)}\` | \`${formatValue(check.expected)}\` |`)
    .join("\n");
  const gas = report.gas
    .map((item) => `| ${item.id} | ${item.stateClass} | ${item.fee} | ${item.vector.compute} | ${item.vector.stateWrite} | ${item.vector.proof} | ${item.vector.privacy} |`)
    .join("\n");
  const custody = report.custody
    .map((item) => `| ${item.stateId} | ${item.class} | ${item.custodians.join(", ")} |`)
    .join("\n");

  return [
    `# ${report.scenario.name}`,
    "",
    `Scenario id: \`${report.scenario.id}\``,
    `Status: **${report.ok ? "pass" : "fail"}**`,
    "",
    "## Summary",
    "",
    `- Final head: \`${report.summary.finalHead ?? "none"}\``,
    `- Total multidimensional fee: \`${report.summary.totalFee}\``,
    `- Private frames: \`${report.summary.privateFrames}\``,
    `- State classes: \`${report.summary.stateClasses.join(", ")}\``,
    `- Proof verified: \`${report.proofVerified}\``,
    `- Dependency graph valid: \`${report.summary.dependencyGraphValid}\``,
    "",
    "## Assertions",
    "",
    "| Check | Status | Actual | Expected |",
    "| --- | --- | --- | --- |",
    checks,
    "",
    "## Gas Vectors",
    "",
    "| Transaction | State class | Fee | Compute | State writes | Proof | Privacy |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: |",
    gas,
    "",
    "## State Custody",
    "",
    "| State object | Class | Custodians |",
    "| --- | --- | --- |",
    custody,
    "",
    "## Proof Inputs",
    "",
    "```json",
    JSON.stringify(report.proof.publicInputs, null, 2),
    "```",
    ""
  ].join("\n");
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null) return "null";
  return String(value);
}
