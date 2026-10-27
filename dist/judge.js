// A rule-based style judge: reads the whole look and returns a score out of 100 and short notes.
// Notes are English keys translated by i18n.js. Pure function, tested by tests/judge.mjs.
const PUNK_OUTFITS=[0,3,4,5],SOFT_OUTFITS=[1,2,6,7,8];
export function judge(s){
  const notes=[];let score=70;
  const add=(text,delta)=>{notes.push({text,good:delta>=0});score+=delta;};
  const punk=[PUNK_OUTFITS.includes(s.outfit),s.liner===2,s.lip>=3,[0,1,5].includes(s.accessory),s.bracelet===1,s.pose===1].filter(Boolean).length;
  const soft=[SOFT_OUTFITS.includes(s.outfit),s.liner<2,s.lip<2,[2,3].includes(s.accessory),s.earrings===2||s.bracelet===2,s.expression===3].filter(Boolean).length;
  if(punk>=4&&soft<=1)add('Pure punk. Every piece agrees.',15);
  else if(soft>=4&&punk<=1)add('Soft romance, head to toe.',15);
  else if(punk>=2&&soft>=2)add('A punk and romantic mix, very Nana and Hachi.',10);
  const metals=[s.accessory===4?'gold':[0,1,5].includes(s.accessory)?'silver':null,s.earrings===0?'silver':null,s.bracelet===0?'silver':null].filter(Boolean);
  if(metals.includes('gold')&&metals.includes('silver'))add('Gold and silver together. Pick one metal, or make the mix look deliberate.',-10);
  if(s.lip>=3&&s.blush>60)add('A bold lip and strong blush compete. Soften one of them.',-10);
  if(s.lip<2&&s.blush===0)add('A little blush would bring the natural lip to life.',-5);
  const jewelry=[s.accessory>=0,s.earrings>=0,s.bracelet>=0].filter(Boolean).length;
  if(jewelry===0)add('Add one piece of jewelry to finish the look.',-10);
  if(jewelry===3)add('Necklace, earrings and bracelet: perfect for a night out.',5);
  if(s.outfit<6&&s.shoes===2&&PUNK_OUTFITS.includes(s.outfit))add('Ivory boots lighten the dark outfit nicely.',5);
  if(s.hair===2&&s.outfit===6)add('Cherry hair and pink lace: sweet overload, in a good way.',5);
  if(s.liner===2&&s.expression===2)add('Closed eyes show off the winged liner.',5);
  if(!notes.length)add('Clean and easy. Try one bold detail to make it yours.',0);
  return {score:Math.max(40,Math.min(100,score)),notes};
}
