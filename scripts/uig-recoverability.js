#!/usr/bin/env node
// Deterministic recoverability attestation for a frozen evaluation payload.
// For each learned correction, grades whether the frozen payload files explain
// the field, the triggering condition, and the required value through sentence
// co-occurrence. The attestation is frozen with the plan; reviewers may amend
// grades before freezing, never after. Absence of an explicit repair in the
// payload never proves novel knowledge by itself.
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const sha = value => crypto.createHash("sha256").update(value).digest("hex")
const text = value =>
  typeof value === "string" && value.trim().length >= 2
const words = value =>
  String(value)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
const fieldTokens = field =>
  String(field)
    .split(".")
    .map(words)
    .flat()
const escape = word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const contains = (sentence, token) =>
  new RegExp("(^|[^a-z0-9])" + escape(token) + "($|[^a-z0-9])", "i").test(
    sentence.text
  )

function sentences(raw) {
  const out = []
  const lines = String(raw).split(/\r?\n/)
  let current = "",
    start = 1
  const flush = () => {
    const value = current.trim()
    if (value) out.push({ line: start, text: value.slice(0, 260) })
  }
  lines.forEach((line, i) => {
    if (!current && line.trim()) start = i + 1
    current += (current ? " " : "") + line
    if (/[.!?](\s*)$/.test(line) || !line.trim()) {
      flush()
      current = ""
    }
  })
  flush()
  return out
}

function gradeCorrection({ correction, files }) {
  const value = correction.after.value
  const field = fieldTokens(correction.field)
  // Trigger words come from the diagnostic code; the whole code phrase must be
  // present for the repair to count as explicitly explained.
  const trigger = words(correction._triggerCode || "")
  const wantValue = ["", ...words(value)].filter(Boolean)
  const excerpts = []
  for (const file of files) {
    for (const sentence of sentences(file.raw)) {
      const hasField = field.length && field.every(t => contains(sentence, t))
      const hasValue = wantValue.some(t => contains(sentence, t))
      const hasTrigger =
        !trigger.length ||
        trigger.every(t => contains(sentence, t))
      if (hasField && hasValue && hasTrigger) {
        excerpts.push({
          file: file.path,
          line: sentence.line,
          text: sentence.text,
        })
        if (excerpts.length === 5) break
      }
    }
    if (excerpts.length === 5) break
  }
  if (excerpts.length)
    return { grade: "explicit", excerpts }
  // Partial: value and field appear together somewhere, but not the trigger.
  for (const file of files) {
    for (const sentence of sentences(file.raw)) {
      const hasField = field.length && field.every(t => contains(sentence, t))
      const hasValue = wantValue.some(t => contains(sentence, t))
      if (hasField && hasValue) {
        return {
          grade: "partial",
          excerpts: [
            { file: file.path, line: sentence.line, text: sentence.text },
          ],
        }
      }
    }
  }
  return { grade: "unclear", excerpts: [] }
}

function gradeRecoverability({ manifest, lesson, root }) {
  if (!Array.isArray(manifest.files))
    throw Error("manifest must list payload files")
  const loaded = []
  for (const entry of manifest.files) {
    const file = path.resolve(root, entry.path)
    let raw = null
    try {
      raw = fs.readFileSync(file, "utf8")
    } catch {
      // Missing files are recorded, not treated as explanatory.
    }
    loaded.push({ path: entry.path, raw: raw || "" })
  }
  // Pins the frozen payload by path and content, so later drift in any pinned
  // file changes the digest even when the manifest path list is unchanged.
  const payload_sha256 = sha(
    loaded.map(f => f.path + "\n" + f.raw).join("\n")
  )
  const body = lesson.body
  const corrections = (body.corrections || []).map(correction => {
    const g = gradeCorrection({
      correction: {
        ...correction,
        _triggerCode: (body.trigger && body.trigger.code) || "",
      },
      files: loaded,
    })
    return {
      field: correction.field,
      value: correction.after.value,
      grade: g.grade,
      excerpts: g.excerpts,
    }
  })
  const counts = { explicit: 0, partial: 0, unclear: 0 }
  for (const c of corrections) counts[c.grade]++
  const summaryTokens = []
  if (corrections.length)
    summaryTokens.push(
      `${counts.explicit} explicit, ${counts.partial} partial, ${counts.unclear} unclear`
    )
  else summaryTokens.push("no corrections")
  const summary =
    counts.explicit === 0 && counts.partial === 0
      ? `No payload file explains any correction (${summaryTokens.join(", ")}); claim altitude stays unverified.`
      : `The frozen payload explains at least one correction (${summaryTokens.join(", ")}); claim altitude is capped at guidance-effect.`
  return {
    payload_sha256,
    automated: true,
    method: "sentence co-occurrence of field, required value, and diagnostic trigger",
    corrections,
    summary,
  }
}

const help = `Grade recoverability of a frozen evaluation payload against a learned lesson:
  npm run uig:recover -- --payload manifest.json --lesson lesson.json [--root DIR] [--out file]

For each learned correction, grades whether the frozen payload files explain the
field, the diagnostic trigger, and the required value via sentence co-occurrence.
The attestation (explicit/partial/unclear) is frozen with the evaluation plan and
only downgrades a claim. payload_sha256 pins the payload by path and content.
`
function main(args) {
  const get = name =>
    args[args.indexOf(name) + 1]
  if (args.includes("--help")) {
    console.log(help)
    return null
  }
  if (!args.includes("--payload") || !args.includes("--lesson"))
    throw Error(
      help.replace(/\n$/, "") +
        "\nusage: node scripts/uig-recoverability.js --payload manifest.json --lesson lesson.json [--root DIR] [--out file]"
    )
  const root = args.includes("--root") ? get("--root") : process.cwd()
  const manifest = JSON.parse(fs.readFileSync(get("--payload"), "utf8"))
  const lesson = JSON.parse(fs.readFileSync(get("--lesson"), "utf8"))
  const attestation = gradeRecoverability({ manifest, lesson, root })
  const out = args.includes("--out") ? get("--out") : null
  const json = JSON.stringify(attestation, null, 2)
  if (out) fs.writeFileSync(out, json + "\n")
  else console.log(json)
  return attestation
}
if (require.main === module)
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(`[uig:recover] ${error.message}`)
    process.exitCode = 1
  }
module.exports = { gradeRecoverability, sentences, fieldTokens }
