# Restricted Gatsby build

Applies when: Gatsby fails trying to write global config outside the workspace, especially in a fresh disposable checkout, or completes pages but fails on feedback/telemetry config.

First inspect the error. Telemetry and feedback have separate switches: `GATSBY_TELEMETRY_DISABLED=1 GATSBY_FEEDBACK_DISABLED=1 npm run build`. These switches do not prevent every global-config write.

For the observed global-config permission error, use a command-local temporary config directory:

```sh
uig_config_dir="$(mktemp -d)"
XDG_CONFIG_HOME="$uig_config_dir" GATSBY_TELEMETRY_DISABLED=1 GATSBY_FEEDBACK_DISABLED=1 npm run build
```

Limits: this does not fix dependency, compilation, or unrelated permission failures. Do not change the user's global config or weaken the sandbox. Preserve behavior checks and human acceptance requirements. Retain the temporary build evidence as needed.

Evidence: all four UI trials in the [2026-09-13 pilot](../../docs/compound-engineering/pilots/2026-09-13/report.md) passed after redirecting config; both revised trials verified the temporary directory plus both switches. This refines the narrower [trusted completion observation](../receipts/2026-09-13-trusted-completion.md). The refined lesson has not been benchmarked for token savings.
