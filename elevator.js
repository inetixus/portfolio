import * as T from './assets/three/three.module.js';
const root=document.createElement('div');root.className='edge-elevator';root.setAttribute('aria-hidden','true');document.body.append(root);
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),clamp=x=>Math.max(0,Math.min(1,x));
const state={y:76,door:1,landing:0,station:'top',targetY:76,progress:0};
let frame=0,last=0,draw=null,previousDoor=-1,seeded=false;
function goal(){const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),progress=clamp(scrollY/max),h=root.offsetHeight,start=innerWidth<761?190:76;return{progress,y:start+progress*Math.max(0,innerHeight-h-start-16),station:scrollY<14?'top':max-scrollY<14?'bottom':'travel'};}
function tick(time){frame=0;if(document.hidden)return;const dt=Math.min(.04,(time-(last||time-16))/1000);last=time;const target=goal();if(!seeded){state.y=target.y;state.door=target.station==='travel'?0:1;seeded=true;}
 state.station=target.station;state.progress=target.progress;state.targetY=target.y;
 const arrived=target.station!=='travel'&&Math.abs(state.y-target.y)<.35,wantOpen=arrived?1:0;
 if(reduced.matches){state.y=target.y;state.door=target.station==='travel'?0:1;state.landing=target.station==='bottom'?1:0;}
 else{state.door+=(wantOpen-state.door)*(1-Math.exp(-dt/(wantOpen?.28:.13)));if(state.door<.04||arrived)state.y+=(target.y-state.y)*(1-Math.exp(-dt/.28));state.landing+=((arrived&&target.station==='bottom'?1:0)-state.landing)*(1-Math.exp(-dt/.3));}
 root.style.transform='translateY('+state.y.toFixed(3)+'px)';root.style.setProperty('--landing',state.landing.toFixed(4));root.dataset.station=state.station;root.dataset.open=state.door.toFixed(4);
 if(draw&&Math.abs(previousDoor-state.door)>.0004){draw(state.door);previousDoor=state.door;}
 if(!reduced.matches&&(Math.abs(target.y-state.y)>.05||Math.abs(state.door-wantOpen)>.0004||Math.abs(state.landing-(arrived&&target.station==='bottom'?1:0))>.0004))frame=requestAnimationFrame(tick);
}
function wake(){if(!frame&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
addEventListener('scroll',wake,{passive:true});addEventListener('resize',wake);document.addEventListener('visibilitychange',wake);reduced.addEventListener('change',wake);wake();
async function load(name){const [index,data]=await Promise.all([fetch('/stage/'+name+'.json?v=native-edge-1').then(r=>{if(!r.ok)throw Error('Model unavailable');return r.json();}),fetch('/stage/'+name+'.bin?v=native-edge-1').then(r=>{if(!r.ok)throw Error('Geometry unavailable');return r.arrayBuffer();})]);return{index,data};}
async function initialize(){
 const [elevator,avatar]=await Promise.all([load('native-elevator'),load('native-elevator-avatar')]),scene=new T.Scene(),cab=new T.Group(),rig=new T.Group(),textures=new Map(),doors=[];scene.add(cab,rig);
 const loader=new T.TextureLoader();
 const material=async info=>{let map=null;if(info.texture){if(!textures.has(info.texture))textures.set(info.texture,loader.loadAsync('/stage/'+info.texture).then(t=>{t.colorSpace=T.SRGBColorSpace;t.anisotropy=2;return t;}));map=await textures.get(info.texture);}return new T.MeshBasicMaterial({map,color:new T.Color(...info.color),opacity:info.opacity,transparent:info.opacity<1,side:T.DoubleSide,alphaTest:.01,toneMapped:false});};
 async function build(pack,group){await Promise.all(pack.index.meshes.map(async m=>{const g=new T.BufferGeometry();for(const key of ['position','normal','uv'])g.setAttribute(key,new T.BufferAttribute(new Float32Array(pack.data,m[key].offset,m[key].length),key==='uv'?2:3));const mesh=new T.Mesh(g,await material(m.material));mesh.name=m.name;group.add(mesh);if(pack===elevator&&pack.index.doors[m.name]){mesh.material.clippingPlanes=[new T.Plane(new T.Vector3(1,0,0),-91.1098),new T.Plane(new T.Vector3(-1,0,0),96.3598)];doors.push({mesh,...pack.index.doors[m.name]});}}));}
 await Promise.all([build(elevator,cab),build(avatar,rig)]);
 const origin=elevator.index.origin;rig.position.set(origin[0],origin[1],origin[2]+7.25);
 const box=new T.Box3().setFromObject(cab),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3()),aspect=84/92,view=Math.max(size.y,size.x/aspect)*1.045;
 const camera=new T.OrthographicCamera(-view*aspect/2,view*aspect/2,view/2,-view/2,.01,150);camera.position.set(center.x,center.y,-30);camera.lookAt(center.x,center.y,center.z);camera.updateProjectionMatrix();
 const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.localClippingEnabled=true;renderer.setClearColor(0,0);renderer.setSize(336,368);renderer.outputColorSpace=T.SRGBColorSpace;renderer.domElement.style.width='100%';renderer.domElement.style.height='100%';root.append(renderer.domElement);
 draw=open=>{for(const door of doors)door.mesh.position.x=door.travel*door.direction*open;renderer.render(scene,camera);};draw(state.door);root.dataset.model='native';root.dataset.source=elevator.index.sourceSha256;wake();
 if(location.hostname==='127.0.0.1')window.__edgeElevatorDebug={state,goal,renderer,scene,doors,source:elevator.index.source};
}
initialize().catch(()=>{const image=new Image();image.src='/site/edge-elevator.webp';image.alt='';root.append(image);root.dataset.model='fallback';});

