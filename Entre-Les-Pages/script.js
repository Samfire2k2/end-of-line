const chapters = [
  {
    code:'CAP. I', label:'LA CHUTE', title:'Entre les pages',
    text:[
      `Le recueil est tombé de l’étagère un mardi de novembre, alors que je rangeais la librairie de ma grand-mère. Il s’est ouvert tout seul, comme on ouvre les bras. Entre deux pages, une feuille de <mark data-note="sauge">sauge</mark> séchée, grise et fragile, avait gardé la forme exacte de sa main.`,
      `Elle en glissait partout. Dans les romans, dans les carnets, dans les poches de ses tabliers. « Pour que les livres respirent », disait-elle. Je croyais à une manie. Je comprends aujourd’hui qu’elle posait des repères, des petites balises végétales pour retrouver son chemin dans sa propre vie.`
    ],
    object:'<div class="object-leaf"><b></b><i></i><i></i><i></i><i></i><i></i></div><div class="object-caption">A / 01<br>SAUGE</div>'
  },
  {
    code:'CAP. II', label:'LE PARFUM', title:'Une porte murée',
    text:[
      `J’ai approché la feuille de mon visage. Le parfum était intact, poivré, un peu amer, et il a fait ce que seules les odeurs savent faire : il a ouvert une porte que je croyais murée. J’ai revu la cuisine aux carreaux jaunes, le thé qui fumait, sa voix qui lisait à haute voix pendant que la pluie battait les vitres.`,
      `Les <mark data-note="souvenirs">souvenirs</mark> ne sont pas arrivés en file ordonnée. Ils sont montés d’un bloc, comme une marée, et je me suis assis par terre au milieu des cartons.`
    ],
    object:'<div class="memory-window"><i></i><i></i><b></b><span></span></div><div class="memory-smoke">∿<br>∿</div>'
  },
  {
    code:'CAP. III', label:'LA VISITE', title:'Une vieille cliente',
    text:[
      `Alors la <mark data-note="mélancolie">mélancolie</mark> est entrée. Je l’ai reconnue sans peine, c’est une vieille cliente. Elle ne frappe jamais, elle s’installe au fond de la boutique et feuillette les rayons sans rien acheter.`,
      `Longtemps, j’ai voulu la mettre dehors. Ce soir-là, j’ai compris qu’elle n’était pas la contraire de la joie, seulement sa mémoire : ce qui reste de la lumière quand le soleil est passé de l’autre côté de la maison.`
    ],
    object:'<div class="shop-stack"><i></i><i></i><i></i><i></i><i></i></div><div class="object-caption">M / 03<br>MÉMOIRE</div>'
  },
  {
    code:'CAP. IV', label:'LA TRACE', title:'Ce qui reste',
    text:[
      `Sur la page, face à la feuille, un vers que grand-mère avait souligné au crayon, d’une main tremblante. Je n’ai pas osé le recopier ici. Il disait en substance que ce qui a été aimé ne disparaît pas, et qu’il change simplement de saison.`,
      `C’est cela, sans doute, la <mark data-note="poésie">poésie</mark> : un endroit où l’on peut déposer ce qui ne tient nulle part ailleurs.`
    ],
    object:'<div class="poem-void"><i></i><i></i><i></i><b></b></div><div class="object-caption">P / 04<br>SAISON</div>'
  },
  {
    code:'CAP. V', label:'LE GESTE', title:'Ne pas vendre',
    text:[
      `J’ai refermé le livre avec précaution, en remettant la sauge à sa place. Puis j’ai posé le recueil en vitrine, sous la lampe, avec une petite étiquette de ma main.`,
      `<em>Ne pas vendre. À lire un jour de pluie.</em>`
    ],
    object:'<div class="display-book"><b></b><span>NE PAS VENDRE<br>À LIRE UN JOUR DE PLUIE</span></div><div class="object-caption">FIN / 05<br>EXPOSITION</div>'
  },
];

const notes={
  sauge:'Une plante fragile. Une odeur verte. Une main devenue trace.',
  souvenirs:'Ils ne viennent pas en file ordonnée. Ils montent d’un bloc.',
  mélancolie:'Elle n’est pas le contraire de la joie. Elle en garde la mémoire.',
  poésie:'Ce qui ne tient nulle part ailleurs trouve ici sa place.'
};

