#!/usr/bin/env node
// Operational harness for the frozen receipt-learning evaluation. Local and
// deterministic. This file never commits trial patches, never imports smoke
// receipts as discovery evidence, and never fabricates token usage or
// acceptance. It invokes the external codex binary only with an explicit
// --exec flag and an authorized config.
//
//   node runner.cjs --help
//   node runner.cjs verify config.json        payload + cases + isolation contract
//   node runner.cjs smoke config.json         each case's intended failing fixture still fails, in disposable stores
//   node runner.cjs provision config.json     per-arm disposable stores with control blinding; prints mapping
//   node runner.cjs run config.json           dry-run unless --exec: prints every codex invocation to be made
//   node runner.cjs run --exec config.json    actually invoke codex with timeouts, recording limitations
//
// Security constraints carried from the amendment: no deployment, commit, push;
// no live lesson approval; any wall-clock timeout makes the primary result
// inconclusive (recorded as a limitation, never a token estimate); control
// agents cannot read the candidate lesson or any plan containing its content.
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { spawnSync } = require("child_process")
const sha = value => crypto.createHash("sha256").update(value).digest("hex")

const help = `Local frozen-evaluation runner (no commits, deployments, or fabricated results):
  verify config.json     payload content hash + cases shape + plan/lesson presence
  smoke config.json      run each case's intended-failing fixture in a disposable store
  provision config.json  build per-arm disposable stores with control blinding
  run config.json        dry-run: print every codex invocation (safe default)
  run --exec config.json invoke codex with timeouts; record limitations honestly

Set CODEX_BIN to override the codex binary path. Any timeout writes a limitation
into the finish payload and never estimates token usage.
`
const read = file => JSON.parse(fs.readFileSync(file, "utf8"))
const text = value => typeof value === "string" && value.trim().length >= 2
const ensure = (condition, message) => {
  if (!condition) throw Error(message)
  return condition
}

function payloadSha(files) {
  // Must match scripts/uig-recoverability.js exactly so the pinned digest
  // produced at plan freeze is reproducible here.
  return sha(files.map(f => f.path + "\n" + f.raw).join("\n"))
}

function verify(config) {
  ensure(config && config.payload && typeof config.payload === "object",
    "config.payload missing: { manifest, root, expected_sha256 }")
  const manifest = read(config.payload.manifest)
  ensure(Array.isArray(manifest.files) && manifest.files.length > 0,
    "payload manifest must list frozen files")
  const loaded = manifest.files.map(entry => {
    let raw = ""
    try {
      raw = fs.readFileSync(path.resolve(config.payload.root, entry.path), "utf8")
    } catch {
      // Missing files are recorded, not treated as explanatory.
    }
    return { path: entry.path, raw }
  })
  const digest = payloadSha(loaded)
  if (config.payload.expected_sha256)
    ensure(digest === config.payload.expected_sha256,
      `payload_sha256 mismatch (${digest.slice(0, 12)}… != ${config.payload.expected_sha256.slice(0, 12)}…): frozen payload drifted from the recoverability attestation`)
  const missing = loaded.filter(f => f.raw.length === 0).map(f => f.path)
  ensure(missing.length === 0,
    "payload files missing from disk: " + missing.join(", "))
  if (Array.isArray(config.cases)) validateCases(config)
  if (config.lesson)
    ensure(fs.existsSync(config.lesson), "lesson.json missing: " + config.lesson)
  return { digest, files: loaded.map(f => f.path) }
}

function validateCases(config) {
  const cases = config.cases || []
  ensure(Array.isArray(cases) && cases.length >= 6,
    "at least six distinct holdout cases required")
  const ids = cases.map(c => c.id)
  ensure(ids.every(text) && new Set(ids).size === cases.length,
    "holdout case ids must be distinct descriptive slugs")
  for (const c of cases) {
    ensure(text(c.prompt) && fs.existsSync(c.prompt),
      "each case needs an existing prompt file for id: " + c.id)
    ensure(text(c.first_receipt) && fs.existsSync(c.first_receipt),
      "each case needs its intended initially-failing receipt fixture: " + c.id)
    if (c.fixed_receipt)
      ensure(fs.existsSync(c.fixed_receipt),
        "fixed receipt fixture missing for: " + c.id)
  }
  return cases
}

function runNode(args, { cwd, env = {}, input } = {}) {
  return spawnSync(process.execPath, args, {
    cwd,
    input,
    encoding: "utf8",
    env: { ...process.env, ...env },
    maxBuffer: 16 * 1024 * 1024,
  })
}

