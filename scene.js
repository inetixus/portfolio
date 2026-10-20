import * as THREE from 'three';

// Everything in this scene is rendered in code. The only textures are the
// user's original screenshots. The Roblox avatar is the official thumbnail.
export function createScene(canvas,state,projects){
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  renderer.setClearColor(0x050505,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(36,innerWidth/innerHeight,.1,100);
  camera.position.z=11;
  const geometry=new THREE.BoxGeometry(2.4,2.4,2.4);
  const heroTones=[.66,.48,1,.35,.94,.59];
  const heroMaterials=heroTones.map(tone=>new THREE.MeshBasicMaterial({color:new THREE.Color().setScalar(tone)}));
  const cube=new THREE.Mesh(geometry,heroMaterials);
  const group=new THREE.Group();group.add(cube);scene.add(group);
  const edgeMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.7});
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geometry),edgeMat);cube.add(edges);

  // A radial field of halftone particles, matching the monochrome opening.
  const haloGeo=new THREE.PlaneGeometry(8,8);
  const haloMat=new THREE.ShaderMaterial({
    transparent:true,depthWrite:false,depthTest:false,
    uniforms:{uTime:{value:0},uOpacity:{value:1}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec2 vUv;uniform float uTime;uniform float uOpacity;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){vec2 p=vUv-.5;float r=length(p);float halo=exp(-r*r*23.);vec2 grid=fract(vUv*160.)-.5;float n=hash(floor(vUv*160.));float dotSize=halo*.35;float dot=1.-smoothstep(dotSize,dotSize+.09,length(grid));float ring=exp(-pow((r-.21)*28.,2.))*.07;float a=(dot*halo*.14+ring+halo*.012)*uOpacity;gl_FragColor=vec4(vec3(.88),a);}`,
  });
  const halo=new THREE.Mesh(haloGeo,haloMat);halo.renderOrder=-2;scene.add(halo);

  const loader=new THREE.TextureLoader();
  const textures=projects.map(project=>{
    const tex=loader.load(project.images[0].src);
    tex.colorSpace=THREE.SRGBColorSpace;
    tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
    return tex;
  });
  const videoTextures=new Map();
  projects.forEach((p,i)=>{
    if(!p.video)return;
    const v=document.createElement('video');v.src=p.video;v.muted=true;v.loop=true;v.playsInline=true;v.preload='none';
    const t=new THREE.VideoTexture(v);t.colorSpace=THREE.SRGBColorSpace;videoTextures.set(i,{video:v,texture:t});
  });
  // Six sides remain supported regardless of project count.
  const materials=Array.from({length:6},(_,i)=>new THREE.MeshBasicMaterial({map:textures[i%textures.length],color:0xd5d5d5}));
  let lastActive=-1,wasWork=false,lastVideo=-1;
  function fitTexture(texture){
    // Preserve aspect ratio by letterboxing the original screenshot onto a
    // square face. Never stretch, crop, or erase the user's watermark.
    if(!texture.image||texture.userData.fitted)return;
    const image=texture.image;
    const square=document.createElement('canvas');square.width=1024;square.height=1024;
    const context=square.getContext('2d');context.fillStyle='#141414';context.fillRect(0,0,1024,1024);
    const scale=Math.min(1024/image.width,1024/image.height);
    context.drawImage(image,(1024-image.width*scale)/2,(1024-image.height*scale)/2,image.width*scale,image.height*scale);
    texture.image=square;texture.needsUpdate=true;texture.userData.fitted=true;
  }
  function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}
  resize();addEventListener('resize',resize,{passive:true});
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
  let currentRot=0,started=performance.now(),frameId=0;
  function frame(now){
    frameId=requestAnimationFrame(frame);
    if(document.hidden||document.body.classList.contains('modal-open'))return;
    const mobile=innerWidth<=600;
    const seconds=(now-started)*.001;
    const vh=2*Math.tan(THREE.MathUtils.degToRad(18))*camera.position.z;
    const vw=vh*camera.aspect;
    const transition=smooth(.14,.95,state.introProgress);
    const workMode=state.workVisibility>.85;
    const endFade=1-smooth(.05,.9,(state.scroll-(document.querySelector('#work').offsetTop+document.querySelector('#work').offsetHeight-innerHeight))/innerHeight);
    if(endFade<.001){canvas.style.opacity='0';return;}
    canvas.style.opacity=String(endFade);
    group.visible=true;
    // The white cell travels from the avatar into the project showcase.
    const heroX=mobile?.17:.10,heroY=mobile?.02:.07;
    const workX=mobile?0:.22,workY=mobile?.19:0;
    group.position.x=lerp(heroX,workX,transition)*vw;
    group.position.y=lerp(heroY,workY,transition)*vh;
    const size=mobile?lerp(.54,.58,transition):lerp(.62,1.04,transition);
    group.scale.setScalar(size);
    if(state.reduced){group.rotation.set(.15,.42+state.active*Math.PI/2,.1);}
    else{
      const base=lerp(.6,-.55,transition)+state.active*Math.PI/2;
      currentRot=lerp(currentRot,base,.06);
      group.rotation.x=lerp(.25,-.16,transition)+Math.sin(seconds*.26)*.045+state.mouseY*.035;
      group.rotation.y=currentRot+state.mouseX*.075;
      group.rotation.z=lerp(-.21,.05,transition);
      group.position.y+=Math.sin(seconds*.7)*.045;
    }
    if(workMode!==wasWork){cube.material=workMode?materials:heroMaterials;wasWork=workMode;}
    if(workMode&&state.active!==lastActive){
      const current=videoTextures.get(state.active)?.texture||textures[state.active];
      materials.forEach(m=>{m.map=current;m.needsUpdate=true;});
      lastActive=state.active;
    }
    textures.forEach(fitTexture);
    if(lastVideo!==(workMode?state.active:-1)){
      videoTextures.forEach(({video},i)=>{if(workMode&&i===state.active){video.play().catch(()=>{});}else video.pause();});
      lastVideo=workMode?state.active:-1;
    }
    edgeMat.opacity=workMode?.26:.8;
    halo.position.copy(group.position);halo.position.z=-1.8;
    halo.scale.setScalar(workMode?1.3:1);
    haloMat.uniforms.uTime.value=seconds;
    haloMat.uniforms.uOpacity.value=workMode?.35:Math.min(1,seconds*.5);
    if(!state.reduced){const entry=smooth(0,1.6,seconds);heroMaterials.forEach((m,i)=>m.color.setScalar(heroTones[i]*lerp(.05,1,entry)));}
    renderer.render(scene,camera);
  }
  frameId=requestAnimationFrame(frame);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frameId);document.documentElement.classList.add('no-gl');canvas.style.display='none';});
  return {dispose(){cancelAnimationFrame(frameId);renderer.dispose();textures.forEach(t=>t.dispose());videoTextures.forEach(({video,texture})=>{video.pause();texture.dispose();});}};
}
