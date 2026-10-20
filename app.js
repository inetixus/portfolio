import { projects, profile, reviews } from './content.js';

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const work = $('#work');
const intro = $('.intro');

$('.work-list').innerHTML = projects.map((p,i)=>`<article class="piece${i===0?' is-active':''}" id="${escapeHTML(p.id)}" ${i?'inert':''} aria-labelledby="title-${i}">
  <p class="piece-tag mono"><span>${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(p.discipline)}</span></p>
  <h3 id="title-${i}">${escapeHTML(p.headline)}</h3>
  <p class="piece-description">${escapeHTML(p.description)}</p>
  <div class="piece-controls"><button class="preview-button" data-project="${i}"><span aria-hidden="true">⤢</span>${p.video||p.youtube?'Watch the full clip':'Explore the project'}</button></div>
  <details class="tech"><summary>Project details</summary><dl>${p.details.map(([title,body])=>`<dt>${escapeHTML(title)}</dt><dd>${escapeHTML(body)}</dd>`).join('')}</dl></details>
  <img class="piece-poster" src="${escapeHTML(p.images[0].src)}" alt="${escapeHTML(p.images[0].alt)}" loading="lazy">
</article>`).join('');
$('.work-rail').innerHTML = projects.map((p,i)=>`<button type="button" data-go="${i}" aria-label="View ${escapeHTML(p.label)}" aria-current="${i===0}"></button>`).join('');
$('.review-list').innerHTML = reviews.map(r=>`<article class="review reveal"><p class="review-rating"><span class="stars" aria-label="Player rating">★★★★★</span><span class="mono">${escapeHTML(r.score)}</span></p><blockquote>“${escapeHTML(r.quote)}”</blockquote><cite>${escapeHTML(r.handle)}</cite></article>`).join('');
$('#year').textContent = new Date().getFullYear();

