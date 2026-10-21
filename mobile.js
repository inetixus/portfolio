const accountHref=path=>new URL(path,['localhost','127.0.0.1'].includes(location.hostname)||location.hostname.endsWith('.chatgpt.site')?location.origin:'https://dashboard.inetixus.it').href;
const header=document.querySelector('.hud');
const button=document.createElement('button');button.className='mobile-menu-toggle';button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','mobile-navigation');button.innerHTML='Menu <span aria-hidden="true">+</span>';header.append(button);
const nav=document.createElement('nav');nav.id='mobile-navigation';nav.className='mobile-nav';nav.setAttribute('aria-label','Mobile navigation');nav.hidden=true;nav.innerHTML=`<a href="#work">Selected work <span aria-hidden="true">↗</span></a><a href="#pricing">Services & pricing <span aria-hidden="true">↗</span></a><a href="#contact">Start a conversation <span aria-hidden="true">↗</span></a><a href="${accountHref('/login/')}">Log in / Sign up <span aria-hidden="true">↗</span> </a>`;header.after(nav);
function close(restore=false){button.setAttribute('aria-expanded','false');nav.hidden=true;if(restore)button.focus({preventScroll:true});}
button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';nav.hidden=!open;button.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){e.preventDefault();close(true);}});
document.addEventListener('pointerdown',e=>{if(!nav.hidden&&!nav.contains(e.target)&&!button.contains(e.target))close();});
nav.addEventListener('focusout',()=>{queueMicrotask(()=>{if(!nav.contains(document.activeElement)&&document.activeElement!==button)close();});});
matchMedia('(max-width:760px)').addEventListener('change',()=>close());
