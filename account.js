import {createClient} from './assets/supabase-client.js?v=cube-edges-1';
import {supabaseUrl,supabasePublishableKey} from './auth-config.js?v=cube-edges-1';
const mode=document.body.dataset.accountPage;
const form=document.querySelector('[data-account-form]');
const status=document.querySelector('.form-status');
const say=(text,error=false)=>{status.textContent=text;status.hidden=false;status.dataset.error=String(error);status.focus({preventScroll:true});};
const client=createClient(supabaseUrl,supabasePublishableKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
const packages=new Set(['Basic GUI — 200 Robux','Advanced GUI — 300 Robux','Basic script system — 450 Robux']);
const selected=new URLSearchParams(location.search).get('package')||sessionStorage.getItem('inetixus-package');
if(packages.has(selected)){
 sessionStorage.setItem('inetixus-package',selected);
 const note=document.querySelector('.selected-package');note.textContent=`Your starting point: ${selected}`;note.hidden=false;
 for(const a of document.querySelectorAll('.account-switch a'))a.search=new URLSearchParams({package:selected}).toString();
}
const destination=path=>new URL(path,location.origin).href;
let busy=false;
const lock=value=>{busy=value;for(const b of document.querySelectorAll('button'))b.disabled=value;form?.setAttribute('aria-busy',String(value));};
const friendly=error=>{
 const code=error?.code;
 if(code==='invalid_credentials')return 'That email and password don’t match. Try again or reset your password.';
 if(code==='email_not_confirmed')return 'Please confirm your email first using the link in your inbox.';
 if(code==='over_email_send_rate_limit'||code==='over_request_rate_limit')return 'Too many attempts. Please wait a moment before trying again.';
 if(code==='weak_password')return 'Choose a stronger password, using at least 8 characters.';
 if(code==='same_password')return 'Choose a password different from your current one.';
 if(error?.name==='AuthRetryableFetchError'||error instanceof TypeError)return 'We couldn’t reach sign-in. Check your connection and try again.';
 return 'We couldn’t complete that request. Please try again. If it continues, contact Inetixus.';
};
for(const button of document.querySelectorAll('[data-password]'))button.addEventListener('click',()=>{
 const field=document.getElementById(button.dataset.password),visible=field.type==='password';
 field.type=visible?'text':'password';field.toggleAttribute('data-password-visible',visible);button.textContent=visible?'Hide':'Show';button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',`${visible?'Hide':'Show'} ${button.dataset.password.replaceAll('-',' ')}`);
});
const confirm=document.getElementById('confirm-password');
if(confirm){const check=()=>confirm.setCustomValidity(confirm.value!==document.getElementById('password').value?'Your passwords need to match.':'');confirm.addEventListener('input',check);document.getElementById('password').addEventListener('input',check);}
const clearPasswords=()=>{for(const input of form?.querySelectorAll('input[type="password"],input[data-password-visible]')||[]){input.value='';input.dispatchEvent(new Event('input'));}};
let resetReady=false;
form?.addEventListener('submit',async event=>{
 event.preventDefault();if(busy||!form.reportValidity())return;
 if(mode==='reset-password'&&!resetReady){say('Open a valid reset link from your email first.',true);return;}
 lock(true);say(mode==='forgot-password'?'Sending your reset link…':mode==='signup'?'Creating your account…':mode==='reset-password'?'Updating your password…':'Signing you in…');
 try{
  const email=document.getElementById('email')?.value.trim(),password=document.getElementById('password')?.value;
  if(mode==='login'){
   const {error}=await client.auth.signInWithPassword({email,password});if(error)throw error;clearPasswords();location.replace('/account/');
  }else if(mode==='signup'){
   const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:document.getElementById('name').value.trim()},emailRedirectTo:destination('/auth/callback/')}});if(error)throw error;
   clearPasswords();if(data.session)location.replace('/account/');else say('Check your inbox for a confirmation link. Once confirmed, you can log in.');
  }else if(mode==='forgot-password'){
   const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:destination('/reset-password/')});if(error)throw error;
   say('If an account uses that email, a reset link will arrive in your inbox. Open it in this browser.');
  }else if(mode==='reset-password'){
   const {error}=await client.auth.updateUser({password});if(error)throw error;clearPasswords();say('Your password is updated. You can continue to your account.');form.hidden=true;document.querySelector('[data-reset-complete]').hidden=false;
  }
 }catch(error){say(friendly(error),true);}finally{lock(false);}
});
document.querySelector('[data-google]')?.addEventListener('click',async()=>{
 if(busy)return;lock(true);say('Taking you to Google…');
 try{const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:destination('/auth/callback/')}});if(error)throw error;}catch(error){say(friendly(error),true);lock(false);}
});
document.querySelector('[data-signout]')?.addEventListener('click',async()=>{
 if(busy)return;lock(true);try{const {error}=await client.auth.signOut({scope:'local'});if(error)throw error;sessionStorage.removeItem('inetixus-package');}catch(error){say(friendly(error),true);lock(false);}
});
async function initialize(){
 const params=new URLSearchParams(location.search),hash=new URLSearchParams(location.hash.slice(1));
 const failed=params.has('error')||hash.has('error');
 if(['callback','account','reset-password'].includes(mode))lock(true);
 try{
  const {data,error}=await client.auth.getSession();
  if(failed||error){history.replaceState(null,'',location.pathname);throw error||new Error('link_failed');}
  if(mode==='callback'){
   if(!data.session){say('This sign-in link has expired or was already used. Please log in again.',true);return;}
   location.replace('/account/');
  }else if(mode==='account'){
   if(!data.session){location.replace('/login/');return;}
   const {data:userData,error:userError}=await client.auth.getUser();if(userError)throw userError;
   document.querySelector('[data-account-email]').textContent=userData.user.email||'';
   const name=userData.user.user_metadata?.full_name?.trim().split(/\s+/)[0];
   document.querySelector('[data-account-welcome]').textContent=name?`You’re ready, ${name}.`:'You’re ready.';
   document.querySelector('[data-member]').hidden=false;say('You’re signed in. Let’s talk about your next project.');
  }else if(mode==='reset-password'){
   resetReady=!!data.session;
   if(!resetReady){form.hidden=true;say('This reset link is missing or has expired. Request a new link to continue.',true);}
   else say('Choose your new password below.');
  }else if(data.session&&['login','signup'].includes(mode))location.replace('/account/');
 }catch(error){
  if(mode==='reset-password'){form.hidden=true;resetReady=false;}
  if(mode==='callback'||mode==='reset-password')say('This link could not be verified. Request a new link or log in again.',true);
  else say(friendly(error),true);
 }finally{lock(false);}
}
client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT'&&mode==='account')location.replace('/login/');});
initialize();
const art=document.querySelector('.account-art'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0,targetX=0,targetY=0;
art?.addEventListener('pointermove',event=>{if(reduced.matches||event.pointerType==='touch')return;const r=art.getBoundingClientRect();targetX=((event.clientX-r.left)/r.width-.5)*7;targetY=-((event.clientY-r.top)/r.height-.5)*5;if(frame)return;frame=requestAnimationFrame(()=>{art.style.setProperty('--art-yaw',`${targetX}deg`);art.style.setProperty('--art-pitch',`${targetY}deg`);frame=0;});});
art?.addEventListener('pointerleave',()=>{art.style.setProperty('--art-yaw','0deg');art.style.setProperty('--art-pitch','0deg');});
