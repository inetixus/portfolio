const mode=document.body.dataset.accountPage;
const form=document.querySelector('[data-account-form]');
const status=document.querySelector('.form-status');
const say=text=>{status.textContent=text;status.hidden=false;status.focus({preventScroll:true});};
const packageNames=new Set(['Basic GUI — 200 Robux','Advanced GUI — 300 Robux','Basic script system — 450 Robux']);
const selected=new URLSearchParams(location.search).get('package');
if(packageNames.has(selected)){
 const note=document.querySelector('.selected-package');note.textContent=`Your starting point: ${selected}`;note.hidden=false;
 for(const a of document.querySelectorAll('.account-switch a'))a.search=new URLSearchParams({package:selected}).toString();
}
for(const button of document.querySelectorAll('[data-password]'))button.addEventListener('click',()=>{
 const field=document.getElementById(button.dataset.password),visible=field.type==='password';
 field.type=visible?'text':'password';field.toggleAttribute('data-password-visible',visible);button.textContent=visible?'Hide':'Show';button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',`${visible?'Hide':'Show'} ${button.dataset.password.replaceAll('-',' ')}`);
});
const confirm=document.getElementById('confirm-password');
if(confirm){const check=()=>confirm.setCustomValidity(confirm.value!==document.getElementById('password').value?'Your passwords need to match.':'');confirm.addEventListener('input',check);document.getElementById('password').addEventListener('input',check);}
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const message=mode==='forgot-password'?'Password reset is a preview. No reset email has been sent.':mode==='signup'?'Your signup page is ready. No account has been created; authentication will be connected next.':'Your login page is ready. Authentication will be connected next.';
 for(const input of form.querySelectorAll('input[autocomplete="current-password"],input[autocomplete="new-password"]'))input.value='';
 say(message);
});
document.querySelector('[data-google]')?.addEventListener('click',()=>say('Google sign-in is a preview. It will be available once authentication is connected.'));
const art=document.querySelector('.account-art'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0,targetX=0,targetY=0;
art.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch')return;const r=art.getBoundingClientRect();targetX=((event.clientX-r.left)/r.width-.5)*7;targetY=-((event.clientY-r.top)/r.height-.5)*5;if(frame)return;frame=requestAnimationFrame(()=>{art.style.setProperty('--art-yaw',`${targetX}deg`);art.style.setProperty('--art-pitch',`${targetY}deg`);frame=0;});});
art.addEventListener('pointerleave',()=>{art.style.setProperty('--art-yaw','0deg');art.style.setProperty('--art-pitch','0deg');});
