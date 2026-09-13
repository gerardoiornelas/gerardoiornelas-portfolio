import os, json, shutil, subprocess, hashlib, time
from pathlib import Path
ROOT=Path('/Users/ornelastechnologies/Documents/Git/violetek/gerardoiornelas-portfolio')
OUT=Path('/tmp/uig-token-comparison-v2')
BIN='/Applications/ChatGPT.app/Contents/Resources/codex'
def git(args,cwd=ROOT): return subprocess.check_output(['git',*args],cwd=cwd,text=True).strip()
import sys
payload_raw=(OUT/'payload-manifest.json').read_bytes()
payload=json.loads(payload_raw)
expected=hashlib.sha256(payload_raw).hexdigest()
if sys.argv[1:] != ['--approved-payload', expected]:
 raise SystemExit('Pass the frozen payload hash for the user-requested comparison.')
files=[row['path'] for row in payload['files']]
for row in payload['files']:
 if hashlib.sha256((ROOT/row['path']).read_bytes()).hexdigest()!=row['sha256']:
  raise SystemExit('Payload changed; review required: '+row['path'])
base=OUT/'snapshot'; base.mkdir(exist_ok=True)
for f in files:
 p=base/f;p.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(ROOT/f,p)
# Freeze the task code. Workflow is the only intentional treatment difference.
old_skill=(ROOT/'plans/uigate/uigate-skill.md').read_text()
new_skill=(ROOT/'plans/uigate/uigate-skill.md').read_text()
manifest={'source_head':git(['rev-parse','HEAD']),'files':{f:hashlib.sha256((base/f).read_bytes()).hexdigest() for f in files},'model':'gpt-6-astra','reasoning_effort':'medium','cli':subprocess.check_output([BIN,'--version'],text=True).strip(),'repetitions':2,'order':'baseline then compact in repetition 1, reversed in repetition 2','scope':'joint treatment: task-specific startup plus receipt-generator use versus broad startup plus manual receipt; identical code, validator, template, lessons, model, task and acceptance; human acceptance not inferred'}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
tasks={
'ui': 'Change only the visible download-button label in src/pages/uig.tsx from Download uig-skill.md to Download UIG skill (.md). Preserve the actual filename uig-skill.md, Blob MIME type, click behavior, layout, and all authority language. Acceptance: label appears exactly once, link.download filename unchanged, site build passes, UI ready for human acceptance. Do not claim human acceptance.',
'validator': 'In scripts/validate-okf.js reject duplicate exact path entries in receipt sources with a clear duplicate-source error. Preserve acceptance of unique sources and all existing checks. Add a regression test in scripts/validate-okf.test.js that fails before this correction and passes afterward. Acceptance: duplicate sources rejected, valid unique sources accepted, all existing tests and new regression pass.',
 'docs': 'Add the exact sentence "Use a temporary XDG_CONFIG_HOME only after a global configuration write failure; preserve the sandbox and required checks." to the build troubleshooting guidance in AGENTS.md, knowledge/context.md, and knowledge/README.md. Preserve existing authority and verification requirements and all existing commands. Acceptance: sentence appears once in each of those three files, npm run okf:validate passes, no application code changed.'}

common='''This is one authorized local experimental ticket in a disposable copy. Read WORKFLOW.md as the selected workflow, then required repository instructions and task-relevant source. The selected WORKFLOW.md controls retrieval for this trial; other copies of the skill are source artifacts, not a second workflow to load. Do not consult sibling runs, the source repository, or other agents. Use only local shell/file tools. Do not install packages, use network/browser/connectors, spawn agents, change tool config, commit task output, push, or deploy. Temporary Git fixture commits created by existing tests are allowed; do not change the trial checkout HEAD. node_modules is shared read-only; do not modify it.
Common acceptance protocol for both variants: existing authorization covers exactly this ticket's local changes, tests, receipt and warranted lesson. Complete the single ticket without requesting implementation permission again. Automated acceptance is assessed by the pilot reviewer after you finish; UI acceptance remains pending the human. This common protocol overrides any workflow requirement for additional per-ticket stop phrases. Do not mark human acceptance complete.
Run required relevant checks and attempt graphify . --update once after changes, capturing its actual result; if an installed backend is unavailable, record the limitation without installing dependencies or performing a whole-corpus semantic fallback in this bounded trial. Include all failures and retries. This graph limitation prevents claiming full operational acceptance and is identical for both variants.
Follow the receipt-authoring method specified at the end of WORKFLOW.md. Both variants use the same current template, validator, and pending-human-review semantics. Write one receipt and only warranted learning; do not fabricate token counts. End with a concise final containing changes, check results, limitations and pending human acceptance if any. Do not edit WORKFLOW.md or this experimental protocol.
Task: '''
runs=[]
for rep in [1,2]:
 for task in tasks:
  for variant in (['baseline','compact'] if rep==1 else ['compact','baseline']):
   ident=f'{task}-r{rep}-{variant}';work=OUT/'runs'/ident;shutil.copytree(base,work)
   os.symlink(ROOT/'node_modules',work/'node_modules',target_is_directory=True)
   # Equal current code, schema, lessons and checks; only startup routing and authoring method vary.
   recipe = "\n\n## Experimental receipt method\n" + ("Create the receipt manually from knowledge/templates/template-receipt.md. Do not use scripts/create-okf-receipt.js or okf:receipt in this baseline.\n" if variant=='baseline' else "Create the receipt using npm run okf:receipt. Read --help, initialize the input, fill actual evidence, and generate the receipt.\n")
   (work/'WORKFLOW.md').write_text(new_skill+recipe)
   if variant=='baseline':
    (work/'AGENTS.md').write_text((OUT/'baseline-agents.md').read_text())
    (work/'knowledge/context.md').write_text((OUT/'baseline-context.md').read_text())
   git(['init','-q'],work);git(['add','.'],work);git(['-c','user.name=Pilot','-c','user.email=pilot@example.invalid','commit','-qm','Frozen pilot starting state'],work)
   prompt=common+tasks[task]
   (OUT/f'{ident}.prompt.txt').write_text(prompt)
   run={'id':ident,'task':task,'variant':variant,'repetition':rep,'starting_commit':git(['rev-parse','HEAD'],work),'workdir':str(work),'model':'gpt-6-astra','reasoning_effort':'medium','started':time.time()}
   print('START '+ident,flush=True)
   with (OUT/f'{ident}.jsonl').open('w') as stdout,(OUT/f'{ident}.stderr').open('w') as stderr:
    try:
     proc=subprocess.run([BIN,'exec','--ephemeral','--json','-s','workspace-write','-C',str(work),'-m','gpt-6-astra','-c','model_reasoning_effort="medium"',prompt],stdin=subprocess.DEVNULL,stdout=stdout,stderr=stderr,timeout=420)
     run['exit_code']=proc.returncode
    except subprocess.TimeoutExpired:run['exit_code']=124;run['limitation']='420 second run timeout; token totals may be incomplete'
   run['elapsed_seconds']=round(time.time()-run['started'],2)
   (OUT/f'{ident}.diff').write_text(git(['diff','--','.',':(exclude)graphify-out'],work))
   run['untracked']=git(['ls-files','--others','--exclude-standard'],work).splitlines()
   runs.append(run);(OUT/'runs.json').write_text(json.dumps(runs,indent=2))
   print('DONE '+ident+' exit='+str(run['exit_code']),flush=True)
print('ALL TRIALS FINISHED',flush=True)
