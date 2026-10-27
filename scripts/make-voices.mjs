// Voice lines for the game, in English and Japanese.
//   node scripts/make-voices.mjs                 generate missing lines with macOS voices
//   node scripts/make-voices.mjs --export        write scripts/voice-lines.csv for a voice service (ElevenLabs etc.)
//   node scripts/make-voices.mjs --import DIR    convert DIR/<lang>-<key>.(mp3|wav|m4a|aiff) into dist/voice/<lang>/<key>.m4a
// Text comes from dist/story.js and dist/i18n.js, so subtitles and audio always match.
import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,readdirSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {story,lines,scenes} from '../dist/story.js';
import {ja} from '../dist/i18n.js';

const voices={en:{narrator:'Samantha',nana:'Sandy (English (US))',hachi:'Flo (English (US))'},ja:{narrator:'Kyoko',nana:'Sandy (Japanese (Japan))',hachi:'Flo (Japanese (Japan))'}};
const jobs=[];
story.forEach(([,,intro,outro],i)=>{jobs.push([`ch${i+1}-intro`,'narrator',intro],[`ch${i+1}-outro`,'narrator',outro]);});
for(const [key,text] of Object.entries(lines))jobs.push([key,key.split('-')[0],text]);
scenes.forEach((sc,i)=>{sc.lines.forEach(([who,text],k)=>jobs.push([`ch${i+1}-l${k+1}`,who,text]));sc.choices.forEach((c,k)=>jobs.push([`ch${i+1}-c${k+1}`,c.reply[0],c.reply[1]]));});
const textFor=(lang,en)=>{const text=lang==='ja'?ja[en]:en;if(!text)throw new Error(`Missing Japanese for: ${en}`);return text;};
const voiceDir=lang=>fileURLToPath(new URL(`../dist/voice/${lang}/`,import.meta.url));
const [mode,arg]=process.argv.slice(2);

if(mode==='--export'){
  const cell=v=>`"${String(v).replaceAll('"','""')}"`;
  const rows=[['file','language','speaker','text']];
  for(const lang of ['en','ja'])for(const [key,who,en] of jobs)rows.push([`${lang}-${key}.mp3`,lang,who,textFor(lang,en)]);
  const out=fileURLToPath(new URL('./voice-lines.csv',import.meta.url));
  writeFileSync(out,'﻿'+rows.map(r=>r.map(cell).join(',')).join('\n')+'\n');
  console.log(`${rows.length-1} lines written to ${out}`);
}else if(mode==='--import'){
  if(!arg)throw new Error('Usage: --import <folder with en-ch1-intro.mp3 ...>');
  const known=new Set(jobs.map(([key])=>key));let n=0;
  for(const file of readdirSync(arg)){
    const m=file.match(/^(en|ja)-(.+)\.(mp3|wav|m4a|aiff)$/i);
    if(!m||!known.has(m[2])){console.warn(`skipped ${file}`);continue;}
    mkdirSync(voiceDir(m[1]),{recursive:true});
    execFileSync('afconvert',['-f','m4af','-d','aac','-b','64000',join(arg,file),`${voiceDir(m[1])}${m[2]}.m4a`]);n++;
  }
  console.log(`${n} lines imported`);
}else{
  for(const lang of ['en','ja']){
    const dir=voiceDir(lang);mkdirSync(dir,{recursive:true});
    for(const [key,who,en] of jobs){
      const out=`${dir}${key}.m4a`,tmp=`${dir}${key}.aiff`;if(existsSync(out))continue; // delete a file to regenerate it
      execFileSync('say',['-v',voices[lang][who],'-o',tmp,textFor(lang,en)]);
      execFileSync('afconvert',['-f','m4af','-d','aac','-b','48000',tmp,out]);rmSync(tmp);
      console.log(lang,key);
    }
  }
}
