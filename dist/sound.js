// Sound effects and background music synthesized with Web Audio, so there are no audio files to load.
let ac,bus,music=null,muted=false;
const ctx=()=>{if(!ac){ac=new AudioContext();bus=ac.createGain();bus.gain.value=.9;bus.connect(ac.destination);}if(ac.state==='suspended')ac.resume();return ac;};
const hz=n=>440*2**((n-69)/12);
function note(midi,at,dur,{type='sine',gain=.06,dest=bus}={}){const c=ctx(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=hz(midi);g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(gain,at+.015);g.gain.exponentialRampToValueAtTime(.0001,at+dur);o.connect(g).connect(dest);o.start(at);o.stop(at+dur+.05);}
const cues={tap:[[88,0,.12]],star:[[84,0,.25],[91,.07,.35]],save:[[79,0,.2],[86,.1,.4]],complete:[[72,0,.3],[76,.1,.3],[79,.2,.3],[84,.3,.7]]};
export function sfx(kind){if(muted||!cues[kind])return;const t=ctx().currentTime;for(const [m,d,len] of cues[kind])note(m,t+d,len,{type:'triangle',gain:kind==='tap'?.03:.05});}
// Music: a slow four-chord pad with a music-box line, scheduled one bar ahead.
const chords=[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,65]],melody=[76,72,74,71];
function bar(i,at){for(const m of chords[i%4])note(m,at,4.2,{gain:.018,dest:music.out});for(let k=0;k<4;k++)if((i+k)%3!==2)note(melody[(i+k)%4]+12,at+k,1.4,{type:'triangle',gain:.012,dest:music.out});}
export function setMusic(on){if(on&&!music&&!muted){const c=ctx(),out=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;out.connect(lp).connect(bus);music={out,i:0,next:c.currentTime+.1};const tick=()=>{while(music&&music.next<ctx().currentTime+4){bar(music.i++,music.next);music.next+=4;}};tick();music.timer=setInterval(tick,1000);}else if(!on&&music){clearInterval(music.timer);const {out}=music;out.gain.setTargetAtTime(0,ac.currentTime,.3);setTimeout(()=>out.disconnect(),1500);music=null;}}
export function setMuted(m){muted=m;if(m)setMusic(false);}
