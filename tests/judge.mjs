// node tests/judge.mjs
import assert from 'node:assert/strict';
import {judge} from '../dist/judge.js';
import {ja} from '../dist/i18n.js';
import {readFileSync} from 'node:fs';
const base={outfit:0,lip:4,blush:35,liner:2,hair:0,shoes:0,accessory:0,hairstyle:0,earrings:-1,bracelet:-1,pose:0,expression:0};
const has=(r,t)=>r.notes.some(n=>n.text.startsWith(t));
let r=judge(base);assert.ok(has(r,'Pure punk'));assert.equal(r.score,85);
r=judge({...base,outfit:6,lip:1,liner:0,accessory:2,earrings:2,expression:3});assert.ok(has(r,'Soft romance'));
r=judge({...base,accessory:4,earrings:0});assert.ok(has(r,'Gold and silver'));
r=judge({...base,accessory:-1});assert.ok(has(r,'Add one piece'));
r=judge({...base,outfit:1,lip:1,liner:1,accessory:-1,blush:0});assert.ok(r.score>=40&&r.score<=100);
for(let i=0;i<500;i++){const s={...base,outfit:i%9,lip:i%5,blush:(i*7)%101,liner:i%3,hair:i%4,shoes:i%3,accessory:i%7-1,earrings:i%4-1,bracelet:(i>>2)%4-1,pose:i%3,expression:i%4};const j=judge(s);assert.ok(j.score>=40&&j.score<=100&&j.notes.length>0);}
for(const [,text] of readFileSync(new URL('../dist/judge.js',import.meta.url),'utf8').matchAll(/add\('([^']+)'/g))assert.ok(ja[text],`missing Japanese: ${text}`);
assert.ok(ja['Style judge: {0}/100']);
console.log('judge ok');
