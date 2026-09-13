const fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT='/tmp/uig-token-pilot';
const runs=JSON.parse(fs.readFileSync(ROOT+'/runs.json','utf8'));
for(const run of runs){
 const out=ROOT+'/'+run.id+'.review.json';if(fs.existsSync(out))continue;
 const cwd=run.workdir, git=args=>cp.execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
 const changed=[...new Set([...git(['diff','HEAD','--name-only']).split('\n'),...git(['ls-files','--others','--exclude-standard']).split('\n')])].filter(Boolean);
 const result={id:run.id,task:run.task,checks:{},changed,limitations:[],human_acceptance:run.task==='ui'?'pending':'not-required'};
 result.checks.no_commit=git(['rev-parse','HEAD'])===run.starting_commit;
 const allowed={ui:['src/pages/uig.tsx'],validator:['scripts/validate-okf.js','scripts/validate-okf.test.js'],docs:['AGENTS.md','knowledge/context.md','knowledge/README.md']}[run.task];
 result.checks.scope=changed.every(f=>allowed.includes(f)||f.startsWith('knowledge/receipts/')||f.startsWith('knowledge/lessons/'));
 const source=fs.readFileSync(cwd+'/src/pages/uig.tsx','utf8');
 if(run.task==='ui'){
  const original=cp.execFileSync('git',['show','HEAD:src/pages/uig.tsx'],{cwd,encoding:'utf8'});
  result.checks.exact_ui_change=source===original.replace('>Download uig-skill.md<','>Download UIG skill (.md)<');
  result.checks.filename_preserved=source.includes('link.download = "uig-skill.md"');
  result.checks.built_label=fs.existsSync(cwd+'/public/uig/index.html')&&fs.readFileSync(cwd+'/public/uig/index.html','utf8').includes('Download UIG skill (.md)');
 }
 if(run.task==='docs'){
  const command='GATSBY_TELEMETRY_DISABLED=1 GATSBY_FEEDBACK_DISABLED=1 npm run build';
  result.checks.commands=allowed.every(f=>fs.readFileSync(cwd+'/'+f,'utf8').includes(command));
  result.checks.explanations=allowed.every(f=>/telemetry/i.test(fs.readFileSync(cwd+'/'+f,'utf8'))&&/feedback/i.test(fs.readFileSync(cwd+'/'+f,'utf8')));
 }
 if(run.task==='validator'){
  try{
   const {validate}=require(cwd+'/scripts/validate-okf.js');const YAML=require('/Users/ornelastechnologies/Documents/Git/violetek/gerardoiornelas-portfolio/node_modules/yaml');
   const receipt='knowledge/receipts/2020-01-01-independent-review.md',target='src/pages/uig.tsx';
   const data={title:'Independent review',type:'task-receipt',status:'verified',intent:'Validate exact duplicate paths',sources:[target],authorization:{state:'delegated',source:'Approved isolated test',scope:target,valid_until:'Task completion'},acceptance:{status:'verified',reviewer:'Pilot reviewer',evidence:['Fixture checked']},aar:{expected:'Unique valid; duplicate invalid',actual:'Independent fixtures executed',difference:'No discrepancy expected',learning:'No new lesson required'}};
   function check(sources){data.sources=sources;return validate({read:f=>f===receipt?'---\n'+YAML.stringify(data)+'---\n## After Action Review\n':fs.readFileSync(cwd+'/'+f,'utf8'),exists:f=>fs.existsSync(cwd+'/'+f),changed:[{file:target,deleted:false},{file:receipt,deleted:false}]});}
   result.checks.unique_accepted=check([target]).length===0;
   result.checks.duplicate_rejected=check([target,target]).some(e=>/duplicat/i.test(e));
  }catch(e){result.checks.fixture_execution=false;result.limitations.push(e.message);}
 }
 // Same current schema checks each produced receipt against all proposed changes, regardless of date.
 try{
  const {validate}=require(cwd+'/scripts/validate-okf.js');
  const errors=validate({read:f=>fs.readFileSync(cwd+'/'+f,'utf8'),exists:f=>fs.existsSync(cwd+'/'+f),changed:changed.map(file=>({file,deleted:!fs.existsSync(cwd+'/'+file)}))});
  result.checks.receipt_coverage=errors.length===0;result.receipt_errors=errors;
 }catch(e){result.checks.receipt_coverage=false;result.receipt_errors=[e.message];}
 const logs=[];
 for(const line of fs.readFileSync(ROOT+'/'+run.id+'.jsonl','utf8').split('\n')){try{const e=JSON.parse(line);if(e.type==='item.completed')logs.push(e.item);}catch{}}
 // Do not parse or reveal usage until review files are frozen.
 const commands=logs.filter(i=>i.type==='command_execution');
 const normalized=JSON.parse(cp.execFileSync('python3',[ROOT+'/normalize-shell.py'],{input:JSON.stringify(commands.map(i=>i.command||'')),encoding:'utf8'}));
 commands.forEach((i,n)=>i.shell=normalized[n]);
 result.checks.graph_attempted=commands.some(i=>/graphify\s+\.\s+--update/.test(i.shell||''));
 result.checks.tests_observed=run.task!=='validator'||commands.some(i=>/okf:test|node --test/.test(i.shell||'')&&i.exit_code===0);
 result.checks.build_observed=run.task!=='ui'||commands.some(i=>/npm run build/.test(i.shell||'')&&i.exit_code===0);
 result.agent_final=logs.filter(i=>i.type==='agent_message').slice(-1)[0]?.text||'';
 result.command_review=commands.map(i=>({command:i.command,exit_code:i.exit_code}));
 result.automated_acceptance=Object.values(result.checks).every(Boolean)?'pass':'fail';
 result.limitations.push('Graph semantic backend unavailable; full operational acceptance not established.');
 fs.writeFileSync(out,JSON.stringify(result,null,2));console.log(run.id+': '+result.automated_acceptance+'; failed checks: '+Object.entries(result.checks).filter(([k,v])=>!v).map(([k])=>k).join(', '));
}
