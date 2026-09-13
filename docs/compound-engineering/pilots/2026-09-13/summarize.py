import json,hashlib,re,subprocess
from pathlib import Path
out=Path('/tmp/uig-token-pilot')
runs=json.loads((out/'runs.json').read_text())
if len(runs)!=12 or any(not (out/(r['id']+'.review.json')).exists() for r in runs):
 raise SystemExit('All 12 artifact reviews must exist before unsealing usage.')
rows=[]
for r in runs:
 events=[]
 for line in (out/(r['id']+'.jsonl')).read_text().splitlines():
  try:events.append(json.loads(line))
  except:pass
 usage=[e['usage'] for e in events if e.get('type')=='turn.completed' and 'usage' in e]
 complete=bool(usage) and r['exit_code']==0
 inp=sum(x.get('input_tokens',0) for x in usage) if complete else None
 output=sum(x.get('output_tokens',0) for x in usage) if complete else None
 cache=sum(x.get('cached_input_tokens',0) for x in usage) if complete else None
 reasoning=sum(x.get('reasoning_output_tokens',0) for x in usage) if complete else None
 review=json.loads((out/(r['id']+'.review.json')).read_text())
 items=[e['item'] for e in events if e.get('type')=='item.completed' and e.get('item')]
 commands=[i for i in items if i.get('type')=='command_execution']
 normalized=json.loads(subprocess.check_output(['python3',str(out/'normalize-shell.py')],input=json.dumps([i.get('command','') for i in commands]).encode()))
 build_attempts=sum(bool(re.search(r'(?:^|[;\n])\s*(?:[A-Z_]+=[^\s]+\s+)*npm run build\b',s)) for s in normalized)
 lesson_reads=sorted({p for s in normalized for p in re.findall(r'knowledge/lessons/[a-z-]+\.md',s) if re.search(r'\b(cat|sed|head|tail)\b',s)})
 row={**r,'measurement_kind':'actual' if complete else 'incomplete','telemetry_source':'Codex exec JSONL turn.completed.usage','input_tokens_including_cache':inp,'cached_input_tokens_subset':cache,'output_tokens':output,'reasoning_output_tokens_subset':reasoning,'total_tokens_including_retries_and_learning':inp+output if complete else None,'failed_commands_including_expected_red_tests':sum(i.get('exit_code') not in [None,0] for i in commands),'command_count':len(commands),'build_attempts':build_attempts,'lesson_paths_in_read_commands':lesson_reads,'automated_acceptance':review['automated_acceptance'],'checks':review['checks'],'human_acceptance':review['human_acceptance'],'review_sha256':hashlib.sha256((out/(r['id']+'.review.json')).read_bytes()).hexdigest(),'event_sha256':hashlib.sha256((out/(r['id']+'.jsonl')).read_bytes()).hexdigest()}
 rows.append(row)
pairs=[]
for rep in [1,2]:
 for task in ['ui','validator','docs']:
  b=next(r for r in rows if r['repetition']==rep and r['task']==task and r['variant']=='baseline');c=next(r for r in rows if r['repetition']==rep and r['task']==task and r['variant']=='compact')
  bt=b['total_tokens_including_retries_and_learning'];ct=c['total_tokens_including_retries_and_learning']
  pairs.append({'task':task,'repetition':rep,'baseline':bt,'compact':ct,'change_percent':round((ct-bt)/bt*100,2) if bt and ct is not None else None,'both_automated_pass':b['automated_acceptance']==c['automated_acceptance']=='pass'})
report={'rows':rows,'pairs':pairs,'limitations':['UI human acceptance is separate and may remain pending.','Graph semantic refresh failed on the installed backend; full operational acceptance is not established.','Current implementation code and acceptance tests were held equal; workflow and lesson availability differed.','Two repetitions are exploratory, not statistical proof.','Parent orchestration, initial development, and reviewer token use are not included in worker totals; this is not end-to-end organizational token accounting.','Failed command counts include intentional red tests.','Cached and reasoning tokens are subsets, not added twice.']}
(out/'results.json').write_text(json.dumps(report,indent=2))
print(json.dumps(pairs,indent=2))
print('Variant totals:',{v:sum(r['total_tokens_including_retries_and_learning'] or 0 for r in rows if r['variant']==v) for v in ['baseline','compact']})
