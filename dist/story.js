// Storyline: an unofficial homage to Ai Yazawa's NANA. Each chapter is an existing brief; four stars (done) unlocks the next.
export const story=[[0,'Chapter 1 · Snow on the train','Snow is falling on the bullet train to Tokyo. You are Nana Osaki: a guitar case, a leather jacket, and a band you left behind. Dress like the punk singer you are about to become.','The girl in the next seat is also twenty, also named Nana, also running toward something. She talks too much. You like her anyway.','nana'],[1,'Chapter 2 · Apartment 707','Now you are the other Nana, the one everyone calls Hachi. The flat with the bay window is perfect, and so is the stranger viewing it with you. Go soft and sweet for the landlord.','Neither of you can afford it alone. Two Nanas, one room 707, and two strawberry-patterned glasses for a toast.','hachi'],[3,'Chapter 3 · Blast plays live','Nobu has come to Tokyo, Yasu has found a basement club, and Shin is somehow the new bassist. Back to Nana Osaki: hair up, safety pin on, stand like you own the stage.','The room is half empty and it does not matter. Blast is back, and Hachi screams from the front row louder than anyone.','nana'],[4,'Chapter 4 · Hachi’s date','Hachi has a date and is far too nervous about it. Long waves, pearls, something soft. And please, a real smile.','She comes home past midnight, glowing, and tells Nana everything twice. Nana pretends to be bored and listens to every word.','hachi'],[2,'Chapter 5 · Trapnest after dark','Trapnest is in town, and Ren plays guitar for them now. Nana Osaki has not seen him in two years. A slip dress, a bold lip, black boots. Do not let him see your hands shake.','He finds her after the show as if no time has passed. Back at 707, Hachi leaves the strawberry glasses out, just in case.','nana']];
// Scenes: after each chapter's narration, Nana and Hachi talk, then the player picks a reply.
// Lines and replies are voiced (keys ch<n>-l<k> and ch<n>-c<k>); the chosen ending is added to the chapter's ending.
export const scenes=[
{lines:[['hachi','Are you going to Tokyo too? Me too! I’m Nana, by the way.'],['nana','Nana. Same as me.']],choices:[
 {label:'Tell her about the band',reply:['nana','I’m going to sing. Punk. Don’t laugh.'],ending:'Hachi doesn’t laugh. She asks for a ticket to the first show.'},
 {label:'Smile and look out at the snow',reply:['nana','Nice to meet you, Nana.'],ending:'Hachi keeps talking the whole way, and you don’t mind.'}]},
{lines:[['nana','You want this place too?'],['hachi','The window! Look at the window!']],choices:[
 {label:'Suggest sharing the flat',reply:['hachi','What if we shared it?'],ending:'Nana says yes before Hachi finishes the sentence.'},
 {label:'Offer to step back',reply:['hachi','You take it. You need it more than me.'],ending:'Nana refuses. Then we both take it, she says.'}]},
{lines:[['hachi','Nana! I’m right here in the front!'],['nana','I can see you. You’re hard to miss.']],choices:[
 {label:'Dedicate the first song to Hachi',reply:['nana','This one is for the girl in the front row.'],ending:'Hachi cries through the whole song.'},
 {label:'Play it cool',reply:['nana','Let’s start. Loud.'],ending:'Hachi screams anyway, and the whole room follows her.'}]},
{lines:[['hachi','Nana, does this look okay? Be honest.'],['nana','You look good. Stop shaking.']],choices:[
 {label:'Ask Nana to wait up',reply:['hachi','Will you wait up for me?'],ending:'Nana waits up, and pretends she was only reading.'},
 {label:'Promise to be home early',reply:['hachi','I’ll be back before midnight, promise!'],ending:'She isn’t. Nana leaves the light on.'}]},
{lines:[['hachi','Are you really going to see him?'],['nana','I’m going to see the show. That’s all.']],choices:[
 {label:'Admit you’re nervous',reply:['nana','My hands are shaking, Hachi.'],ending:'Hachi holds them until they stop.'},
 {label:'Say you’re fine',reply:['nana','I’m fine. Lend me your lipstick.'],ending:'Hachi lends it, and doesn’t believe her for a second.'}]}];
// Signature looks: complete outfits unlocked by finishing a story chapter (by brief index).
export const signatures=[
{name:'Nana’s stage look',note:'Blast, front and center',who:'nana',unlock:3,look:{outfit:0,lip:4,blush:20,liner:2,hair:0,shoes:0,accessory:5,hairstyle:2,earrings:1,bracelet:1,pose:1,expression:0}},
{name:'Hachi’s city date',note:'Soft, sweet and a little nervous',who:'hachi',unlock:4,look:{outfit:2,lip:1,blush:50,liner:1,hair:1,shoes:0,accessory:2,hairstyle:1,earrings:2,bracelet:2,pose:0,expression:3}},
{name:'Midnight at 707',note:'Strawberry glasses, just in case',who:'nana',unlock:2,look:{outfit:5,lip:3,blush:30,liner:2,hair:2,shoes:0,accessory:3,hairstyle:1,earrings:1,bracelet:-1,pose:2,expression:1}}];
// Short character lines, voiced in English and Japanese (see scripts/make-voices.mjs).
export const lines={'nana-hello':'Let’s go. The stage is waiting.','hachi-hello':'Ta-da! Do I look cute?','nana-win':'Not bad. Not bad at all.','hachi-win':'Yay! Four stars!'};
