export const images = {};
const poseCenters={};
export async function loadArt(){await Promise.all(['characters','wardrobe','dressing-room','hairstyles','jewelry','romantic','pose-hip','pose-shift-punk','pose-shift-romantic','expressions'].map(name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>{images[name]=image;if(name.startsWith('pose-')){const count=name==='pose-shift-punk'?5:name==='pose-shift-romantic'?4:9,probe=document.createElement('canvas');probe.width=image.width;probe.height=image.height;const ctx=probe.getContext('2d');ctx.drawImage(image,0,0);const row=ctx.getImageData(0,50,image.width,1).data,cell=image.width/count;poseCenters[name]=Array.from({length:count},(_,i)=>{let min=Infinity,max=-Infinity;for(let x=Math.ceil(i*cell);x<Math.floor((i+1)*cell);x++)if(row[x*4+3]>60){min=Math.min(min,x);max=Math.max(max,x);}return min===Infinity?(i+.5)*cell:(min+max)/2;});}resolve()};image.onerror=()=>reject(new Error(`Could not load ${name}`));image.src=`assets/${name}.png`;})));}
const scratch=document.createElement('canvas');scratch.width=300;scratch.height=900;
const expressionLayer=document.createElement('canvas');expressionLayer.width=300;expressionLayer.height=200;
const expressionMask=document.createElement('canvas');expressionMask.width=300;expressionMask.height=200;
function removePoseIslands(c){
  const frame=c.getImageData(0,0,300,900),p=frame.data,seen=new Uint8Array(270000),queue=new Int32Array(270000);
  for(let start=0;start<270000;start++){
    if(seen[start]||p[start*4+3]<24)continue;
    let head=0,tail=1;queue[0]=start;seen[start]=1;
    while(head<tail){const n=queue[head++],x=n%300,y=(n/300)|0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
        if(!dx&&!dy)continue;const xx=x+dx,yy=y+dy;if(xx<0||xx>=300||yy<0||yy>=900)continue;
        const next=yy*300+xx;if(!seen[next]&&p[next*4+3]>=24){seen[next]=1;queue[tail++]=next;}
      }
    }
    if(tail<3000)for(let i=0;i<tail;i++)p[queue[i]*4+3]=0;
  }
  c.putImageData(frame,0,0);
}
export const lips=['#b88078','#bc797b','#a65c65','#8a413e','#621f36'];
export const hairs=['#28211e','#65372e','#864248','#b49063'];
const clamp=n=>Math.max(0,Math.min(255,n));
export function renderDoll(state){const c=scratch.getContext('2d',{willReadFrequently:true});c.clearRect(0,0,300,900);if(state.pose>0){const name=state.pose===1?'pose-hip':state.outfit<5?'pose-shift-punk':'pose-shift-romantic',index=state.pose===1?state.outfit:state.outfit<5?state.outfit:state.outfit-5,count=name==='pose-shift-punk'?5:name==='pose-shift-romantic'?4:9,atlas=images[name],cell=atlas.width/count,sourceWidth=state.pose===1?cell:name==='pose-shift-punk'?320:360,sx=poseCenters[name][index]-sourceWidth/2;c.save();if(state.pose===1){c.beginPath();const hem=state.outfit===4?900:state.outfit===7?730:state.outfit===5?610:state.outfit===6?570:state.outfit===8?530:510;c.moveTo(40,0);c.lineTo(255,0);c.lineTo(287,180);c.lineTo(284,hem);c.lineTo(224,hem+35);c.lineTo(224,900);c.lineTo(76,900);c.lineTo(76,hem+35);c.lineTo(17,hem);c.lineTo(13,180);c.closePath();c.clip();}c.drawImage(atlas,sx,25,sourceWidth,atlas.height-25,0,0,300,900);c.restore();removePoseIslands(c);}else if(state.outfit>=6){const atlas=images.romantic,centers=[325,888,1450];c.drawImage(atlas,centers[state.outfit-6]-154,0,300,887,0,0,300,900);}else{const atlas=images.characters;const sx=12+state.outfit*295.5;c.drawImage(atlas,sx,0,Math.min(295.5,atlas.width-sx),887,0,0,300,900);}
// Swap the head silhouette while preserving each outfit's collar and shoulders.
if(state.hairstyle>0||state.pose>0){
  c.clearRect(0,0,300,145);
  c.save();c.beginPath();c.moveTo(137,145);c.lineTo(177,145);c.lineTo(168,173);c.lineTo(146,173);c.closePath();c.clip();c.clearRect(130,140,55,40);c.restore();
  c.clearRect(78,145,48,13); c.clearRect(190,145,48,13);
  const head=images.hairstyles,cell=head.width/4;
  c.save(); c.beginPath(); c.rect(0,0,300,145); c.rect(0,145,137,100); c.moveTo(137,145);c.lineTo(177,145);c.lineTo(168,173);c.lineTo(146,173);c.closePath();c.rect(177,145,123,100); c.clip();
  c.drawImage(head,state.hairstyle*cell,0,cell,head.height,71,0,168,224);
  c.restore();
}
// Local masks tint only existing illustrated hair/boot pixels; preserve their ink and texture.
if(state.hair||(state.shoes&&state.outfit<6)){const frame=c.getImageData(0,0,300,900),p=frame.data;const hairTints=[[0,0,0],[30,10,2],[53,7,18],[86,58,24]],shoeTints=[[0,0,0],[58,6,15],[110,97,75]];for(let y=0;y<900;y++)for(let x=0;x<300;x++){const i=(y*300+x)*4;if(p[i+3]<30)continue;const light=(p[i]+p[i+1]+p[i+2])/3;const facialFeature=(y>83&&y<104&&x>117&&x<196)||(y>110&&y<149&&x>120&&x<193);const neutralDark=light<94&&Math.max(p[i],p[i+1],p[i+2])-Math.min(p[i],p[i+1],p[i+2])<35;const isHair=y<(state.hairstyle>0||state.pose>0?225:166)&&x>70&&x<240&&!facialFeature&&neutralDark;const isBoot=state.outfit<6&&y>(state.outfit===4?817:700)&&x>91&&x<215;const tint=isHair?hairTints[state.hair]:isBoot?shoeTints[state.shoes]:null;if(tint){const fade=isHair?Math.min(1,(100-light)/24):Math.min(1,Math.max(0,(y-(state.outfit===4?817:700))/10));const amount=(.45+light/150)*fade;for(let k=0;k<3;k++)p[i+k]=clamp(p[i+k]+tint[k]*amount);}}c.putImageData(frame,0,0);}
const faceFrame=state.expression??state.faceFrame??0;
if(faceFrame>0){
const face=images.expressions,cell=face.width/4;
const e=expressionLayer.getContext('2d');e.clearRect(0,0,300,200);
e.drawImage(face,faceFrame*cell,0,cell,face.height,71,0,168,213);
const m=expressionMask.getContext('2d');m.clearRect(0,0,300,200);
const regions=faceFrame===3?[[156,123,21]]:[[134,99,26],[181,99,26]];
for(const [x,y,r] of regions){const mask=m.createRadialGradient(x,y,r*.52,x,y,r);mask.addColorStop(0,'#000');mask.addColorStop(1,'#0000');m.fillStyle=mask;m.fillRect(x-r,y-r,r*2,r*2);}
e.globalCompositeOperation='destination-in';e.drawImage(expressionMask,0,0);e.globalCompositeOperation='source-over';c.drawImage(expressionLayer,0,0);
}
// Makeup is composited on the same portrait used in both views and export.
c.save();c.globalCompositeOperation='source-over';c.globalAlpha=.52;c.fillStyle=lips[state.lip];c.beginPath();c.moveTo(145,123);c.quadraticCurveTo(151,117,156,121);c.quadraticCurveTo(163,117,168,123);c.quadraticCurveTo(156,134,145,123);c.fill();c.globalAlpha=state.blush/165;for(const x of [131,183]){const g=c.createRadialGradient(x,109,1,x,109,17);g.addColorStop(0,'#ce6c79');g.addColorStop(1,'#ce6c7900');c.fillStyle=g;c.fillRect(x-18,94,36,31);}c.globalAlpha=.9;c.strokeStyle='#2d1c25';c.lineWidth=state.liner===2?2:state.liner===1?1.25:.2;if(state.liner&&faceFrame!==1&&faceFrame!==2){for(const [a,b] of [[124,145],[170,192]]){c.beginPath();c.moveTo(a,93);c.quadraticCurveTo((a+b)/2,87,b,92);if(state.liner===2)c.lineTo(b+4,88);c.stroke();}}c.restore();
if(state.accessory>=0&&state.accessory<3){const w=images.wardrobe;const col=state.accessory;const boxes=[[35,877,375,336],[440,905,385,276],[866,886,368,345]];const [x,y,sw,sh]=boxes[col];c.drawImage(w,x,y,sw,sh,128,162,60,col===1?27:57);}
if(state.accessory>=3){const j=images.jewelry,size=j.width/3;c.drawImage(j,(state.accessory-3)*size,0,size,size,126,159,63,65);}
if(state.earrings>=0){const j=images.jewelry,size=j.width/3;const shapes=[[60,550,130,185],[480,465,130,350],[897,515,143,245]];const [x,y,w,h]=shapes[state.earrings];const width=state.earrings===0?8:9,height=state.earrings===1?27:16;for(const dx of [115,190])c.drawImage(j,x,y,w,h,dx,112,width,height);}
if(state.bracelet>=0){const j=images.jewelry,size=j.width/3;c.save();c.translate(state.pose===1?97:state.outfit===4?41:state.outfit===5?32:39,state.pose===1?327:435);c.rotate(-.16);c.drawImage(j,state.bracelet*size,size*2,size,size,-9,-6,20,16);c.restore();}
return scratch;}
const live=document.createElement('canvas');live.width=300;live.height=900;
let liveKey='';
export function drawViews(state,frame={}){
 const selectedFace=frame.faceFrame??state.expression??0,key=JSON.stringify([state,selectedFace]);
 if(key!==liveKey){const l=live.getContext('2d');l.clearRect(0,0,300,900);l.drawImage(renderDoll({...state,expression:selectedFace}),0,0);liveKey=key;}
 const canvas=document.querySelector('#character'),c=canvas.getContext('2d');c.clearRect(0,0,600,1800);
 c.save();c.scale(2,2);c.drawImage(live,0,165,300,735,0,165,300,735);
 c.translate(155,151);c.rotate(frame.tilt||0);c.translate(-155,-151);c.drawImage(live,0,0,300,169,0,frame.headY||0,300,169);c.restore();
 const portrait=document.querySelector('#portrait'),p=portrait.getContext('2d');p.fillStyle='#d6c6b3';p.fillRect(0,0,400,440);p.save();p.translate(200,300);p.rotate((frame.tilt||0)*.6);p.translate(-200,-300);p.drawImage(live,67,8,177,210,0,(frame.headY||0)*1.5,400,475);p.restore();
}