function copyWorkspace(src, dst) {
  // Disposable checkouts exclude the store: it is seeded separately from the
  // central recorder store so arm stores are exactly what the runner controls.
  const skip = new Set([path.join(src, ".uig-learning")])
  fs.mkdirSync(dst, { recursive: true })
  const entries = fs.readdirSync(src).map(name => path.join(src, name))
  for (const entry of entries) {
    if (skip.has(entry)) continue
    fs.cpSync(entry, path.join(dst, path.basename(entry)), { recursive: true })
  }
}

function seedStore(storeSource, storeDest, { control }) {
  // Seed an arm's `.uig-learning` from the central recorder store so
  // `uig:learn start` sees the same frozen plan. Control arms must not read
  // the candidate lesson or any plan carrying its content: they get no lesson
  // records at all and plan records stripped of every lesson body.
  fs.mkdirSync(storeDest, { recursive: true })
  if (!fs.existsSync(storeSource)) return
  for (const kind of ["lessons", "plans", "history", "runs", "attempts"]) {
    const srcDir = path.join(storeSource, kind)
    if (!fs.existsSync(srcDir)) continue
    if (control && kind === "lessons") continue
    fs.mkdirSync(path.join(storeDest, kind), { recursive: true })
    for (const name of fs.readdirSync(srcDir).filter(f => f.endsWith(".json"))) {
      const record = JSON.parse(fs.readFileSync(path.join(srcDir, name), "utf8"))
      if (control) {
        // A plan with a lesson body would leak the candidate to the control arm.
        if (Array.isArray(record.lessons)) for (const l of record.lessons) delete l.body
        delete record.body
      }
      fs.writeFileSync(path.join(storeDest, kind, name), JSON.stringify(record))
    }
  }
}

function isolationViolation(storeDir) {
  // Returns the first violation or null. Control stores must carry no lesson
  // records and no plan body (a plan with lesson content would leak it).
  let violations = []
  const lessonsDir = path.join(storeDir, "lessons")
  if (fs.existsSync(lessonsDir))
    for (const f of fs.readdirSync(lessonsDir).filter(x => x.endsWith(".json"))) {
      const record = JSON.parse(fs.readFileSync(path.join(lessonsDir, f), "utf8"))
      if (record.body && Object.keys(record.body).length)
        violations.push("lesson body present: " + f)
    }
  const plansDir = path.join(storeDir, "plans")
  if (fs.existsSync(plansDir))
    for (const f of fs.readdirSync(plansDir).filter(x => x.endsWith(".json"))) {
      const record = JSON.parse(fs.readFileSync(path.join(plansDir, f), "utf8"))
      if (record.body || (record.lessons || []).some(l => l.body))
        violations.push("plan body present: " + f)
    }
  return violations.length ? violations[0] : null
}

function scratchDir(config) {
  const dir = path.resolve(config.scratch || path.join(process.cwd(), ".uig-runner"))
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

function smoke(config, onlyCase) {
  verify(config)
  const cases = onlyCase ? [onlyCase] : config.cases
  for (const c of cases) {
    const scratch = scratchDir({ ...config, scratch: path.join(config.scratch || ".uig-runner", "smoke-" + c.id) })
    const armWs = path.join(scratch, "workspace")
    copyWorkspace(config.workspace, armWs)
    const slug = new Date().toISOString().slice(0, 10) + "-smoke-" +
      c.id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^[-]+|[-]+$/g, "")
    // Intended-failing fixture must still fail; that is each task's first
    // attempt. No learning run is started, so these receipts cannot become
    // candidate evidence.
    const failing = runNode(["scripts/create-okf-receipt.js", slug, c.first_receipt], { cwd: armWs })
    if (failing.status === 0)
      throw Error(`smoke case ${c.id}: intended failing fixture unexpectedly passed`)
    // A verified correct repair must succeed in the disposable workspace.
    const fixed = c.fixed_receipt || c.first_receipt
    const passing = runNode(["scripts/create-okf-receipt.js", slug, fixed], { cwd: armWs })
    if (passing.status !== 0)
      throw Error(`smoke case ${c.id}: correct repair failed: ${passing.stderr}`)
    console.log(`[runner:smoke] ${c.id} failing fixture rejected, correct repair accepted (disposable store, not imported)`)
  }
}

function provision(config) {
  verify(config)
  validateCases(config)
  const scratch = scratchDir(config)
  const artifacts = { plan: config.plan, arms: [] }
  for (const mode of ["control", "treatment"])
    for (const c of config.cases) {
      const armWs = path.join(scratch, "workspaces", config.plan, c.id, mode)
      copyWorkspace(config.workspace, armWs)
      const store = path.join(armWs, ".uig-learning")
      seedStore(config.store, store, { control: mode === "control" })
      ensure(isolationViolation(store) === null,
        `control isolation violation for ${c.id}: ` + (isolationViolation(store) || ""))
      const planId = config.plan
      artifacts.arms.push({
        task_id: c.id,
        mode,
        plan_id: planId,
        workspace: armWs,
        store,
        prompt: c.prompt,
      })
    }
  const manifestPath = path.join(scratch, "provisioning.json")
  fs.writeFileSync(manifestPath, JSON.stringify(artifacts, null, 2))
  return { manifest: manifestPath, arms: artifacts.arms }
}

