import * as T from './assets/three/three.module.js';
import {RoomEnvironment} from './assets/room-environment.js';
const root=document.createElement('div');root.className='edge-elevator';root.setAttribute('aria-hidden','true');document.body.append(root);
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),clamp=x=>Math.max(0,Math.min(1,x));
const state={y:76,door:1,landing:0,station:'top',targetY:76,progress:0};
let frame=0,last=0,draw=null,previousDoor=-1,previousLanding=-1,previousProgress=-1,seeded=false;
const pointer={x:0,y:0,toX:0,toY:0};let lightDirty=true;
function goal(){const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),progress=clamp(scrollY/max),h=root.offsetHeight,start=Math.min(196,innerHeight-h-24);return{progress,y:start+progress*Math.max(0,innerHeight-h-start-16),station:scrollY<14?'top':max-scrollY<14?'bottom':'travel'};}
function tick(time){frame=0;if(document.hidden)return;const dt=Math.min(.04,(time-(last||time-16))/1000);last=time;const target=goal();if(!seeded){state.y=target.y;state.door=target.station==='travel'?0:1;seeded=true;}
 state.station=target.station;state.progress=target.progress;state.targetY=target.y;
 const arrived=target.station!=='travel'&&Math.abs(state.y-target.y)<.35,wantOpen=arrived?1:0;
 if(reduced.matches){state.y=target.y;state.door=target.station==='travel'?0:1;state.landing=target.station==='bottom'?1:0;}
 else{state.door+=(wantOpen-state.door)*(1-Math.exp(-dt/(wantOpen?.28:.13)));if(state.door<.04||arrived)state.y+=(target.y-state.y)*(1-Math.exp(-dt/.28));state.landing+=((arrived&&target.station==='bottom'?1:0)-state.landing)*(1-Math.exp(-dt/.3));}
 const px=pointer.x,py=pointer.y,ease=reduced.matches?1:1-Math.exp(-dt/.12);pointer.x+=(pointer.toX-pointer.x)*ease;pointer.y+=(pointer.toY-pointer.y)*ease;lightDirty||=Math.abs(px-pointer.x)+Math.abs(py-pointer.y)>.0004;
 root.style.transform='translateY('+state.y.toFixed(3)+'px)';root.style.setProperty('--landing',state.landing.toFixed(4));root.dataset.station=state.station;root.dataset.open=state.door.toFixed(4);
 if(draw&&(lightDirty||Math.abs(previousDoor-state.door)>.0004||Math.abs(previousLanding-state.landing)>.001||Math.abs(previousProgress-state.progress)>.0001)){draw(state.door);previousDoor=state.door;previousLanding=state.landing;previousProgress=state.progress;lightDirty=false;}
 if(!reduced.matches&&(Math.abs(target.y-state.y)>.05||Math.abs(state.door-wantOpen)>.0004||Math.abs(state.landing-(arrived&&target.station==='bottom'?1:0))>.0004||Math.abs(pointer.toX-pointer.x)+Math.abs(pointer.toY-pointer.y)>.001))frame=requestAnimationFrame(tick);
}
function wake(){if(!frame&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
addEventListener('scroll',wake,{passive:true});addEventListener('resize',wake);document.addEventListener('visibilitychange',wake);reduced.addEventListener('change',wake);wake();
addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;pointer.toX=(event.clientX/innerWidth-.5)*2;pointer.toY=(.5-event.clientY/innerHeight)*2;wake();},{passive:true});
document.addEventListener('pointerleave',()=>{pointer.toX=pointer.toY=0;wake();});
async function load(name){const [index,data]=await Promise.all([fetch('/stage/'+name+'.json?v=lit-edge-1').then(r=>{if(!r.ok)throw Error('Model unavailable');return r.json();}),fetch('/stage/'+name+'.bin?v=lit-edge-1').then(r=>{if(!r.ok)throw Error('Geometry unavailable');return r.arrayBuffer();})]);return{index,data};}
async function initialize(){
 if(!document.body.classList.contains('is-ready'))await new Promise(resolve=>{const done=()=>{document.removeEventListener('pa:hero',done);resolve();};document.addEventListener('pa:hero',done,{once:true});setTimeout(done,6000);});
 const [elevator,avatar]=await Promise.all([load('native-elevator'),load('native-elevator-avatar')]),scene=new T.Scene(),cab=new T.Group(),rig=new T.Group(),textures=new Map(),doors=[];scene.add(cab,rig);
 const loader=new T.TextureLoader();
 const texture=async(path,color=false)=>{if(!path)return null;if(!textures.has(path))textures.set(path,loader.loadAsync('/stage/'+path).then(t=>{t.colorSpace=color?T.SRGBColorSpace:T.NoColorSpace;t.anisotropy=4;return t;}));return textures.get(path);};
 const material=async info=>new T.MeshPhysicalMaterial({map:await texture(info.texture,true),normalMap:await texture(info.normalMap),normalScale:new T.Vector2(.45,.45),color:new T.Color(...info.color),roughness:info.roughness??.82,metalness:info.metalness??0,clearcoat:info.clearcoat??0,clearcoatRoughness:.35,envMapIntensity:.65,emissive:new T.Color(...(info.emissive||[0,0,0])),emissiveIntensity:info.emissive?1.8:0,opacity:info.opacity,transparent:info.opacity<1,side:T.DoubleSide,alphaTest:.01});
 async function build(pack,group){await Promise.all(pack.index.meshes.map(async m=>{const g=new T.BufferGeometry();for(const key of ['position','normal','uv'])g.setAttribute(key,new T.BufferAttribute(new Float32Array(pack.data,m[key].offset,m[key].length),key==='uv'?2:3));const mesh=new T.Mesh(g,await material(m.material));mesh.name=m.name;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);if(pack===elevator&&pack.index.doors[m.name]){mesh.material.clippingPlanes=[new T.Plane(new T.Vector3(1,0,0),-91.1098),new T.Plane(new T.Vector3(-1,0,0),96.3598)];mesh.material.clipShadows=true;doors.push({mesh,...pack.index.doors[m.name]});}}));}
 await Promise.all([build(elevator,cab),build(avatar,rig)]);
 const origin=elevator.index.origin;rig.position.set(origin[0],origin[1],origin[2]+7.25);
 const box=new T.Box3().setFromObject(cab),size=box.getSize(new T.Vector3()),center=box.getCenter(new T.Vector3()),aspect=84/92,view=Math.max(size.y,size.x/aspect)*1.045;
 const camera=new T.OrthographicCamera(-view*aspect/2,view*aspect/2,view/2,-view/2,.01,150);camera.position.set(center.x,center.y,-30);camera.lookAt(center.x,center.y,center.z);camera.updateProjectionMatrix();
 const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.localClippingEnabled=true;renderer.setClearColor(0,0);renderer.setSize(336,368);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;renderer.domElement.style.width='100%';renderer.domElement.style.height='100%';root.append(renderer.domElement);
 const room=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.45;room.dispose();pmrem.dispose();
 scene.add(new T.HemisphereLight(0xc9e4ff,0x39251c,.8));
 const key=new T.DirectionalLight(0xffe1bd,2.2);key.position.set(center.x-7,center.y+9,1);key.target.position.copy(center);key.castShadow=true;key.shadow.mapSize.set(512,512);Object.assign(key.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:.1,far:70});key.shadow.bias=-.0003;key.shadow.normalBias=.025;scene.add(key,key.target);
 const cabin=new T.PointLight(0xffba7e,32,18,2);cabin.position.set(origin[0],13.6,15.2);scene.add(cabin);
 const pageLight=new T.PointLight(0xc9edff,65,35,2);scene.add(pageLight);
 const floorLight=new T.PointLight(0xffdba1,0,15,2);floorLight.position.set(origin[0],origin[1]+.3,origin[2]-1);scene.add(floorLight);
 let shadowDoor=-1;
 draw=open=>{for(const door of doors)door.mesh.position.x=door.travel*door.direction*open;pageLight.position.set(center.x+pointer.x*9,center.y+pointer.y*7,origin[2]-4);pageLight.color.set(state.station==='bottom'?0xffe0a1:0xc9edff);floorLight.intensity=state.landing*28;if(Math.abs(shadowDoor-open)>.001){renderer.shadowMap.needsUpdate=true;key.shadow.needsUpdate=true;shadowDoor=open;}renderer.render(scene,camera);};draw(state.door);root.dataset.model='native';root.dataset.shading='physical';root.dataset.source=elevator.index.sourceSha256;wake();
 if(location.hostname==='127.0.0.1')window.__edgeElevatorDebug={state,goal,renderer,scene,doors,pageLight,cabin,key,floorLight,pointer,source:elevator.index.source};
}
initialize().catch(()=>{const image=new Image();image.src='/site/edge-elevator.webp';image.alt='';root.append(image);root.dataset.model='fallback';});