export function drawItem(canvas,category,index,state){canvas.width=300;canvas.height=300;const c=canvas.getContext('2d');c.clearRect(0,0,300,300);if(category==='clothes'&&index>=6){const doll=renderDoll({...state,outfit:index,pose:0});c.drawImage(doll,45,145,225,565,65,5,170,285);}else if(category==='clothes'){const boxes=[[0,0,420,410],[436,0,391,405],[838,0,415,410],[0,409,424,420],[451,417,373,481],[839,409,415,490]];const [x,y,w,h]=boxes[index];c.drawImage(images.wardrobe,x,y,w,h,10,10,280,280);}else if(category==='accessories'){if(index<0){c.font='italic 32px Georgia';c.textAlign='center';c.fillStyle='#786d60';c.fillText('Just you.',150,150);}else{if(index<3){const boxes=[[35,877,375,336],[440,905,385,276],[866,886,368,345]];const [x,y,w,h]=boxes[index];c.drawImage(images.wardrobe,x,y,w,h,15,25,270,250);}else{const j=images.jewelry,size=j.width/3;c.drawImage(j,(index-3)*size,0,size,size,10,10,280,280);}}}else if(category==='earrings'||category==='bracelets'){if(index<0){c.font='italic 32px Georgia';c.textAlign='center';c.fillStyle='#786d60';c.fillText('Less is more.',150,150);}else{const j=images.jewelry,size=j.width/3;c.drawImage(j,index*size,(category==='earrings'?1:2)*size,size,size,10,10,280,280);}}else{const doll=renderDoll({...state,outfit:0,shoes:index});c.drawImage(doll,78,710,144,180,30,0,240,300);}}
export function exportLook(state){const canvas=document.createElement('canvas');canvas.width=900;canvas.height=1200;const c=canvas.getContext('2d');c.drawImage(images['dressing-room'],0,0,900,1200);c.drawImage(renderDoll(state),267,40,366,1098);c.fillStyle='#f3ecdc';c.fillRect(0,1110,900,90);c.fillStyle='#29241f';c.font='40px Georgia';c.textAlign='center';c.fillText('AFTER SCHOOL',450,1164);return canvas;}

export function drawCosmetic(canvas,state,kind,index){canvas.width=160;canvas.height=100;const c=canvas.getContext('2d');c.fillStyle='#dfc6b9';c.fillRect(0,0,160,100);const doll=renderDoll({...state,[kind==='lip'?'lip':'liner']:index});if(kind==='lip')c.drawImage(doll,135,103,44,27,0,0,160,100);else c.drawImage(doll,116,69,80,38,0,0,160,100);}

export function drawHair(canvas,state,index){canvas.width=150;canvas.height=190;const c=canvas.getContext('2d');c.fillStyle='#dfd0be';c.fillRect(0,0,150,190);c.drawImage(renderDoll({...state,hairstyle:index}),76,0,167,213,0,0,150,190);}
