const accountHref=path=>new URL(path,['localhost','127.0.0.1'].includes(location.hostname)||location.hostname.endsWith('.chatgpt.site')?location.origin:'https://dashboard.inetixus.it').href;
const panel=document.querySelector('.chart-foot');
panel.id='pricing';panel.classList.add('pricing-panel');
document.querySelector('.chart-track').setAttribute('aria-labelledby','pricing-title');
document.querySelector('.chart-track').setAttribute('role','region');
const packages=[
 {name:'Basic GUI',price:200,tag:'INTERFACE DESIGN',description:'A focused interface that fits the look of your game.',items:['One complete, game-matching GUI','Responsive scaling setup','Basic transitions and visual polish']},
 {name:'Advanced GUI',price:300,tag:'GUI + SCRIPTING',description:'Connected screens, with the feature logic behind them.',items:['A custom flow with multiple pages','Game-matching visual styling','Shop, stats, or inventory feature scripting']},
 {name:'Basic script system',price:450,tag:'GUI + GAMEPLAY',description:'The interface and a basic gameplay system, built together.',items:['GUI and core gameplay logic','Clean, structured modules','Performance and UX improvements']},
];
panel.insertAdjacentHTML('beforeend',`
 <div class="pricing-heading"><p class="pricing-eyebrow">SERVICES & PAYMENT</p><h2 id="pricing-title">A clear scope.<br><span>A clear price.</span></h2><p>Small projects welcome. Choose the closest starting point, then tell me what your game needs.</p></div>
 <div class="package-grid">${packages.map((p,i)=>`<article class="package-card"><div class="package-top"><span class="package-index">0${i+1}</span><span>${p.tag}</span></div><h3>${p.name}</h3><p class="package-description">${p.description}</p><p class="package-price"><strong>${p.price}</strong><span>Robux</span></p><p class="package-scope">Included in this package</p><ul>${p.items.map(item=>`<li><span aria-hidden="true">↳</span>${item}</li>`).join('')}</ul><a class="package-cta" href="#contact" data-package="${p.name} — ${p.price} Robux">Discuss this package <span aria-hidden="true">↗</span></a></article>`).join('')}</div>
 <div class="payment-details"><div><h3>How you can pay</h3><ul class="payment-methods" aria-label="Accepted payment arrangements"><li>Robux</li><li>Money payments</li><li>Agreed game revenue share</li></ul><p>We’ll agree the scope and payment arrangement in DMs. Larger or more complex work is quoted separately.</p></div><div class="revision-note"><span aria-hidden="true">↺</span><div><h3>Room to get it right.</h3><p>GUI revisions and adjustments are included for 14 days after delivery.</p></div></div></div>
 <div class="project-process"><div><span>01 / BRIEF</span><h3>Show me the idea.</h3><p>Send the game, screens or features, references, budget, and any deadline.</p></div><div><span>02 / SCOPE</span><h3>Agree what’s included.</h3><p>We’ll discuss the requirements, price, and payment method before the work starts.</p></div><div><span>03 / BUILD</span><h3>Build, review, refine.</h3><p>Clear updates and feedback keep the interface and feature aligned with your game.</p></div></div>
 <div class="pricing-questions"><h3>A few useful details.</h3><div><details><summary>Which package should I choose?<span aria-hidden="true">+</span></summary><p>Basic GUI covers the interface itself. Advanced GUI adds a multi-page flow and feature scripting. A basic script system combines the GUI with gameplay logic. If your idea spans several systems, send a brief so we can define a custom scope.</p></details><details><summary>Can I bring an existing interface?<span aria-hidden="true">+</span></summary><p>Send the current interface, references, and a list of what needs changing. I’ll review the requirements with you so we can agree on the right scope.</p></details><details><summary>What if I need changes?<span aria-hidden="true">+</span></summary><p>GUI revisions and adjustments are included within 14 days of delivery. If you want additional screens or a new feature, we can discuss that as a separate scope.</p></details></div></div>
 <div class="pricing-footer"><p>Have something different in mind?</p><a href="mailto:inetixus@gmail.com">Tell me about your project <span aria-hidden="true">↗</span></a></div>
`);
panel.insertAdjacentHTML('beforeend',`<section class="prepare-entry" aria-labelledby="prepare-title"><div><p class="pricing-eyebrow">YOUR NEXT PROJECT</p><h3 id="prepare-title">Let’s get prepared.</h3><p>Have an idea in mind? Take the first step toward your next build.</p></div><div class="prepare-actions"><a class="prepare-login" href="${accountHref('/login/')}">Log in <span aria-hidden="true">↗</span></a><a href="${accountHref('/signup/')}">Create an account <span aria-hidden="true">↗</span></a></div></section>`);
for(const link of panel.querySelectorAll('[data-package]'))link.addEventListener('click',()=>{
 const contact=document.querySelector('#contact');contact.dataset.package=link.dataset.package;
 const quote=contact.querySelector('[data-dm-text]');quote.textContent=`Hi Inetixus, I’d like to discuss the ${link.dataset.package} package for my Roblox game.`;
 let selection=contact.querySelector('.package-selection');
 if(!selection){selection=document.createElement('p');selection.className='package-selection';contact.querySelector('.contact-in').insertBefore(selection,contact.querySelector('.dm'));}
 selection.replaceChildren(document.createTextNode(link.dataset.package+' '));
 const change=document.createElement('a');change.href='#pricing';change.textContent='Change package ↗';selection.append(change);
});

for(const details of panel.querySelectorAll('.pricing-questions details')){
 const summary=details.querySelector('summary');let animation=null,wantsOpen=details.open;
 summary.setAttribute('aria-expanded',String(wantsOpen));
 summary.addEventListener('click',event=>{
  event.preventDefault();wantsOpen=!wantsOpen;
  const from=details.getBoundingClientRect().height;
  animation?.cancel();animation=null;
  summary.setAttribute('aria-expanded',String(wantsOpen));
  details.dataset.expanded=String(wantsOpen);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){details.open=wantsOpen;details.style.height='';details.style.overflow='';return;}
  details.open=true;details.style.height='auto';
  const to=wantsOpen?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+1;
  details.style.overflow='hidden';
  animation=details.animate({height:[`${from}px`,`${to}px`]}, {duration:320,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
  animation.onfinish=()=>{details.open=wantsOpen;animation.cancel();animation=null;details.style.height='';details.style.overflow='';};
 });
}