function codexCommand(config, arm) {
  const codex = config.codex || {}
  const bin = process.env.CODEX_BIN || codex.bin ||
    "/Applications/ChatGPT.app/Contents/Resources/codex"
  const args = [
    "exec", "--ephemeral", "--json",
    "-s", "workspace-write",
    "-C", arm.workspace,
    "-m", codex.model || "gpt-6-astra",
  ]
  for (const [key, value] of Object.entries(codex.settings || {}))
    args.push("-c", `${key}="${value}"`)
  args.push(fs.readFileSync(arm.prompt, "utf8"))
  return { bin, args }
}

function run(config, { exec }) {
  verify(config)
  const arms = provision(config).arms
  for (const arm of arms) {
    const { bin, args } = codexCommand(config, arm)
    if (!exec) {
      console.log("[runner:dry-run] " + [bin, ...args].map(x => JSON.stringify(x)).join(" "))
      continue
    }
    const runInput = {
      task_id: arm.task_id,
      family: "receipt-authoring",
      mode: arm.mode,
      plan_id: arm.plan_id,
    }
    fs.writeFileSync(path.join(arm.workspace, "arm-run.json"), JSON.stringify(runInput))
    const started = runNode(["scripts/uig-learning-cli.js", "start", "arm-run.json"], { cwd: arm.workspace })
    if (started.status !== 0) throw Error("start failed: " + started.stderr)
    const runId = JSON.parse(started.stdout).id
    const timeoutMs = (config.codex.per_turn_timeout_s || 420) * 1000
    const spawned = spawnSync(bin, args, {
      cwd: arm.workspace,
      encoding: "utf8",
      env: { ...process.env, UIG_LEARNING_RUN: runId },
      timeout: timeoutMs,
      maxBuffer: 32 * 1024 * 1024,
    })
    // A wall-clock timeout is recorded as a limitation. It never estimates
    // token usage; unavailable telemetry stays unknown, never zero.
    const limitation = spawned.error && /ETIMEDOUT/.test(String(spawned.error.message))
      ? `wall-clock timeout after ${config.codex.per_turn_timeout_s || 420}s`
      : null
    const trace = path.join(arm.workspace, "codex.jsonl")
    fs.writeFileSync(trace, [
      ...(spawned.stdout ? [spawned.stdout] : []),
      ...(spawned.stderr ? [spawned.stderr] : []),
    ].join("\n"))
    const finishPayload = {
      model: config.codex.model,
      settings: config.codex.settings || {},
      usage_jsonl: trace,
      reviewer: "REVIEWER MUST ATTEST: confirm acceptance, checks, review evidence and applied lessons before uig:learn finish",
      ...(limitation ? { limitation } : {}),
    }
    fs.mkdirSync(path.dirname(path.join(arm.workspace, "finish.json")), { recursive: true })
    fs.writeFileSync(path.join(arm.workspace, "finish.json"), JSON.stringify(finishPayload, null, 2))
    console.log(`[runner:run] ${arm.task_id}/${arm.mode} run=${runId} exit=${spawned.status}${limitation ? " (limitation recorded — primary will be inconclusive)" : ""}`)
  }
}

function main(cliArgs) {
  const args = [...cliArgs]
  const exec = args.includes("--exec")
  if (exec) args.splice(args.indexOf("--exec"), 1)
  const [command, configFile] = args
  if (!command || command === "--help") return help
  ensure(["verify", "smoke", "provision", "run"].includes(command),
    "unknown runner command; see --help")
  ensure(configFile, "missing config.json argument")
  const commandFile = configFile
  const raw = read(commandFile)
  const config = {
    ...raw,
    store: raw.store || path.join(raw.workspace, ".uig-learning"),
  }
  switch (command) {
    case "verify":
      return { payload_sha256: verify(config).digest, files: verify(config).files }
    case "smoke":
      smoke(config)
      return "smoke checks passed for all cases in disposable stores"
    case "provision": {
      const result = provision(config)
      return `provisioned ${result.arms.length} blinded arms; manifest at ${result.manifest}`
    }
    case "run":
      return run(config, { exec })
  }
}
try {
  const result = main(process.argv.slice(2))
  if (result !== undefined)
    console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2))
} catch (error) {
  console.error(`[runner] ${error.message}`)
  process.exitCode = 1
}
module.exports = { verify, validateCases, seedStore, isolationViolation, payloadSha }
