import json,subprocess
from pathlib import Path
out=Path('/tmp/uig-token-comparison-v2')
results_path=out/'independent-tests.json'
results=json.loads(results_path.read_text()) if results_path.exists() else []
for r in json.loads((out/'runs.json').read_text()):
 if r['task']!='validator' or any(x['id']==r['id'] for x in results):continue
 p=subprocess.run(['npm','run','okf:test'],cwd=r['workdir'],text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
 (out/(r['id']+'.independent-tests.log')).write_text(p.stdout)
 results.append({'id':r['id'],'exit_code':p.returncode,'command':'npm run okf:test'})
 results_path.write_text(json.dumps(results,indent=2))
 print(r['id'],p.returncode)
