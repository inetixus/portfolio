import * as T from './assets/three/three.module.js';
const root=document.createElement('div');root.className='lift-scene';root.setAttribute('aria-hidden','true');
root.innerHTML=`<div class="lift-cables"></div><div class="lift-floor-light"></div><div class="lift-floor-line"></div><div class="lift-shaft"><div class="lift-back"></div><div class="lift-wall-rail"></div><div class="lift-carpet"></div><div class="lift-lamp"></div><div class="lift-avatar"></div><div class="lift-warmth"></div><div class="lift-doors"><div class="lift-door lift-door-left"><i class="lift-door-window"></i></div><div class="lift-door lift-door-right"><i class="lift-door-window"></i></div></div></div><div class="lift-jamb"></div><div class="lift-pillar lift-pillar-left"></div><div class="lift-pillar lift-pillar-right"></div><div class="lift-crown"></div><div class="lift-indicator"><span class="lift-direction">↓</span><span class="lift-floor-number">00</span></div><div class="lift-call"><i></i><i></i></div><div class="lift-threshold"></div>`;
document.body.append(root);
const slot=document.createElement('div');slot.className='lift-arrival-slot';slot.setAttribute('aria-hidden','true');document.querySelector('.contact .foot').before(slot);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,v)=>{const x=clamp((v-a)/(b-a));return x*x*(3-2*x);};
const mix=(a,b,t)=>a+(b-a)*t;
let width=innerWidth,height=innerHeight,max=0,slotY=0,frame=0,last=0,ready=false;
const state={x:0,y:0,scale:1,velocity:0,door:1,floor:0,station:'top',arrived:false,travel:0};
function measure(){width=innerWidth;height=innerHeight;max=Math.max(0,document.documentElement.scrollHeight-height);const r=slot.getBoundingClientRect();slotY=scrollY+r.top+r.height/2;wake();}
function target(){
 const scroll=clamp(scrollY,0,max),mobile=width<761,depart=smooth(16,height*.85,scroll),arrival=smooth(max-height*.85,max-16,scroll);
 const topW=Math.min(mobile?width*.77:width*.34,height*(mobile?.48:.66)*420/610),endW=Math.min(mobile?width*.58:width*.28,height*.63*420/610),smallW=mobile?60:108;
 const x=mix(mix(mobile?width*.5:width*.33,width-smallW*.65-10,depart),mobile?width*.5:width*.75,arrival);
 const middleY=scroll+height*.48,topY=height*.43,endY=mobile?slotY:max+height*.47;
 const y=mix(mix(topY,middleY,depart),endY,arrival),scale=mix(mix(topW,smallW,depart),endW,arrival)/420;
 const station=scroll<18?'top':max-scroll<18?'bottom':'travel';
 return{x,y,scale,station,travel:depart*(1-arrival),progress:max?scroll/max:0};
}
function paint(){root.style.transform=`translate3d(${state.x-210}px,${state.y-305}px,0) scale(${state.scale})`;root.style.setProperty('--door',state.door.toFixed(5));root.style.setProperty('--floor',state.floor.toFixed(5));root.style.setProperty('--travel',state.travel.toFixed(5));root.dataset.station=state.station;root.dataset.arrived=String(state.arrived);}
function tick(now){
 frame=0;if(document.hidden)return;
 const dt=Math.min((now-(last||now-16))/1000,.032);last=now;const goal=target();
 if(!ready){Object.assign(state,{x:goal.x,y:goal.y,scale:goal.scale,door:goal.station==='travel'?0:1});ready=true;}
 state.station=goal.station;
 const moving=Math.abs(goal.y-state.y)>1.5||Math.abs(goal.x-state.x)>1.5||Math.abs(goal.scale-state.scale)>.006||Math.abs(state.velocity)>4;
 state.arrived=goal.station!=='travel'&&!moving;
 const doorTarget=state.arrived?1:0;
 if(reduced.matches){state.x=goal.x;state.y=goal.y;state.scale=goal.scale;state.velocity=0;state.arrived=goal.station!=='travel';state.door=state.arrived?1:0;state.floor=goal.station==='bottom'?1:0;state.travel=goal.travel;}
 else{
  state.door=mix(state.door,doorTarget,1-Math.exp(-dt/(doorTarget?.32:.16)));
  // The cab waits for the doors, then follows a critically damped suspension.
  if(state.door<.035||state.arrived){
   const omega=5;state.velocity+=(omega*omega*(goal.y-state.y)-2*omega*state.velocity)*dt;state.y+=state.velocity*dt;
   const ease=1-Math.exp(-dt/.24);state.x=mix(state.x,goal.x,ease);state.scale=mix(state.scale,goal.scale,ease);
  }
  state.floor=mix(state.floor,state.arrived&&goal.station==='bottom'?1:0,1-Math.exp(-dt/.4));state.travel=mix(state.travel,goal.travel,1-Math.exp(-dt/.3));
 }
 const number=goal.station==='top'?'00':goal.station==='bottom'?'01':'--';root.querySelector('.lift-floor-number').textContent=number;
 root.querySelector('.lift-direction').textContent=state.velocity< -5?'↑':'↓';
 // Keep the project renderer, but remove the old portrait and contact monolith.
 const start=smooth(height*.5,height*1.2,scrollY),contact=document.querySelector('#contact'),contactTop=contact.offsetTop;
 document.documentElement.style.setProperty('--lift-stage',String(start*(1-smooth(contactTop-height*.6,contactTop,scrollY))));
 paint();
 const unsettled=Math.abs(goal.y-state.y)>.35||Math.abs(state.velocity)>.35||Math.abs(goal.x-state.x)>.2||Math.abs(goal.scale-state.scale)>.0005||Math.abs(state.door-(state.arrived?1:0))>.001||Math.abs(state.floor-(state.arrived&&goal.station==='bottom'?1:0))>.001||Math.abs(state.travel-goal.travel)>.001;
 if(unsettled&&!reduced.matches)frame=requestAnimationFrame(tick);
}
function wake(){if(!frame&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
addEventListener('scroll',wake,{passive:true});addEventListener('resize',measure);reduced.addEventListener('change',wake);document.addEventListener('visibilitychange',wake);new ResizeObserver(measure).observe(document.querySelector('main'));measure();
if(location.hostname==='127.0.0.1')window.__elevatorDebug={state,target,root};

async function renderAvatar(){
 const [pack,binary]=await Promise.all([fetch('/stage/avatar.json?v=elevator-1').then(r=>{if(!r.ok)throw Error('Avatar index missing');return r.json();}),fetch('/stage/avatar.bin?v=elevator-1').then(r=>{if(!r.ok)throw Error('Avatar mesh missing');return r.arrayBuffer();})]);
 const scene=new T.Scene(),group=new T.Group(),loader=new T.TextureLoader(),textures=new Map();scene.add(group);
 const load=async path=>{if(!textures.has(path))textures.set(path,loader.loadAsync('/stage/'+path).then(texture=>{texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;return texture;}));return textures.get(path);};
 await Promise.all(pack.meshes.map(async m=>{
  const g=new T.BufferGeometry();for(const key of ['position','normal','uv'])g.setAttribute(key,new T.BufferAttribute(new Float32Array(binary,m[key].offset,m[key].length),key==='uv'?2:3));g.setIndex(new T.BufferAttribute(new Uint32Array(binary,m.index.offset,m.index.length),1));
  const texture=m.texture?await load(m.texture):null,material=new T.MeshBasicMaterial({map:texture,color:new T.Color().setRGB(...(m.color||[1,1,1]),T.SRGBColorSpace),side:T.FrontSide,toneMapped:false});
  const mesh=new T.Mesh(g,material);mesh.name=m.name;group.add(mesh);
 }));
 const box=new T.Box3().setFromObject(group),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3()),aspect=640/960,view=Math.max(size.y*1.06,size.x/aspect*1.06);
 const camera=new T.OrthographicCamera(-view*aspect/2,view*aspect/2,view/2,-view/2,.01,100);camera.position.set(center.x,center.y,-25);camera.lookAt(center.x,center.y,center.z);camera.updateProjectionMatrix();
 const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(640,960);renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.render(scene,camera);
 // Rasterize the orthographic view once. The travelling elevator uses no live 3D loop.
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=960;canvas.getContext('2d').drawImage(renderer.domElement,0,0);canvas.dataset.standingAvatar='true';root.querySelector('.lift-avatar').append(canvas);
 renderer.dispose();renderer.forceContextLoss();for(const mesh of group.children){mesh.geometry.dispose();mesh.material.dispose();}for(const value of textures.values())(await value).dispose();
 root.dataset.avatar='ready';
}
renderAvatar().catch(()=>{const image=new Image();image.className='lift-avatar-fallback';image.alt='';image.src='/site/standing-avatar.webp?v=elevator-1';root.querySelector('.lift-avatar').append(image);root.dataset.avatar='fallback';});
