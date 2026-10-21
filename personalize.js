const discord=document.querySelector('[data-cta="discord"]');
discord.addEventListener('click',async event=>{
  event.preventDefault();event.stopImmediatePropagation();
  const status=document.querySelector('[data-dm-status]');
  try{await navigator.clipboard.writeText('inetixus_');status.textContent='Username copied. Add inetixus_ on Discord to start a conversation.';}
  catch{status.textContent='Add inetixus_ on Discord, or email inetixus@gmail.com.';}
},{capture:true});
const sound=document.querySelector('.reel-sound');if(sound)sound.hidden=true;
const style=document.createElement('style');
style.textContent='.hero-name{width:clamp(226px,24.2vw,453px)}';
document.head.appendChild(style);

if(['localhost','127.0.0.1'].includes(location.hostname)||location.hostname.endsWith('.chatgpt.site')){const link=document.querySelector('.hud-account');if(link)link.href='/login/';}