let current=0;
let rain=false;
const archive=document.getElementById('archive');
const landing=document.getElementById('landing');
const story=document.getElementById('story');
const nav=document.getElementById('chapterNav');
const text=document.getElementById('chapterText');

chapters.forEach((chapter,index)=>{
  const button=document.createElement('button');
  button.innerHTML=`<span>${String(index+1).padStart(2,'0')}</span><b>${chapter.label}</b>`;
  button.addEventListener('click',()=>showChapter(index));
  nav.appendChild(button);
});

function showChapter(index){
  current=index;
  const chapter=chapters[index];
  document.getElementById('chapterCode').textContent=chapter.code;
  document.getElementById('chapterLabel').textContent=chapter.label;
  document.getElementById('foldNumber').textContent=String(index+1).padStart(2,'0');
  document.getElementById('chapterTitle').textContent=chapter.title;
  text.innerHTML=chapter.text.map(paragraph=>`<p>${paragraph}</p>`).join('');
  document.getElementById('stageObject').innerHTML=chapter.object;
  document.getElementById('progressBar').style.height=`${((index+1)/chapters.length)*100}%`;
  document.getElementById('readout').textContent=`${index + 1} / ${chapters.length}`;
  [...nav.children].forEach((button,i)=>button.classList.toggle('active',i===index));
  document.getElementById('previous').disabled=index===0;
  document.getElementById('next').disabled=index===chapters.length-1;
  const fold=document.getElementById('fold');
  fold.classList.remove('turn'); void fold.offsetWidth; fold.classList.add('turn');
  document.getElementById('annotation').hidden=true;
}

document.getElementById('enter').addEventListener('click',()=>{
  landing.classList.add('exit');
  setTimeout(()=>{
    landing.hidden=true; story.hidden=false; showChapter(0);
  },650);
});
document.getElementById('identity').addEventListener('click',()=>{
  story.hidden=true; landing.hidden=false; landing.classList.remove('exit');
});
document.getElementById('previous').addEventListener('click',()=>showChapter(Math.max(0,current-1)));
document.getElementById('next').addEventListener('click',()=>showChapter(Math.min(chapters.length-1,current+1)));

document.addEventListener('keydown',event=>{
  if(story.hidden)return;
  if(event.key==='ArrowRight')showChapter(Math.min(chapters.length-1,current+1));
  if(event.key==='ArrowLeft')showChapter(Math.max(0,current-1));
  if(event.key==='Escape')document.getElementById('annotation').hidden=true;
});

text.addEventListener('click',event=>{
  const mark=event.target.closest('mark[data-note]');
  if(!mark)return;
  document.getElementById('annotationText').textContent=notes[mark.dataset.note];
  document.getElementById('annotation').hidden=false;
});
document.getElementById('closeAnnotation').addEventListener('click',()=>document.getElementById('annotation').hidden=true);

document.getElementById('environment').addEventListener('click',()=>{
  rain=!rain;
  archive.classList.toggle('rain',rain);
  document.getElementById('environment').setAttribute('aria-pressed',String(rain));
  document.getElementById('environment').querySelector('span').textContent=rain?'01':'00';
});

function updateClock(){
  const now=new Date();
  document.getElementById('clock').textContent=[now.getHours(),now.getMinutes(),now.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
}
updateClock(); setInterval(updateClock,1000);

window.addEventListener('mousemove',event=>{
  document.documentElement.style.setProperty('--mx',`${event.clientX}px`);
  document.documentElement.style.setProperty('--my',`${event.clientY}px`);
});

// Animated paper field: fine particulate traces follow the pointer.
const canvas=document.getElementById('field');
const ctx=canvas.getContext('2d');
let particles=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio; canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=`${innerWidth}px`; canvas.style.height=`${innerHeight}px`;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
function createParticle(x,y){
  particles.push({x,y,vx:(Math.random()-.5)*.35,vy:Math.random()*-.35-.08,a:Math.random()*1,life:Math.random()*50+60});
}
window.addEventListener('resize',resize); resize();
window.addEventListener('mousemove',event=>{
  if(Math.random()<.22)createParticle(event.clientX,event.clientY);
});
function render(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles=particles.filter(p=>p.life>0);
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.life--;p.a*=.985;
    ctx.fillStyle=`rgba(210,218,183,${p.a*.32})`;
    ctx.fillRect(p.x,p.y,1.2,1.2);
  });
  requestAnimationFrame(render);
}
render();
