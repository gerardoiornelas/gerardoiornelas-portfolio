import sys,json,shlex,re
results=[]
for cmd in json.load(sys.stdin):
 try:
  words=shlex.split(cmd);shell=words[2] if len(words)>=3 and words[1]=='-lc' else cmd
 except ValueError:shell=cmd
 lines=[];end=None
 for line in shell.splitlines():
  if end:
   if line.strip()==end:end=None
   continue
  match=re.search(r"<<-?\s*['\"]?([A-Za-z_][A-Za-z0-9_]*)['\"]?",line)
  if match:end=match.group(1)
  lines.append(line)
 results.append('\n'.join(lines))
json.dump(results,sys.stdout)
