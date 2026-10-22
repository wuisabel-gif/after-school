// Generates the prerecorded voice lines with macOS voices: node scripts/make-voices.mjs
// Text comes from dist/story.js and dist/i18n.js, so subtitles and audio always match.
import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,rmSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {story,lines} from '../dist/story.js';
import {ja} from '../dist/i18n.js';

const voices={en:{narrator:'Samantha',nana:'Sandy (English (US))',hachi:'Flo (English (US))'},ja:{narrator:'Kyoko',nana:'Sandy (Japanese (Japan))',hachi:'Flo (Japanese (Japan))'}};
const jobs=[];
story.forEach(([,,intro,outro],i)=>{jobs.push([`ch${i+1}-intro`,'narrator',intro],[`ch${i+1}-outro`,'narrator',outro]);});
for(const [key,text] of Object.entries(lines))jobs.push([key,key.split('-')[0],text]);

for(const lang of ['en','ja']){
  const dir=fileURLToPath(new URL(`../dist/voice/${lang}/`,import.meta.url));mkdirSync(dir,{recursive:true});
  for(const [key,who,en] of jobs){
    const text=lang==='ja'?ja[en]:en;if(!text)throw new Error(`Missing Japanese for ${key}`);
    const out=`${dir}${key}.m4a`,tmp=`${dir}${key}.aiff`;if(existsSync(out))continue; // delete a file to regenerate it
    execFileSync('say',['-v',voices[lang][who],'-o',tmp,text]);
    execFileSync('afconvert',['-f','m4af','-d','aac','-b','48000',tmp,out]);rmSync(tmp);
    console.log(lang,key);
  }
}
