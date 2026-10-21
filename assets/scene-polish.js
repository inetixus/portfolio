import {P as InstancedBufferGeometry,O as Float32BufferAttribute,N as InstancedBufferAttribute,lt as ShaderMaterial,W as Mesh,ht as TextureLoader,xt as Vector3} from './main-B69lUpv3.js?v=native-edge-1';

export function softBox(w,h,d,BoxGeometry){
 const radius=Math.min(.075,Math.min(w,h,d)*.055),g=new BoxGeometry(w,h,d,4,4,4),p=g.attributes.position,n=g.attributes.normal;
 for(let i=0;i<p.count;i++){
  const v=[p.getX(i),p.getY(i),p.getZ(i)],half=[w/2,h/2,d/2],core=v.map((a,j)=>Math.max(-half[j]+radius,Math.min(half[j]-radius,a))),delta=v.map((a,j)=>a-core[j]),len=Math.hypot(...delta)||1;
  p.setXYZ(i,...core.map((a,j)=>a+delta[j]/len*radius));n.setXYZ(i,...delta.map(a=>a/len));
 }
 return g;
}

// Original Vault Explorer's Crown: two locked, velocity-perpendicular emitters.
// 20 particles/sec, 2 sec lifetime, .12 studs/sec, .7 studs, original Roblox texture.
export async function attachCrownEffect(stage,{reducedMotion=false}={}){
 const crown=stage.refs.avatar.find(p=>p.GetFullName().includes('Crown')&&p.IsA('BasePart'));
 if(!crown)return;
 const texture=await new TextureLoader().loadAsync('/stage/tex/crown-tech-horns.png');
 const g=new InstancedBufferGeometry();g.setAttribute('position',new Float32BufferAttribute([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3));g.setAttribute('uv',new Float32BufferAttribute([0,0,1,0,1,1,0,1],2));g.setIndex([0,1,2,0,2,3]);
 const seeds=[],sides=[];for(let side of [-1,1])for(let i=0;i<40;i++){seeds.push(i/40);sides.push(side);}
 g.setAttribute('phase',new InstancedBufferAttribute(new Float32Array(seeds),1));g.setAttribute('side',new InstancedBufferAttribute(new Float32Array(sides),1));g.instanceCount=80;
 const uniforms={clock:{value:0},map:{value:texture}};
 const material=new ShaderMaterial({uniforms,transparent:true,depthWrite:false,depthTest:true,side:2,blending:2,toneMapped:false,
  vertexShader:`attribute float phase;attribute float side;uniform float clock;varying vec2 vUv;varying float age;
   void main(){age=fract(phase+clock*.5);vUv=uv;
    vec3 p=vec3(side*1.036,-.168,0.0)+vec3(position.x*.7,position.y*.7,-side*age*.24);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
  fragmentShader:`uniform sampler2D map;varying vec2 vUv;varying float age;
   void main(){vec4 tex=texture2D(map,vUv);float alpha=(1.0-smoothstep(.907,1.0,age))*smoothstep(0.0,.147,age)*.21;
    vec3 color=age<.228?mix(vec3(1),vec3(0,.835,1),age/.228):age<.515?mix(vec3(0,.835,1),vec3(0,.267,1),(age-.228)/.287):mix(vec3(0,.267,1),vec3(.012,.686,1),(age-.515)/.485);
    gl_FragColor=vec4(tex.rgb*color,tex.a*alpha);}`});
 const mesh=new Mesh(g,material);mesh.name='Vault Explorer Crown holographic horns';mesh.frustumCulled=false;mesh.renderOrder=5;
 const cf=crown.CFrame,rot=cf._r;mesh.matrixAutoUpdate=false;mesh.matrix.set(rot[0],rot[1],rot[2],cf.X,rot[3],rot[4],rot[5],cf.Y,rot[6],rot[7],rot[8],cf.Z,0,0,0,1);
 stage.world.add(mesh);const unsubscribe=stage.onUpdate((time)=>{uniforms.clock.value=reducedMotion?.75:time;});stage.invalidate();
 return {mesh,dispose(){unsubscribe();stage.world.remove(mesh);g.dispose();material.dispose();texture.dispose();}};
}

// A restrained recreation of the Hunt's vault/fragment visual language.
// These rings and shards are code geometry, not extracted event game assets.
export function attachHuntEffects(stage,{reducedMotion=false}={}){
 const geometry=new InstancedBufferGeometry();
 geometry.setAttribute('position',new Float32BufferAttribute([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3));
 geometry.setAttribute('uv',new Float32BufferAttribute([0,0,1,0,1,1,0,1],2));geometry.setIndex([0,1,2,0,2,3]);
 geometry.setAttribute('seed',new InstancedBufferAttribute(new Float32Array(Array.from({length:25},(_,i)=>i)),1));geometry.instanceCount=25;
 const uniforms={clock:{value:0},centre:{value:new Vector3()}};
 const material=new ShaderMaterial({uniforms,transparent:true,depthWrite:false,depthTest:true,side:2,blending:2,toneMapped:false,
  vertexShader:`attribute float seed;uniform float clock;uniform vec3 centre;varying vec2 vUv;varying float vKind;varying float vSeed;
   void main(){vUv=uv;vKind=step(.5,seed);vSeed=seed;
    vec3 right=vec3(viewMatrix[0][0],viewMatrix[1][0],viewMatrix[2][0]);
    vec3 up=vec3(viewMatrix[0][1],viewMatrix[1][1],viewMatrix[2][1]);
    vec3 p=centre;vec2 xy=position.xy*1.7;
    if(seed>.5){float angle=seed*2.39996+clock*.13;float radius=.57+.23*fract(seed*.618);float size=.022+.027*fract(seed*.37);
      xy=vec2(cos(angle),sin(angle))*radius+position.xy*size*vec2(1.,2.8);}
    p+=right*xy.x+up*xy.y;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.0);}`,
  fragmentShader:`uniform float clock;varying vec2 vUv;varying float vKind;varying float vSeed;
   void main(){vec2 p=vUv*2.-1.;float alpha;
    if(vKind<.5){float r=length(p),a=atan(p.y,p.x);float width=max(fwidth(r)*1.3,.002);
      float outer=1.-smoothstep(.002,.002+width,abs(r-.82));
      float inner=1.-smoothstep(.001,.001+width,abs(r-.70));
      float arcs=smoothstep(.12,.2,sin(a*3.+clock*.2));
      float ticks=step(.95,cos(a*48.))*smoothstep(.85,.86,r)*(1.-smoothstep(.90,.91,r));
      alpha=outer*.20*arcs+inner*.10*(1.-arcs)+ticks*.12;
    }else{float diamond=abs(p.x)+abs(p.y)*.55;float edge=1.-smoothstep(.42,.48,diamond);alpha=edge*(.18+.10*sin(vSeed+clock*.5));}
    if(alpha<.002)discard;vec3 color=mix(vec3(.10,.35,1.),vec3(.16,.90,1.),.5+.5*sin(vSeed*1.7));gl_FragColor=vec4(color,alpha);
   }`});
 const mesh=new Mesh(geometry,material);mesh.name='Hunt vault rings and fragments';mesh.frustumCulled=false;mesh.renderOrder=4;stage.world.add(mesh);
 const media=matchMedia('(prefers-reduced-motion: reduce)');let reduced=reducedMotion||media.matches;const onChange=()=>{reduced=media.matches;};media.addEventListener('change',onChange);
 const unsubscribe=stage.onUpdate(time=>{uniforms.clock.value=reduced?0:time;stage.cube.getPosition(uniforms.centre.value);});
 return {mesh,dispose(){unsubscribe();media.removeEventListener('change',onChange);stage.world.remove(mesh);geometry.dispose();material.dispose();}};
}