const articles = $$('.piece');
const rails = $$('.work-rail button');
let activeIndex=-1;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const smooth=(a,b,x)=>{let t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const state={scroll:0,workProgress:0,active:0,introProgress:0,heroProgress:0,workVisibility:0,mouseX:0,mouseY:0,reduced:reduceMotion};
let workTop=0,workTravel=1,introTop=0,windowHeight=innerHeight;

function measure(){
  windowHeight=innerHeight;
  workTop=work.offsetTop;
  workTravel=Math.max(1,work.offsetHeight-windowHeight);
  introTop=intro.offsetTop;
  update();
}
function setActive(i){
  if(i===activeIndex)return;
  articles.forEach((a,j)=>{
    a.classList.toggle('is-active',j===i);
    a.inert=j!==i;
    if(j!==i) $('details',a).open=false;
  });
  rails.forEach((r,j)=>r.setAttribute('aria-current',String(j===i)));
  $('.hud-count').textContent=`${String(i+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  $('.active-label').textContent=projects[i].label;
  $('.callout span').textContent=projects[i].notes[0];
  $('.cube-hit').setAttribute('aria-label',`Open ${projects[i].label} project gallery`);
  activeIndex=i;
}
function update(){
  const y=scrollY;
  state.scroll=y;
  state.heroProgress=clamp(y/(windowHeight*.9));
  state.introProgress=clamp((y-windowHeight*.25)/Math.max(1,workTop-windowHeight*.25));
  state.workProgress=clamp((y-workTop)/workTravel);
  state.active=Math.min(projects.length-1,Math.floor(state.workProgress*projects.length));
  state.workVisibility=smooth(workTop-windowHeight*.7,workTop-windowHeight*.05,y)*(1-smooth(workTop+workTravel,workTop+workTravel+windowHeight*.6,y));
  const heroOpacity=1-smooth(0,windowHeight*.65,y);
  document.documentElement.style.setProperty('--hero-opacity',heroOpacity.toFixed(3));
  document.documentElement.style.setProperty('--hero-push',state.heroProgress.toFixed(3));
  document.documentElement.style.setProperty('--intro-opacity',(smooth(introTop-windowHeight*.25,introTop+windowHeight*.1,y)*(1-smooth(workTop-windowHeight*.6,workTop-windowHeight*.05,y))).toFixed(3));
  document.documentElement.classList.toggle('past-hero',y>windowHeight*.3);
  document.documentElement.classList.toggle('in-work',y>=workTop-windowHeight*.15&&y<=workTop+workTravel+windowHeight*.2);
  setActive(state.active);
  // A real project screenshot also carries the showcase if WebGL is unavailable.
  const fallback=$('.fallback-cube');
  if(document.documentElement.classList.contains('no-gl')){
    fallback.style.opacity=y>workTop+workTravel+windowHeight*.5?'0':'1';
    if(y>=workTop-windowHeight*.2){fallback.style.background=`center / cover url("${projects[state.active].images[0].src}")`;fallback.style.left=innerWidth<=600?'calc(50% - 85px)':'65%';fallback.style.top='25%';fallback.style.width='170px';fallback.style.height='170px';}
  }
}
let scheduled=false;
addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update();});},{passive:true});
addEventListener('resize',measure,{passive:true});
addEventListener('pointermove',e=>{
  if(e.pointerType==='touch')return;
  state.mouseX=(e.clientX/innerWidth-.5)*2;
  state.mouseY=(e.clientY/innerHeight-.5)*2;
  if(!reduceMotion&&scrollY<windowHeight){
    $('.avatar-stage').style.setProperty('--ax',`${state.mouseX*-8}px`);
    $('.avatar-stage').style.setProperty('--ay',`${state.mouseY*-5}px`);
  }
},{passive:true});
document.addEventListener('pointerleave',()=>{state.mouseX=0;state.mouseY=0;});
rails.forEach((b,i)=>b.addEventListener('click',()=>scrollTo({top:workTop+workTravel*((i+.15)/projects.length),behavior:reduceMotion?'instant':'smooth'})));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.12});
$$('.reveal').forEach(e=>observer.observe(e));

const gallery=$('.gallery');
let galleryProject=0,galleryIndex=0,opener=null;
function showMedia(){
  const project=projects[galleryProject];
  const hasVideo=!!(project.video||project.youtube);
  const count=project.images.length+(hasVideo?1:0);
  const isVideo=hasVideo&&galleryIndex===0;
  const media=$('.gallery-media');
  media.replaceChildren();
  if(isVideo&&project.video){
    const video=document.createElement('video');video.controls=true;video.playsInline=true;video.src=project.video;video.poster=project.images[0].src;media.append(video);
  }else if(isVideo&&project.youtube){
    const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.youtube)}`;frame.title=`${project.label} project recording`;frame.allow='fullscreen; picture-in-picture';frame.allowFullscreen=true;media.append(frame);
  }else{
    const item=project.images[galleryIndex-(hasVideo?1:0)];
    const image=new Image();image.src=item.src;image.alt=item.alt;media.append(image);
  }
  $('#gallery-title').textContent=project.label;
  $('.gallery-description').textContent=isVideo?project.description:project.images[galleryIndex-(hasVideo?1:0)].alt;
  $('.gallery-count').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
  $('.gallery-prev').disabled=count===1;
  $('.gallery-next').disabled=count===1;
}
function openGallery(i,source){
  galleryProject=i;galleryIndex=0;opener=source||document.activeElement;
  showMedia();gallery.showModal();document.body.classList.add('modal-open');$('.gallery-close').focus();
}
function closeGallery(){gallery.close();}
gallery.addEventListener('close',()=>{document.body.classList.remove('modal-open');$('.gallery-media').replaceChildren();opener?.focus({preventScroll:true});});
function moveMedia(dir){const p=projects[galleryProject];const count=p.images.length+Number(!!(p.video||p.youtube));galleryIndex=(galleryIndex+dir+count)%count;showMedia();}
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>openGallery(Number(b.dataset.project),b)));
$('.cube-hit').addEventListener('click',e=>openGallery(state.active,e.currentTarget));
$('.gallery-close').addEventListener('click',closeGallery);
$('.gallery-prev').addEventListener('click',()=>moveMedia(-1));
$('.gallery-next').addEventListener('click',()=>moveMedia(1));
gallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();moveMedia(-1);}if(e.key==='ArrowRight'){e.preventDefault();moveMedia(1);}});
$('.discord-cta').addEventListener('click',async()=>{
  const status=$('.copy-status');
  try{await navigator.clipboard.writeText(profile.discord);status.textContent='Username copied. Add inetixus_ on Discord to start a conversation.';}
  catch{status.textContent='Add inetixus_ on Discord, or email inetixus@gmail.com.';}
});
measure();
document.fonts.ready.then(measure);
import('./scene.js').then(({createScene})=>createScene($('#stage'),state,projects)).catch(error=>{
  console.warn('Interactive scene unavailable; using the static fallback.',error);
  document.documentElement.classList.add('no-gl');update();
});
