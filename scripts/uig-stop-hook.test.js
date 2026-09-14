const test = require("node:test")
const assert = require("assert")
const { detectUig, countUsage } = require("./uig-stop-hook")

const entry = o => JSON.stringify(o)

test("countUsage sums unique assistant messages and skips retried message ids", () => {
  const transcript = [
    entry({ type: "assistant", message: { id: "m1", usage: { input_tokens: 1000, output_tokens: 500, cache_read_input_tokens: 200, cache_creation_input_tokens: 50, output_tokens_details: {} } } }),
    entry({ type: "assistant", message: { id: "m1", usage: { input_tokens: 1000, output_tokens: 500, cache_read_input_tokens: 200, cache_creation_input_tokens: 50 } } }), // retried: same id
    entry({ type: "assistant", message: { id: "m2", usage: { input_tokens: 300, output_tokens: 100, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 } } }),
    entry({ type: "user", message: { role: "user", content: "hi" } }),
    entry({ some: "unrelated line" }),
    "not-json{",
  ].join("\n")
  const u = countUsage(transcript)
  assert.equal(u.input_tokens, 1300)
  assert.equal(u.output_tokens, 600)
  assert.equal(u.cached_input_tokens, 250)
  assert.equal(u.total, 1900)
  assert.equal(u.usage_lines, 2)
})

test("countUsage ignores missing or malformed usage objects", () => {
  const transcript = [
    entry({ type: "assistant", message: { id: "m1", content: [{ type: "text", text: "no usage" }] } }),
    '{"type":"assistant","message":{"id":"m2","usage":{}}',
    entry({ type: "assistant", message: { id: "m3", usage: { input_tokens: 10, output_tokens: 5 } } }),
  ].join("\n")
  const u = countUsage(transcript)
  assert.equal(u.input_tokens, 10)
  assert.equal(u.output_tokens, 5)
  assert.equal(u.usage_lines, 1)
})

test("detectUig recognizes skill invocation, completion, and slash-command markers", () => {
  assert.equal(detectUig(JSON.stringify({ "skill": "uig" })), true)
  assert.equal(detectUig("UI-GATES COMPLETE — outcome verified, provenance recorded"), true)
  assert.equal(detectUig("<command-name>uig-update</command-name>"), true)
  assert.equal(detectUig("<command-name>uig</command-name>"), true)
  assert.equal(detectUig(JSON.stringify({ "skill": "graphify" })), false)
  assert.equal(detectUig("a plain session that never ran uig"), false)
})
