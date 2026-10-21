import{$ as e,D as t,E as n,F as r,G as i,H as a,K as o,N as s,O as c,Q as l,St as u,T as d,V as f,W as p,X as m,Y as h,Z as g,_,bt as v,c as y,ct as b,dt as x,f as S,g as C,h as w,it as T,j as E,lt as D,m as O,o as k,ot as A,p as j,s as M,st as N,u as P,ut as F,v as I,wt as L,xt as R,y as z,z as B}from"./main-B69lUpv3.js?v=mobile-face-1";var V=M(.77,0,.175,1),H=M(.65,0,.35,1);function U(e,t){let n=Math.round((Date.parse(e.t1)-Date.parse(e.t0))/864e5),r=n/(t-1),i=[[0,e.seed],...e.rise,e.crest],a=e.tail,o=a.length-1,s=t=>{if(t>=e.tailFrom){let n=y(t-e.tailFrom,0,o),r=Math.floor(n),i=n-r;return a[r]*(1-i)+a[Math.min(o,r+1)]*i}for(let e=0;e<i.length-1;e++){let[n,r]=i[e],[a,o]=i[e+1];if(t<=a)return r*(o/r)**+y((t-n)/(a-n),0,1)}return e.crest[1]},c=new Float32Array(t);for(let e=0;e<t;e++){let t=Math.max(0,(e-.5)*r),i=Math.min(n,(e+.5)*r),a=s(e*r);for(let e=Math.ceil(t);e<=i;e++)a=Math.max(a,s(e));c[e]=a}return{v:c,crestX:y(Math.round(e.crest[0]/n*(t-1)),0,t-1),days:n}}var W=`
  float fade(vec3 w) {
    float back = exp(-max(0.0, -w.z) * 0.05);
    float front = 1.0 - smoothstep(1.0, 38.0, w.z);
    float side = smoothstep(-34.0, -2.0, w.x) * (1.0 - smoothstep(94.0, 126.0, w.x));
    return back * front * side;
  }
`,G=`0.0196`;function K(e,{ccu:t}){let{v:n,crestX:i}=U(t,93),a=e.tier,o=0;for(let e=0;e<93;e++)o+=Math.max(1,Math.ceil(n[e]/100));let c=new Float32Array(o*4),d=0;{let e=0;for(let t=0;t<93;t++){let r=n[t],a=Math.max(1,Math.ceil(r/100));for(let n=0;n<a;n++){let o=n<a-1?1:y((r-100*(a-1))/100,0,1);c[e++]=t,c[e++]=n,c[e++]=o,c[e++]=+(t===i)}t===i&&(d=a)}}let p=new Float32Array(93),h=new Float32Array(93),g={uE:{value:p},uH:{value:h},uTime:{value:0},uShimmer:{value:+!e.reduced},uReveal:{value:0},uFade:{value:0},uTop:{value:0},uSpill:{value:new u(0,0,0,0)},uSpillLevel:{value:0},uCalm:{value:0}},_=new O(1,1,1);_.setAttribute(`aCube`,new s(c,4));let v=new D({uniforms:g,vertexShader:`
      attribute vec4 aCube;
      uniform float uE[93];
      varying vec3 vN;
      varying vec2 vUv;
      varying vec3 vW;
      varying float vLy;
      varying float vFill;
      varying float vE;
      varying float vCrest;
      void main() {
        float e = uE[int(aCube.x + 0.5)];
        float h = mix(0.04, 0.84, e);
        vec3 w = vec3(aCube.x + position.x * 0.84,
                      aCube.y * e + h * 0.5 + position.y * h,
                      position.z * 0.84);
        vN = normal;
        vUv = uv;
        vW = w;
        vLy = position.y + 0.5;
        vFill = aCube.z;
        vE = e;
        vCrest = aCube.w;
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }
    `,fragmentShader:`
      uniform float uFade;
      uniform float uTop;
      varying vec3 vN;
      varying vec2 vUv;
      varying vec3 vW;
      varying float vLy;
      varying float vFill;
      varying float vE;
      varying float vCrest;
      void main() {
        // form without light: top brightest, front, then the side faces
        float shade = vN.y > 0.5 ? 1.0 : abs(vN.z) > 0.5 ? 0.9 : vN.y < -0.5 ? 0.45 : 0.72;
        shade = mix(shade, 1.0, 0.7 * vCrest);
        float base = mix(0.92, 1.0, vCrest);
        float lit = step(vLy, vFill + 0.001) ;
        float on = mix(0.075, base, lit);
        // a flat cell before it rises, the same dim grey as the floor row
        float c = mix(0.34, on * shade, smoothstep(0.0, 0.6, vE));
        // thin darker rim inside every face, so stacked cells read as cells
        float d = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
        float aa = fwidth(d);
        float rim = smoothstep(0.035, 0.035 + aa + 0.02, d);
        c *= mix(0.72, 1.0, rim);
        // from above, the unrisen timeline is one more row of the floor, as dim as its neighbours
        c *= mix(1.0, 0.22, uTop * (1.0 - vE));
        gl_FragColor = vec4(vec3(mix(${G}, c, uFade)), 1.0);
      }
    `}),x=new r(_,v,o);x.frustumCulled=!1;let S=a===`low`?-14:-34,C=a===`low`?106:126,w=a===`low`?-34:-60,T=a===`low`?20:40,E=2654435769,A=()=>(E^=E<<13,E^=E>>>17,E^=E<<5,(E>>>0)/4294967296),j=[];for(let e=w;e<=T;e++)for(let t=S;t<=C;t++){if(e===0&&t>=0&&t<=92)continue;let n=(18+92*A()**2.4)/255;j.push(t,e,n,A())}let M=j.length/4,N=new Float32Array(j),P=new l(1,1);P.rotateX(-Math.PI/2),P.setAttribute(`aCell`,new s(N,4));let F=new D({uniforms:g,vertexShader:`
      attribute vec4 aCell;
      uniform float uH[93];
      uniform float uTime;
      uniform float uShimmer;
      uniform float uReveal;
      uniform float uFade;
      uniform float uTop;
      uniform vec4 uSpill;
      uniform float uSpillLevel;
      uniform float uCalm;
      varying vec2 vUv;
      varying float vG;
      ${W}
      ${k}
      float hAt(float x) {
        return uH[int(clamp(x, 0.0, 92.0))] * step(-0.5, x) * step(x, 92.5);
      }
      void main() {
        vec3 w = vec3(aCell.x + position.x, 0.0, aCell.y + position.z);
        float g = floorGrey(aCell.xy);
        // a few cells breathe, very slowly
        float s = step(0.986, aCell.w) * uShimmer;
        g *= 1.0 + s * 0.45 * sin(uTime * 0.21 + aCell.w * 700.0);
        // light from the columns pools on the cells around them
        float x = aCell.x;
        float h = hAt(x) * 0.4 + (hAt(x - 1.0) + hAt(x + 1.0)) * 0.2 + (hAt(x - 2.0) + hAt(x + 2.0)) * 0.1;
        float dz = aCell.y;
        float pool = h * (dz < 0.0 ? exp(dz * 0.16) : exp(-dz * 0.55));
        g += pool * 0.32;
        // each cell switches on when the wave from the timeline reaches it
        float r = length(vec2((aCell.x - 46.0) / 80.0, aCell.y / 46.0)) + aCell.w * 0.18;
        float on = smoothstep(r - 0.04, r + 0.08, uReveal * 1.35);
        // seen from above, the cell's place on screen decides its light
        vec4 cc = projectionMatrix * viewMatrix * vec4(aCell.x, 0.0, aCell.y, 1.0);
        vec2 ndc = cc.xy / cc.w;
        float vig = 1.0 - smoothstep(0.55, 1.3, length(ndc * vec2(0.85, 1.0)));
        // the playing video lights the cells around its frame, like a screen in a dark room
        vec2 q = max(max(uSpill.xy - ndc, ndc - uSpill.zw), 0.0);
        float spill = exp(-length(q * vec2(1.0, 0.75)) * 13.0) * uSpillLevel;
        float lit = mix(fade(vec3(aCell.x, 0.0, aCell.y)), vig * mix(0.62, 0.3, uCalm), uTop);
        vG = (g * lit + spill * (0.09 + 0.42 * aCell.w) * uTop) * on * uFade;
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      varying float vG;
      void main() {
        float d = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
        float aa = fwidth(d);
        float m = smoothstep(0.055 - aa, 0.055 + aa, d);
        gl_FragColor = vec4(vec3(mix(${G}, max(vG, ${G}), m)), 1.0);
      }
    `}),I=new r(P,F,M);I.frustumCulled=!1;let L=new b;L.add(I,x);let z=new m(22,1,1,2e3),B={dist:160,el:.19,portrait:!1,shift:.17,lift:0,top:0,topPx:0,pitch:20},K=new R,q=new R,ee=-29.5,J=23;function te(e){let t=H(e),n=B.top,r=(B.portrait?-.05*t:-.1*t)*(1-n),i=Q/(2*Math.tan(f.degToRad(z.fov/2))*B.pitch),a=B.dist*(B.portrait?1:1-.03*t),o=a+(i-a)*n,s=B.el+(Math.PI/2-B.el)*n;K.set(B.portrait?J+(92-2*J)*t:46+3*t,B.portrait?7:6.5,0),q.set(46.5,0,ee+B.topPx/B.pitch*.55),K.lerp(q,n);let c=Math.cos(s);z.position.set(K.x+o*Math.sin(r)*c,K.y+o*Math.sin(s),K.z+o*Math.cos(r)*c),z.rotation.set(-s,r,0,`YXZ`),z.near=Math.max(.5,o*.3),z.far=o*2.5+200,z.updateMatrixWorld(),oe()}let Y=0,ne=-1,re=+!!e.reduced,X=re,ie=-1,Z=1,Q=1;function ae(r){let i=e.reduced?1:y(r/.4,0,1);for(let e=0;e<93;e++){let r=V(y((i-e/92*.6)/.4,0,1));p[e]=r,h[e]=n[e]/t.top*r}te(e.reduced?0:y((r-.4)/.6,0,1)),ie=r,Y++}function oe(){z.setViewOffset(Z,Q,0,-B.shift*Q*(1-B.top)+B.lift,Z,Q),z.updateProjectionMatrix(),Y++}function se(e){return(Math.max(1,Math.ceil(n[e]/100))-1)*p[e]+.84*p[e]+.04*(1-p[e])}let ce={release:{x:0,y:0},end:{x:0,y:0},crest:{x:0,y:0}},le=new R;function ue(e,t,n,r){le.set(e,t,n).project(z),r.x=(le.x*.5+.5)*Z,r.y=(.5-le.y*.5)*Q}let de=(e,t)=>{e.value!==t&&(e.value=t,Y++)},fe={visible:!0,still:!1,scene:L,camera:z,setProgress(t){re=e.reduced?1:y(t,0,1)},update(e,t){g.uTime.value=e,g.uShimmer.value&&Y++;let n=1-Math.exp(-(t||.016)*9);X+=(re-X)*n,Math.abs(re-X)<1e-4&&(X=re),(X!==ie||B.dirty)&&(B.dirty=!1,ae(X)),fe.still=Y===ne},render(e){ne=Y,e.clearDepth(),e.render(L,z)},resize(e,t){Z=Math.max(1,e),Q=Math.max(1,t);let n=Z/Q;z.aspect=n,B.portrait=n<1,J=y(Math.round(n*38),16,34);let r=B.portrait?J+1.5:54,i=Math.tan(f.degToRad(z.fov/2))*n;B.dist=r/i,B.el=B.portrait?.34:.25,z.near=B.dist*.3,z.far=B.dist*2.5,B.shift=B.portrait?.3:.2,B.fitFor=-1,oe(),ae(X)},fitBelow(e){if(B.fitFor===e&&B.fitW===Z&&B.fitH===Q)return;B.fitFor=e,B.fitW=Z,B.fitH=Q;let t={lift:B.lift};B.lift=0,oe(),te(0);let r=Math.max(1,Math.ceil(n[i]/100));le.set(i,r,0).project(z);let a=(.5-le.y*.5)*Q;B.shift=y(B.shift+(e-a)/Q,.04,.42),B.lift=t.lift,oe(),ae(X),ie=-1},setFade(e){de(g.uFade,e),de(g.uReveal,e)},setBackgroundMode(e){x.visible=!e},setTop(e,t){e=y(e,0,1),!(Math.abs(e-B.top)<1e-4&&Math.abs(t-B.topPx)<.25)&&(B.top=e,B.topPx=t,de(g.uTop,e),B.dirty=!0)},setCalm(e){de(g.uCalm,e)},setPitch(e){Math.abs(e-B.pitch)<.01||(B.pitch=e,B.dirty=!0)},setSpill(e,t){if(de(g.uSpillLevel,t),!e||t<=0)return;let n=g.uSpill.value,r=e.left/Z*2-1,i=1-e.bottom/Q*2,a=e.right/Z*2-1,o=1-e.top/Q*2;(n.x!==r||n.y!==i||n.z!==a||n.w!==o)&&(n.set(r,i,a,o),Y++)},setLift(e){Math.abs(e-B.lift)<.25||(B.lift=e,oe())},anchors(){ue(0,0,.42,ce.release);let e=0;for(let t=78;t<=92;t++)e=Math.max(e,se(t));return ue(88,e,0,ce.end),ue(i,se(i),0,ce.crest),ce},land:{x:46.5,z:ee},stats:{cubes:o,floor:M,crestX:i,topLevel:d}};return ae(X),fe}var q=N,ee=class e extends B{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit=`px`}load(e,n,r,i){let a=this,o=new t(a.manager);o.setPath(a.path),o.setRequestHeader(a.requestHeader),o.setWithCredentials(a.withCredentials),o.load(e,function(t){try{n(a.parse(t))}catch(t){i?i(t):console.error(t),a.manager.itemError(e)}},r,i)}parse(e){let t=this;function n(e,t){if(e.nodeType!==1)return;e.hasAttribute(`filter`)&&console.warn(`THREE.SVGLoader: Filters are not supported.`);let a=C(e),o=!1,s=null;switch(e.nodeName){case`svg`:t=g(e,t);break;case`style`:i(e);break;case`g`:t=g(e,t);break;case`path`:t=g(e,t),e.hasAttribute(`d`)&&(s=r(e));break;case`rect`:t=g(e,t),s=c(e);break;case`polygon`:t=g(e,t),s=l(e);break;case`polyline`:t=g(e,t),s=u(e);break;case`circle`:t=g(e,t),s=d(e);break;case`ellipse`:t=g(e,t),s=f(e);break;case`line`:t=g(e,t),s=p(e);break;case`defs`:o=!0;break;case`use`:t=g(e,t);let a=(e.getAttributeNS(`http://www.w3.org/1999/xlink`,`href`)||``).substring(1),m=e.viewportElement.getElementById(a);m?n(m,t):console.warn(`SVGLoader: 'use node' references non-existent node id: `+a)}if(s){t.fill!==void 0&&t.fill!==`none`&&!t.fill.startsWith(`url`)&&s.color.setStyle(t.fill,q),E(s,G),N.push(s);let n=Object.assign({},t);n.strokeWidth=t.strokeWidth*j(G),s.userData={node:e,style:n,transform:G.clone(),gradients:I}}let m=e.childNodes;for(let e=0;e<m.length;e++){let r=m[e];o&&r.nodeName!==`style`&&r.nodeName!==`defs`||n(r,t)}a&&(L.pop(),L.length>0?G.copy(L[L.length-1]):G.identity())}function r(e){let t=new F,n=new v,r=new v,i=new v,a=!0,s=!1,c=e.getAttribute(`d`);if(c===``||c===`none`)return null;let l=c.match(/[a-df-z][^a-df-z]*/gi);for(let e=0,c=l.length;e<c;e++){let c=l[e],u=c.charAt(0),d=c.slice(1).trim();a===!0&&(s=!0,a=!1);let f;switch(u){case`M`:f=y(d);for(let e=0,a=f.length;e<a;e+=2)n.x=f[e+0],n.y=f[e+1],r.x=n.x,r.y=n.y,e===0?t.moveTo(n.x,n.y):t.lineTo(n.x,n.y),e===0&&i.copy(n);break;case`H`:f=y(d);for(let e=0,a=f.length;e<a;e++)n.x=f[e],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`V`:f=y(d);for(let e=0,a=f.length;e<a;e++)n.y=f[e],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`L`:f=y(d);for(let e=0,a=f.length;e<a;e+=2)n.x=f[e+0],n.y=f[e+1],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`C`:f=y(d);for(let e=0,a=f.length;e<a;e+=6)t.bezierCurveTo(f[e+0],f[e+1],f[e+2],f[e+3],f[e+4],f[e+5]),r.x=f[e+2],r.y=f[e+3],n.x=f[e+4],n.y=f[e+5],e===0&&s===!0&&i.copy(n);break;case`S`:f=y(d);for(let e=0,a=f.length;e<a;e+=4)t.bezierCurveTo(_(n.x,r.x),_(n.y,r.y),f[e+0],f[e+1],f[e+2],f[e+3]),r.x=f[e+0],r.y=f[e+1],n.x=f[e+2],n.y=f[e+3],e===0&&s===!0&&i.copy(n);break;case`Q`:f=y(d);for(let e=0,a=f.length;e<a;e+=4)t.quadraticCurveTo(f[e+0],f[e+1],f[e+2],f[e+3]),r.x=f[e+0],r.y=f[e+1],n.x=f[e+2],n.y=f[e+3],e===0&&s===!0&&i.copy(n);break;case`T`:f=y(d);for(let e=0,a=f.length;e<a;e+=2){let a=_(n.x,r.x),o=_(n.y,r.y);t.quadraticCurveTo(a,o,f[e+0],f[e+1]),r.x=a,r.y=o,n.x=f[e+0],n.y=f[e+1],e===0&&s===!0&&i.copy(n)}break;case`A`:f=y(d,[3,4],7);for(let e=0,a=f.length;e<a;e+=7){if(f[e+5]==n.x&&f[e+6]==n.y)continue;let a=n.clone();n.x=f[e+5],n.y=f[e+6],r.x=n.x,r.y=n.y,o(t,f[e],f[e+1],f[e+2],f[e+3],f[e+4],a,n),e===0&&s===!0&&i.copy(n)}break;case`m`:f=y(d);for(let e=0,a=f.length;e<a;e+=2)n.x+=f[e+0],n.y+=f[e+1],r.x=n.x,r.y=n.y,e===0?t.moveTo(n.x,n.y):t.lineTo(n.x,n.y),e===0&&i.copy(n);break;case`h`:f=y(d);for(let e=0,a=f.length;e<a;e++)n.x+=f[e],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`v`:f=y(d);for(let e=0,a=f.length;e<a;e++)n.y+=f[e],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`l`:f=y(d);for(let e=0,a=f.length;e<a;e+=2)n.x+=f[e+0],n.y+=f[e+1],r.x=n.x,r.y=n.y,t.lineTo(n.x,n.y),e===0&&s===!0&&i.copy(n);break;case`c`:f=y(d);for(let e=0,a=f.length;e<a;e+=6)t.bezierCurveTo(n.x+f[e+0],n.y+f[e+1],n.x+f[e+2],n.y+f[e+3],n.x+f[e+4],n.y+f[e+5]),r.x=n.x+f[e+2],r.y=n.y+f[e+3],n.x+=f[e+4],n.y+=f[e+5],e===0&&s===!0&&i.copy(n);break;case`s`:f=y(d);for(let e=0,a=f.length;e<a;e+=4)t.bezierCurveTo(_(n.x,r.x),_(n.y,r.y),n.x+f[e+0],n.y+f[e+1],n.x+f[e+2],n.y+f[e+3]),r.x=n.x+f[e+0],r.y=n.y+f[e+1],n.x+=f[e+2],n.y+=f[e+3],e===0&&s===!0&&i.copy(n);break;case`q`:f=y(d);for(let e=0,a=f.length;e<a;e+=4)t.quadraticCurveTo(n.x+f[e+0],n.y+f[e+1],n.x+f[e+2],n.y+f[e+3]),r.x=n.x+f[e+0],r.y=n.y+f[e+1],n.x+=f[e+2],n.y+=f[e+3],e===0&&s===!0&&i.copy(n);break;case`t`:f=y(d);for(let e=0,a=f.length;e<a;e+=2){let a=_(n.x,r.x),o=_(n.y,r.y);t.quadraticCurveTo(a,o,n.x+f[e+0],n.y+f[e+1]),r.x=a,r.y=o,n.x+=f[e+0],n.y+=f[e+1],e===0&&s===!0&&i.copy(n)}break;case`a`:f=y(d,[3,4],7);for(let e=0,a=f.length;e<a;e+=7){if(f[e+5]==0&&f[e+6]==0)continue;let a=n.clone();n.x+=f[e+5],n.y+=f[e+6],r.x=n.x,r.y=n.y,o(t,f[e],f[e+1],f[e+2],f[e+3],f[e+4],a,n),e===0&&s===!0&&i.copy(n)}break;case`Z`:case`z`:t.currentPath.autoClose=!0,t.currentPath.curves.length>0&&(n.copy(i),t.currentPath.currentPoint.copy(n),a=!0);break;default:console.warn(c)}s=!1}return t}function i(e){if(e.sheet&&e.sheet.cssRules&&e.sheet.cssRules.length)for(let t=0;t<e.sheet.cssRules.length;t++){let n=e.sheet.cssRules[t];if(n.type!==1)continue;let r=n.selectorText.split(/,/gm).filter(Boolean).map(e=>e.trim());for(let e=0;e<r.length;e++){let t=Object.fromEntries(Object.entries(n.style).filter(([,e])=>e!==``));P[r[e]]=Object.assign(P[r[e]]||{},t)}}}function o(e,t,n,r,i,a,o,c){if(t==0||n==0){e.lineTo(c.x,c.y);return}r=r*Math.PI/180,t=Math.abs(t),n=Math.abs(n);let l=(o.x-c.x)/2,u=(o.y-c.y)/2,d=Math.cos(r)*l+Math.sin(r)*u,f=-Math.sin(r)*l+Math.cos(r)*u,p=t*t,m=n*n,h=d*d,g=f*f,_=h/p+g/m;if(_>1){let e=Math.sqrt(_);t=e*t,n=e*n,p=t*t,m=n*n}let v=p*g+m*h,y=(p*m-v)/v,b=Math.sqrt(Math.max(0,y));i===a&&(b=-b);let x=b*t*f/n,S=-b*n*d/t,C=Math.cos(r)*x-Math.sin(r)*S+(o.x+c.x)/2,w=Math.sin(r)*x+Math.cos(r)*S+(o.y+c.y)/2,T=s(1,0,(d-x)/t,(f-S)/n),E=s((d-x)/t,(f-S)/n,(-d-x)/t,(-f-S)/n)%(Math.PI*2);e.currentPath.absellipse(C,w,t,n,T,T+E,a===0,r)}function s(e,t,n,r){let i=e*n+t*r,a=Math.sqrt(e*e+t*t)*Math.sqrt(n*n+r*r),o=Math.acos(Math.max(-1,Math.min(1,i/a)));return e*r-t*n<0&&(o=-o),o}function c(e){let t=S(e.getAttribute(`x`)||0),n=S(e.getAttribute(`y`)||0),r=S(e.getAttribute(`rx`)||e.getAttribute(`ry`)||0),i=S(e.getAttribute(`ry`)||e.getAttribute(`rx`)||0),a=S(e.getAttribute(`width`)),o=S(e.getAttribute(`height`)),s=.448084975506,c=new F;return c.moveTo(t+r,n),c.lineTo(t+a-r,n),(r!==0||i!==0)&&c.bezierCurveTo(t+a-r*s,n,t+a,n+i*s,t+a,n+i),c.lineTo(t+a,n+o-i),(r!==0||i!==0)&&c.bezierCurveTo(t+a,n+o-i*s,t+a-r*s,n+o,t+a-r,n+o),c.lineTo(t+r,n+o),(r!==0||i!==0)&&c.bezierCurveTo(t+r*s,n+o,t,n+o-i*s,t,n+o-i),c.lineTo(t,n+i),(r!==0||i!==0)&&c.bezierCurveTo(t,n+i*s,t+r*s,n,t+r,n),c}function l(e){function t(e,t,n){let a=S(t),o=S(n);i===0?r.moveTo(a,o):r.lineTo(a,o),i++}let n=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,r=new F,i=0;return e.getAttribute(`points`).replace(n,t),r.currentPath.autoClose=!0,r}function u(e){function t(e,t,n){let a=S(t),o=S(n);i===0?r.moveTo(a,o):r.lineTo(a,o),i++}let n=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,r=new F,i=0;return e.getAttribute(`points`).replace(n,t),r.currentPath.autoClose=!1,r}function d(e){let t=S(e.getAttribute(`cx`)||0),n=S(e.getAttribute(`cy`)||0),r=S(e.getAttribute(`r`)||0),i=new h;i.absarc(t,n,r,0,Math.PI*2);let a=new F;return a.subPaths.push(i),a}function f(e){let t=S(e.getAttribute(`cx`)||0),n=S(e.getAttribute(`cy`)||0),r=S(e.getAttribute(`rx`)||0),i=S(e.getAttribute(`ry`)||0),a=new h;a.absellipse(t,n,r,i,0,Math.PI*2);let o=new F;return o.subPaths.push(a),o}function p(e){let t=S(e.getAttribute(`x1`)||0),n=S(e.getAttribute(`y1`)||0),r=S(e.getAttribute(`x2`)||0),i=S(e.getAttribute(`y2`)||0),a=new F;return a.moveTo(t,n),a.lineTo(r,i),a.currentPath.autoClose=!1,a}function m(e){let t=e.querySelectorAll(`linearGradient, radialGradient`),n=[`x1`,`y1`,`x2`,`y2`,`cx`,`cy`,`r`,`fx`,`fy`,`gradientUnits`,`gradientTransform`,`spreadMethod`],r={};for(let e of t){let t=e.getAttribute(`id`);if(!t)continue;let i={type:e.nodeName===`radialGradient`?`radialGradient`:`linearGradient`,attrs:{},stops:null,href:null},a=e.getAttributeNS(`http://www.w3.org/1999/xlink`,`href`)||e.getAttribute(`href`)||``;a.startsWith(`#`)&&(i.href=a.substring(1));for(let t of n)e.hasAttribute(t)&&(i.attrs[t]=e.getAttribute(t));let o=e.querySelectorAll(`stop`);if(o.length>0){i.stops=[];for(let e of o){let t=e.getAttribute(`stop-color`);!t&&e.style&&(t=e.style[`stop-color`]),t||=`#000`;let n=e.getAttribute(`stop-opacity`);(n===null||n===``)&&e.style&&(n=e.style[`stop-opacity`]),n=n===null||n===``||n===void 0?1:Math.max(0,Math.min(1,parseFloat(n)));let r=Math.max(0,Math.min(1,parseFloat(e.getAttribute(`offset`)||`0`)));i.stops.push({offset:r,color:t,opacity:n})}}r[t]=i}function i(e,t){let n=r[e];if(!n||t.has(e))return n;if(t.add(e),n.href&&r[n.href]){let e=i(n.href,t);if(e){n.stops||=e.stops;for(let t in e.attrs)t in n.attrs||(n.attrs[t]=e.attrs[t])}}return n}for(let e in r)i(e,new Set);for(let e in r){let t=r[e],n=t.attrs,i=n.gradientUnits===`userSpaceOnUse`?`userSpaceOnUse`:`objectBoundingBox`,o={type:t.type,gradientUnits:i,spreadMethod:n.spreadMethod===`reflect`||n.spreadMethod===`repeat`?n.spreadMethod:`pad`,gradientTransform:null,stops:(t.stops||[]).slice().sort((e,t)=>e.offset-t.offset)};n.gradientTransform&&(o.gradientTransform=new a,T(n.gradientTransform,o.gradientTransform));function s(e){return typeof e==`string`?e.endsWith(`%`)?parseFloat(e)/100:S(e):0}if(t.type===`linearGradient`)o.x1=n.x1===void 0?0:s(n.x1),o.y1=n.y1===void 0?0:s(n.y1),o.x2=n.x2===void 0?+(i===`objectBoundingBox`):s(n.x2),o.y2=n.y2===void 0?0:s(n.y2);else{let e=i===`objectBoundingBox`?.5:0,t=i===`objectBoundingBox`?.5:0;o.cx=n.cx===void 0?e:s(n.cx),o.cy=n.cy===void 0?e:s(n.cy),o.r=n.r===void 0?t:s(n.r),o.fx=n.fx===void 0?o.cx:s(n.fx),o.fy=n.fy===void 0?o.cy:s(n.fy)}I[e]=o}}function g(e,t){t=Object.assign({},t);let n={};if(e.hasAttribute(`class`)){let t=e.getAttribute(`class`).split(/\s/).filter(Boolean).map(e=>e.trim());for(let e=0;e<t.length;e++)n=Object.assign(n,P[`.`+t[e]])}e.hasAttribute(`id`)&&(n=Object.assign(n,P[`#`+e.getAttribute(`id`)]));function r(r,i,a){a===void 0&&(a=function(e){return e}),e.hasAttribute(r)&&(t[i]=a(e.getAttribute(r))),n[i]&&(t[i]=a(n[i])),e.style&&e.style[r]!==``&&(t[i]=a(e.style[r]))}function i(e){return Math.max(0,Math.min(1,S(e)))}function a(e){return Math.max(0,S(e))}return r(`fill`,`fill`),r(`fill-opacity`,`fillOpacity`,i),r(`fill-rule`,`fillRule`),r(`opacity`,`opacity`,i),r(`stroke`,`stroke`),r(`stroke-opacity`,`strokeOpacity`,i),r(`stroke-width`,`strokeWidth`,a),r(`stroke-linejoin`,`strokeLineJoin`),r(`stroke-linecap`,`strokeLineCap`),r(`stroke-miterlimit`,`strokeMiterLimit`,a),r(`visibility`,`visibility`),t}function _(e,t){return e-(t-e)}function y(e,t,n){if(typeof e!=`string`)throw TypeError(`Invalid input: `+typeof e);let r={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},i=0,a=!0,o=``,s=``,c=[];function l(e,t,n){let r=SyntaxError(`Unexpected character "`+e+`" at index `+t+`.`);throw r.partial=n,r}function u(){o!==``&&(s===``?c.push(Number(o)):c.push(Number(o)*10**Number(s))),o=``,s=``}let d,f=e.length;for(let p=0;p<f;p++)if(d=e[p],Array.isArray(t)&&t.includes(c.length%n)&&r.FLAGS.test(d))i=1,o=d,u();else{if(i===0){if(r.WHITESPACE.test(d))continue;if(r.DIGIT.test(d)||r.SIGN.test(d)){i=1,o=d;continue}if(r.POINT.test(d)){i=2,o=d;continue}r.COMMA.test(d)&&(a&&l(d,p,c),a=!0)}if(i===1){if(r.DIGIT.test(d)){o+=d;continue}if(r.POINT.test(d)){o+=d,i=2;continue}if(r.EXP.test(d)){i=3;continue}r.SIGN.test(d)&&o.length===1&&r.SIGN.test(o[0])&&l(d,p,c)}if(i===2){if(r.DIGIT.test(d)){o+=d;continue}if(r.EXP.test(d)){i=3;continue}r.POINT.test(d)&&o[o.length-1]===`.`&&l(d,p,c)}if(i===3){if(r.DIGIT.test(d)){s+=d;continue}if(r.SIGN.test(d)){if(s===``){s+=d;continue}s.length===1&&r.SIGN.test(s)&&l(d,p,c)}}r.WHITESPACE.test(d)?(u(),i=0,a=!1):r.COMMA.test(d)?(u(),i=0,a=!0):r.SIGN.test(d)?(u(),i=1,o=d):r.POINT.test(d)?(u(),i=2,o=d):l(d,p,c)}return u(),c}let b=[`mm`,`cm`,`in`,`pt`,`pc`,`px`],x={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:12,pc:1,px:-1},px:{px:1}};function S(e){let n=`px`;if(typeof e==`string`||e instanceof String)for(let t=0,r=b.length;t<r;t++){let r=b[t];if(e.endsWith(r)){n=r,e=e.substring(0,e.length-r.length);break}}let r;return n===`px`&&t.defaultUnit!==`px`?r=x.in[t.defaultUnit]/t.defaultDPI:(r=x[n][t.defaultUnit],r<0&&(r=x[n].in*t.defaultDPI)),r*parseFloat(e)}function C(e){if(!(e.hasAttribute(`transform`)||e.nodeName===`use`&&(e.hasAttribute(`x`)||e.hasAttribute(`y`))))return null;let t=w(e);return L.length>0&&t.premultiply(L[L.length-1]),G.copy(t),L.push(t),t}function w(e){let t=new a;if(e.nodeName===`use`&&(e.hasAttribute(`x`)||e.hasAttribute(`y`))){let n=S(e.getAttribute(`x`)||0),r=S(e.getAttribute(`y`)||0);t.makeTranslation(n,r)}return e.hasAttribute(`transform`)&&T(e.getAttribute(`transform`),t),t}function T(e,t){let n=z,r=e.split(`)`);for(let e=r.length-1;e>=0;e--){let i=r[e].trim();if(i===``)continue;let a=i.indexOf(`(`),o=i.length;if(a>0&&a<o){let e=i.slice(0,a),r=y(i.slice(a+1));switch(n.identity(),e){case`translate`:if(r.length>=1){let e=r[0],t=0;r.length>=2&&(t=r[1]),n.makeTranslation(e,t)}break;case`rotate`:if(r.length>=1){let e=0,t=0,i=0;e=r[0]*Math.PI/180,r.length>=3&&(t=r[1],i=r[2]),B.makeTranslation(-t,-i),V.makeRotation(e),H.multiplyMatrices(V,B),B.makeTranslation(t,i),n.multiplyMatrices(B,H)}break;case`scale`:if(r.length>=1){let e=r[0],t=e;r.length>=2&&(t=r[1]),n.makeScale(e,t)}break;case`skewX`:r.length===1&&n.set(1,Math.tan(r[0]*Math.PI/180),0,0,1,0,0,0,1);break;case`skewY`:r.length===1&&n.set(1,0,0,Math.tan(r[0]*Math.PI/180),1,0,0,0,1);break;case`matrix`:r.length===6&&n.set(r[0],r[2],r[4],r[1],r[3],r[5],0,0,1)}t.premultiply(n)}}return t}function E(e,t){function n(e){W.set(e.x,e.y,1).applyMatrix3(t),e.set(W.x,W.y)}function r(e){let n=e.xRadius,r=e.yRadius,i=Math.cos(e.aRotation),a=Math.sin(e.aRotation),o=new R(n*i,n*a,0),s=new R(-r*a,r*i,0),c=o.applyMatrix3(t),l=s.applyMatrix3(t),u=z.set(c.x,l.x,0,c.y,l.y,0,0,0,1),d=B.copy(u).invert(),f=V.copy(d).transpose().multiply(d).elements,p=M(f[0],f[1],f[4]),m=Math.sqrt(p.rt1),h=Math.sqrt(p.rt2);if(e.xRadius=1/m,e.yRadius=1/h,e.aRotation=Math.atan2(p.sn,p.cs),!((e.aEndAngle-e.aStartAngle)%(2*Math.PI)<2**-52)){let n=B.set(m,0,0,0,h,0,0,0,1),r=V.set(p.cs,p.sn,0,-p.sn,p.cs,0,0,0,1),i=n.multiply(r).multiply(u),a=e=>{let{x:t,y:n}=new R(Math.cos(e),Math.sin(e),0).applyMatrix3(i);return Math.atan2(n,t)};e.aStartAngle=a(e.aStartAngle),e.aEndAngle=a(e.aEndAngle),D(t)&&(e.aClockwise=!e.aClockwise)}}function i(e){let n=k(t),r=A(t);e.xRadius*=n,e.yRadius*=r;let i=n>2**-52?Math.atan2(t.elements[1],t.elements[0]):Math.atan2(-t.elements[3],t.elements[4]);e.aRotation+=i,D(t)&&(e.aStartAngle*=-1,e.aEndAngle*=-1,e.aClockwise=!e.aClockwise)}let a=e.subPaths;for(let e=0,o=a.length;e<o;e++){let o=a[e].curves;for(let e=0;e<o.length;e++){let a=o[e];a.isLineCurve?(n(a.v1),n(a.v2)):a.isCubicBezierCurve?(n(a.v0),n(a.v1),n(a.v2),n(a.v3)):a.isQuadraticBezierCurve?(n(a.v0),n(a.v1),n(a.v2)):a.isEllipseCurve&&(U.set(a.aX,a.aY),n(U),a.aX=U.x,a.aY=U.y,O(t)?r(a):i(a))}}}function D(e){let t=e.elements;return t[0]*t[4]-t[1]*t[3]<0}function O(e){let t=e.elements,n=t[0]*t[3]+t[1]*t[4];if(n===0)return!1;let r=k(e),i=A(e);return Math.abs(n/(r*i))>2**-52}function k(e){let t=e.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function A(e){let t=e.elements;return Math.sqrt(t[3]*t[3]+t[4]*t[4])}function j(e){let t=e.elements,n=t[0]*t[4]-t[1]*t[3];return Math.sqrt(Math.abs(n))}function M(e,t,n){let r,i,a,o,s,c=e+n,l=e-n,u=Math.sqrt(l*l+4*t*t);return c>0?(r=.5*(c+u),s=1/r,i=e*s*n-t*s*t):c<0?i=.5*(c-u):(r=.5*u,i=-.5*u),a=l>0?l+u:l-u,Math.abs(a)>2*Math.abs(t)?(s=-2*t/a,o=1/Math.sqrt(1+s*s),a=s*o):Math.abs(t)===0?(a=1,o=0):(s=-.5*a/t,a=1/Math.sqrt(1+s*s),o=s*a),l>0&&(s=a,a=-o,o=s),{rt1:r,rt2:i,cs:a,sn:o}}let N=[],P={},I={},L=[],z=new a,B=new a,V=new a,H=new a,U=new v,W=new R,G=new a,K=new DOMParser().parseFromString(e,`image/svg+xml`);return m(K),n(K.documentElement,{fill:`#000`,fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:`miter`,strokeLineCap:`butt`,strokeMiterLimit:4}),{paths:N,gradients:I,xml:K.documentElement}}static createFillMaterial(e){let t=e.userData.style;if(t.fill===void 0||t.fill===`none`)return null;let n=e.color,r=null,a=J.exec(t.fill);a&&(r=te(e.userData.gradients&&e.userData.gradients[a[1]],e));let o=new i({opacity:t.fillOpacity*(t.opacity||1),transparent:!0,side:2,depthWrite:!1});return r===null?o.color=n:o.map=r,o}static createStrokeMaterial(e){let t=e.userData.style;return t.stroke===void 0||t.stroke===`none`?null:(J.test(t.stroke)&&console.warn(`THREE.SVGLoader: Gradient strokes are not supported.`),new i({color:new z().setStyle(t.stroke,q),opacity:t.strokeOpacity*(t.opacity||1),transparent:!0,side:2,depthWrite:!1}))}static createShapes(e){return console.warn(`SVGLoader: createShapes() is deprecated. Use shapePath.toShapes() instead.`),e.toShapes()}static getStrokeStyle(e,t,n,r,i){return e=e===void 0?1:e,t=t===void 0?`#000`:t,n=n===void 0?`miter`:n,r=r===void 0?`butt`:r,i=i===void 0?4:i,{strokeColor:t,strokeWidth:e,strokeLineJoin:n,strokeLineCap:r,strokeMiterLimit:i}}static pointsToStroke(t,n,r,i){let a=[],o=[],s=[];if(e.pointsToStrokeWithBuffers(t,n,r,i,a,o,s)===0)return null;let l=new C;return l.setAttribute(`position`,new c(a,3)),l.setAttribute(`normal`,new c(o,3)),l.setAttribute(`uv`,new c(s,2)),l}static pointsToStrokeWithBuffers(e,t,n,r,i,a,o,s){let c=new v,l=new v,u=new v,d=new v,f=new v,p=new v,m=new v,h=new v,g=new v,_=new v,y=new v,b=new v,S=new v,C=new v,w=new v,T=new v,E=new v;n=n===void 0?12:n,r=r===void 0?.001:r,s=s===void 0?0:s,e=te(e);let D=e.length;if(D<2)return 0;let O=e[0].equals(e[D-1]),k,A=e[0],j,M=t.strokeWidth/2,N=1/(D-1),P=0,F,I,L,R,z=!1,B=0,V=s*3,H=s*2;U(e[0],e[1],c).multiplyScalar(M),h.copy(e[0]).sub(c),g.copy(e[0]).add(c),_.copy(h),y.copy(g);for(let n=1;n<D;n++){k=e[n],j=n===D-1?O?e[1]:void 0:e[n+1];let r=c;if(U(A,k,r),u.copy(r).multiplyScalar(M),b.copy(k).sub(u),S.copy(k).add(u),F=P+N,I=!1,j!==void 0){U(k,j,l),u.copy(l).multiplyScalar(M),C.copy(k).sub(u),w.copy(k).add(u),L=!0,u.subVectors(j,A),r.dot(u)<0&&(L=!1),n===1&&(z=L),u.subVectors(j,k),u.normalize();let e=Math.abs(r.dot(u));if(e>2**-52){let n=M/e;u.multiplyScalar(-n),d.subVectors(k,A),f.copy(d).setLength(n).add(u),T.copy(f).negate();let r=f.length(),i=d.length();d.divideScalar(i),p.subVectors(j,k);let a=p.length();if(p.divideScalar(a),d.dot(T)<i&&p.dot(T)<a&&(I=!0),E.copy(f).add(k),T.add(k),I){let e=L?g:h,t=(E.x-e.x)*(T.y-e.y)-(E.y-e.y)*(T.x-e.x);(L&&t<0||!L&&t>0)&&T.copy(e)}switch(R=!1,I?L?(w.copy(T),S.copy(T)):(C.copy(T),b.copy(T)):K(),t.strokeLineJoin){case`bevel`:q(L,I,F);break;case`round`:ee(L,I),L?G(k,b,C,F,0):G(k,w,S,F,1);break;default:let e=M*t.strokeMiterLimit/r;if(e<1){if(t.strokeLineJoin!==`miter-clip`){q(L,I,F);break}ee(L,I),L?(p.subVectors(E,b).multiplyScalar(e).add(b),m.subVectors(E,C).multiplyScalar(e).add(C),W(b,F,0),W(p,F,0),W(k,F,.5),W(k,F,.5),W(p,F,0),W(m,F,0),W(k,F,.5),W(m,F,0),W(C,F,0)):(p.subVectors(E,S).multiplyScalar(e).add(S),m.subVectors(E,w).multiplyScalar(e).add(w),W(S,F,1),W(p,F,1),W(k,F,.5),W(k,F,.5),W(p,F,1),W(m,F,1),W(k,F,.5),W(m,F,1),W(w,F,1))}else I?(L?(W(g,P,1),W(h,P,0),W(E,F,0),W(g,P,1),W(E,F,0),W(T,F,1)):(W(g,P,1),W(h,P,0),W(E,F,1),W(h,P,0),W(T,F,0),W(E,F,1)),L?C.copy(E):w.copy(E)):L?(W(b,F,0),W(E,F,0),W(k,F,.5),W(k,F,.5),W(E,F,0),W(C,F,0)):(W(S,F,1),W(E,F,1),W(k,F,.5),W(k,F,.5),W(E,F,1),W(w,F,1)),R=!0}}else K()}else K();!O&&n===D-1&&J(e[0],_,y,L,!0,P),P=F,A=k,h.copy(C),g.copy(w)}if(!O)J(k,b,S,L,!1,F);else if(I&&i){let e=E,t=T;z!==L&&(e=T,t=E),L?(R||z)&&(t.toArray(i,0),t.toArray(i,9),R&&e.toArray(i,3)):(R||!z)&&(t.toArray(i,3),t.toArray(i,9),R&&e.toArray(i,0))}if(i){let e=[new v,new v,new v],t=s*3;for(let n=t;n<V;n+=9)e[0].set(i[n],i[n+1]),e[1].set(i[n+3],i[n+4]),e[2].set(i[n+6],i[n+7]),x.area(e)<0&&(i[n+3]=e[0].x,i[n+4]=e[0].y)}return B;function U(e,t,n){return n.subVectors(t,e),n.set(-n.y,n.x).normalize()}function W(e,t,n){i&&(i[V]=e.x,i[V+1]=e.y,i[V+2]=0,a&&(a[V]=0,a[V+1]=0,a[V+2]=1),V+=3,o&&(o[H]=t,o[H+1]=n,H+=2)),B+=3}function G(e,t,r,i,a){c.copy(t).sub(e).normalize(),l.copy(r).sub(e).normalize();let o=Math.PI,s=c.dot(l);Math.abs(s)<1&&(o=Math.abs(Math.acos(s))),o/=n,u.copy(t);for(let t=0,r=n-1;t<r;t++)d.copy(u).rotateAround(e,o),W(u,i,a),W(d,i,a),W(e,i,.5),u.copy(d);W(u,i,a),W(r,i,a),W(e,i,.5)}function K(){W(g,P,1),W(h,P,0),W(b,F,0),W(g,P,1),W(b,F,0),W(S,F,1)}function q(e,t,n){t?e?(W(g,P,1),W(h,P,0),W(b,F,0),W(g,P,1),W(b,F,0),W(T,F,1),W(b,n,0),W(C,n,0),W(T,n,.5)):(W(g,P,1),W(h,P,0),W(S,F,1),W(h,P,0),W(T,F,0),W(S,F,1),W(S,n,1),W(T,n,0),W(w,n,1)):e?(W(b,n,0),W(C,n,0),W(k,n,.5)):(W(S,n,1),W(w,n,0),W(k,n,.5))}function ee(e,t){t&&(e?(W(g,P,1),W(h,P,0),W(b,F,0),W(g,P,1),W(b,F,0),W(T,F,1),W(b,P,0),W(k,F,.5),W(T,F,1),W(k,F,.5),W(C,P,0),W(T,F,1)):(W(g,P,1),W(h,P,0),W(S,F,1),W(h,P,0),W(T,F,0),W(S,F,1),W(S,P,1),W(T,F,0),W(k,F,.5),W(k,F,.5),W(T,F,0),W(w,P,1)))}function J(e,n,r,a,s,f){switch(t.strokeLineCap){case`round`:s?G(e,r,n,f,.5):G(e,n,r,f,.5);break;case`square`:if(s)c.subVectors(n,e),l.set(c.y,-c.x),u.addVectors(c,l).add(e),d.subVectors(l,c).add(e),a?(u.toArray(i,3),d.toArray(i,0),d.toArray(i,9)):(u.toArray(i,3),o[7]===1?d.toArray(i,9):u.toArray(i,9),d.toArray(i,0));else{c.subVectors(r,e),l.set(c.y,-c.x),u.addVectors(c,l).add(e),d.subVectors(l,c).add(e);let t=i.length;a?(u.toArray(i,t-3),d.toArray(i,t-6),d.toArray(i,t-12)):(d.toArray(i,t-6),u.toArray(i,t-3),d.toArray(i,t-12))}}}function te(e){let t=!1;for(let n=1,i=e.length-1;n<i;n++)if(e[n].distanceTo(e[n+1])<r){t=!0;break}if(!t)return e;let n=[];n.push(e[0]);for(let t=1,i=e.length-1;t<i;t++)e[t].distanceTo(e[t+1])>=r&&n.push(e[t]);return n.push(e[e.length-1]),n}}},J=/^\s*url\(\s*(?:["']\s*)?#([^)'"\s]+)(?:\s*["'])?\s*\)\s*$/;function te(e,t,n=256){if(!e||!Array.isArray(e.stops)||e.stops.length===0)return null;let r=t.userData.transform,i=e.gradientUnits===`objectBoundingBox`,s=null;if(i&&(s=Y(t,r),s===null))return null;function c(t,n,a){a.set(t,n,1),e.gradientTransform&&a.applyMatrix3(e.gradientTransform),i&&a.set(s.minX+a.x*s.width,s.minY+a.y*s.height,1),r&&a.applyMatrix3(r)}let l=document.createElement(`canvas`),u;if(e.type===`linearGradient`){l.width=n,l.height=1;let t=l.getContext(`2d`),r=t.createLinearGradient(0,0,n,0);ne(r,e.stops),t.fillStyle=r,t.fillRect(0,0,n,1);let i=new R,o=new R;c(e.x1,e.y1,i),c(e.x2,e.y2,o);let s=o.x-i.x,d=o.y-i.y,f=s*s+d*d||1e-20,p=s/f,m=d/f,h=-(p*i.x+m*i.y);u=new a().set(p,m,h,0,0,.5,0,0,1)}else{let t=e.cx,o=e.cy,c=e.fx,d=e.fy,f=e.r;if(e.gradientTransform){let n=new R;n.set(t,o,1).applyMatrix3(e.gradientTransform),t=n.x,o=n.y,n.set(c,d,1).applyMatrix3(e.gradientTransform),c=n.x,d=n.y}if(i&&(t=s.minX+t*s.width,o=s.minY+o*s.height,c=s.minX+c*s.width,d=s.minY+d*s.height,f*=Math.sqrt((s.width*s.width+s.height*s.height)/2)),f<=0)return null;l.width=n,l.height=n;let p=l.getContext(`2d`),m=t-f,h=o-f,g=2*f,_=n/g;p.setTransform(_,0,0,_,-m*_,-h*_);let v=p.createRadialGradient(c,d,0,t,o,f);ne(v,e.stops),p.fillStyle=v,p.fillRect(m,h,g,g);let y=r?r.clone().invert():new a;u=new a().set(1/g,0,-m/g,0,1/g,-h/g,0,0,1).multiply(y)}let d=new _(l);d.colorSpace=q,d.flipY=!1,d.matrixAutoUpdate=!1,d.matrix=u;let f=e.spreadMethod===`reflect`?o:e.spreadMethod===`repeat`?A:I;return d.wrapS=f,d.wrapT=f,d}function Y(e,t){let n=t?t.clone().invert():null,r=new v,i=new S;for(let t of e.subPaths)for(let e of t.getPoints())r.copy(e),n&&r.applyMatrix3(n),i.expandByPoint(r);return i.isEmpty()?null:{minX:i.min.x,minY:i.min.y,width:i.max.x-i.min.x,height:i.max.y-i.min.y}}function ne(e,t){let n=new z;for(let r of t){let t=r.color;if(r.opacity<1){n.setStyle(r.color,q);let e=/rgb\(([^)]+)\)/.exec(n.getStyle(q));e&&(t=`rgba(${e[1]},${r.opacity})`)}e.addColorStop(Math.max(0,Math.min(1,r.offset)),t)}}function re(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new C,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=X(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=X(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function X(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new w(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var ie=L.logo,Z=`
attribute vec3 aPiece;  // the piece's centre (xy, svg units) and its turn in the build, 0..1 left to right
uniform float uBuild;   // 0 = nothing built, 1 = every piece whole
varying vec3 vN;
varying vec3 vW;
varying float vBuilt;
void main() {
  float t = clamp((uBuild * 1.5 - aPiece.z * 0.5) / 1.0, 0.0, 1.0);
  float e = t * t * (3.0 - 2.0 * t);
  vec3 p = position;
  p.xy = aPiece.xy + (p.xy - aPiece.xy) * mix(0.4, 1.0, e);
  p.z *= e;
  p.y += (1.0 - e) * 6.0;
  vBuilt = e;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Q=`
precision highp float;
uniform vec3 uBase;
uniform vec3 uKeyPos;  // the key: a soft source above and left of the logo, in front
uniform float uKeyR;   // its reach: light falls off across the logo, brightest at upper left
uniform vec3 uRimDir;
uniform float uKeyLv;
uniform float uRimLv;
uniform float uAmb;
uniform float uSweep;   // world x of the glint's band (css px)
uniform float uSweepW;  // its half width
varying vec3 vN;
varying vec3 vW;
varying float vBuilt;
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(cameraPosition - vW);
  vec3 toKey = uKeyPos - vW;
  float d = length(toKey);
  vec3 uKey = toKey / d;
  float att = 1.6 / (1.0 + (d * d) / (uKeyR * uKeyR));
  float nk = dot(n, uKey);
  float diff = pow(max((nk + 0.3) / 1.3, 0.0), 1.4);
  vec3 h = normalize(uKey + v);
  float nh = max(dot(n, h), 0.0);
  float spec = pow(nh, 90.0) * 1.1 + pow(nh, 14.0) * 0.07;
  float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  float rim = fres * max(dot(n, uRimDir) + 0.25, 0.0);
  vec3 col = uBase * (uAmb + diff * 1.12 * att * uKeyLv);
  col += vec3(1.0) * spec * att * uKeyLv;
  col += mix(uBase, vec3(1.0), 0.55) * rim * 1.6 * uRimLv;
  // the glint: a slanted band of light running over the logo, strongest on the bevels
  float band = exp(-pow((vW.x + vW.y * 0.4 - uSweep) / uSweepW, 2.0));
  col += vec3(1.0) * band * (0.25 + 1.4 * fres) * uKeyLv;
  // a piece still landing burns white for a moment, then cools to its pink
  col += vec3(1.0, 0.85, 0.92) * (1.0 - vBuilt) * vBuilt * 2.4 * uRimLv;
  // a soft shoulder instead of clipping, so the highlight stays white, not flat
  col = col / (1.0 + max(col - 0.85, 0.0));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`,ae=22,oe={w:129.96,h:56.41},se=.94;function ce(e){let t=new b,r=new m(ae,1,10,2e4),i=new E;t.add(i);let a={uKeyPos:{value:new R},uKeyR:{value:1e3},uRimDir:{value:new R(.85,.35,-.4).normalize()},uKeyLv:{value:0},uRimLv:{value:0},uAmb:{value:.07},uBuild:{value:0},uSweep:{value:-1e5},uSweepW:{value:60}},o=new z(`#e81f76`),s=new D({vertexShader:Z,fragmentShader:Q,uniforms:{...a,uBase:{value:new R(o.r,o.g,o.b)}}}),c=!1,u={...oe},d={uTime:{value:0},uLevel:{value:0},uPitch:{value:12},uSize:{value:new v(1,1)},uPink:{value:new R(o.r,o.g,o.b)}},h=new p(new l(1,1),new D({transparent:!0,depthWrite:!1,blending:2,uniforms:d,vertexShader:`
        varying vec2 vP;
        uniform vec2 uSize;
        void main() {
          vP = position.xy * uSize;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float uTime; uniform float uLevel; uniform float uPitch; uniform vec2 uSize; uniform vec3 uPink;
        varying vec2 vP;
        void main() {
          vec2 q = vP / (uSize * 0.5);
          float r = length(q * vec2(1.0, 1.15));
          float fall = smoothstep(1.0, 0.15, r);
          vec2 id = floor(vP / uPitch);
          float n = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
          float breath = 0.75 + 0.25 * sin(uTime * 1.3 + n * 6.2831);
          vec2 f = abs(fract(vP / uPitch) - 0.5);
          float sz = 0.5 * fall * breath;
          float on = 1.0 - smoothstep(sz - 0.06, sz + 0.02, max(f.x, f.y));
          vec3 c = mix(uPink, vec3(1.0), 0.15) * on * fall * uLevel * 0.5;
          gl_FragColor = vec4(c, 1.0);
        }`}));h.renderOrder=-1,t.add(h);let g=!1,_=()=>{g||(g=!0,new ee().load(ie,S))},S=a=>{let o=new E,l=[],d=0;for(let e of a.paths)for(let t of e.toShapes()){let e=t.extractPoints(12),r=Math.abs(x.area(e.shape)),i=0;for(let t of[e.shape,...e.holes])for(let e=0;e<t.length;e++)i+=t[e].distanceTo(t[(e+1)%t.length]);for(let t of e.holes)r-=Math.abs(x.area(t));let a=2*r/Math.max(i,.001),o=1/0;for(let t of e.shape)o=Math.min(o,t.y);let s=o>44,c=y(a*.2,.03,s?.16:.42),u=new n(t,{depth:s?2.4:5.2,bevelEnabled:!0,bevelThickness:c*1.1,bevelSize:c,bevelOffset:-c,bevelSegments:3,curveSegments:12});u.translate(0,0,d*.012),d++,u.computeBoundingBox();let f=u.boundingBox.getCenter(new R),p=u.attributes.position.count,m=new Float32Array(p*3);for(let e=0;e<p;e++)m[e*3]=f.x,m[e*3+1]=f.y,m[e*3+2]=f.x/oe.w;u.setAttribute(`aPiece`,new w(m,3)),l.push(u)}o.add(new p(re(l),s));for(let e of l)e.dispose();o.rotation.x=Math.PI,o.updateMatrixWorld(!0);let f=new j().setFromObject(o),m=f.getCenter(new R);o.position.set(-m.x,-m.y,-f.max.z+(f.max.z-f.min.z)*.5),u={w:f.max.x-f.min.x,h:f.max.y-f.min.y},i.add(o),c=!0,e.renderer?.compileAsync(t,r).catch(()=>{})},C={x:0,y:0,w:0,h:0},T={x:0,y:0},O=0,k={x:NaN,y:0,w:0,h:0,p:0,W:0,H:0},A=!1,M={visible:!1,still:!1,build:_,scene:t,camera:r,setProgress(e){O=e},setRect(e){C.x=e.x??e.left,C.y=e.y??e.top,C.w=e.w??e.width,C.h=e.h??e.height},_group:i,update(t,n){let o=e.width,s=e.height,l=C.w>1&&C.y<s+40&&C.y+C.h>-40&&C.x<o&&C.x+C.w>0;if(a.uRimLv.value=P(.08,.42,O),a.uKeyLv.value=P(.18,.62,O),M.visible=c&&l&&a.uRimLv.value>.002,!M.visible||(M.still=e.reduced&&A&&k.x===C.x&&k.y===C.y&&k.w===C.w&&k.h===C.h&&k.p===O&&k.W===o&&k.H===s,M.still))return;r.aspect=o/s;let p=s/2/Math.tan(f.degToRad(ae/2));r.position.set(0,0,p),r.near=p*.3,r.far=p*3,r.lookAt(0,0,0),r.updateProjectionMatrix();let m=C.w*se/u.w;i.scale.setScalar(m),i.position.set(C.x+C.w/2-o/2,s/2-(C.y+C.h/2),0);let g=C.w*se;a.uKeyPos.value.set(i.position.x-g*.38,i.position.y+g*.42,g*.75),a.uKeyR.value=g*1.05,a.uBuild.value=e.reduced?1:P(.12,.8,O);let _=e.reduced?2:t%4.5/4.5*1.6-.3;a.uSweep.value=i.position.x-g*.5+g*_,a.uSweepW.value=g*.07,h.position.set(i.position.x,i.position.y,-g*.35),h.scale.set(g*1.5,g*.95,1),d.uSize.value.set(g*1.5,g*.95),d.uPitch.value=Math.max(8,g*.018),d.uTime.value=e.reduced?0:t,d.uLevel.value=a.uKeyLv.value;let v=e.pointer,b=e.reduced,x=!b&&v.active&&!v.touch?v.nx:0,S=!b&&v.active&&!v.touch?v.ny:0,w=1-Math.exp(-n/.35);T.x+=(x-T.x)*w,T.y+=(S-T.y)*w;let E=b?0:Math.sin(t*.21)*.08,D=b?0:(y((O-.4)/2.2)-.5)*.5;i.rotation.y=-.13+.08*(1-a.uKeyLv.value)+E+T.x*.22+D,i.rotation.x=.06-T.y*.16+(b?0:Math.sin(t*.17+1.3)*.04)},render(n){k.x=C.x,k.y=C.y,k.w=C.w,k.h=C.h,k.p=O,k.W=e.width,k.H=e.height,A=!0,n.clearDepth(),n.render(t,r)},resize(){}};return M}var le=`
varying vec3 vN;
varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,ue=`
precision highp float;
uniform vec3 uLight;
uniform vec3 uBase;
uniform float uLevel;
uniform float uFall;
uniform float uAmb;
varying vec3 vN;
varying vec3 vW;
void main() {
  vec3 n = normalize(vN);
  vec3 l = uLight - vW;
  float dist = length(l);
  l /= dist;
  vec3 v = normalize(cameraPosition - vW);
  vec3 h = normalize(l + v);
  float att = 1.0 / (1.0 + dist * dist * uFall);
  float diff = max(dot(n, l), 0.0);
  float spec = pow(max(dot(n, h), 0.0), 70.0);
  float rim = pow(1.0 - max(dot(n, v), 0.0), 4.0);
  // a soft key from above keeps the letters' tops readable away from the cell
  float key = max(n.y, 0.0) * 0.18;
  vec3 col = uBase * (uAmb + key + diff * att * 3.2) + vec3(spec * att * 4.0 + rim * att * 0.6);
  gl_FragColor = vec4(col * uLevel, 1.0);
}
`;function de(e,t){let r=new b,i=new m(26,1,10,2e4),a=new E;r.add(a);let o={value:new R},s={value:0},c={value:1/81e4},l={value:.22},u=[],d={w:1938,h:591},h=!1,_=!1,y=()=>{_||(_=!0,new ee().load(t,x))},x=t=>{let f=new E;for(let e of t.paths){let t=e.userData?.style?.fill||`#ffffff`,r=t.toLowerCase()!==`#fff`&&t.toLowerCase()!==`#ffffff`,i=new D({vertexShader:le,fragmentShader:ue,uniforms:{uLight:o,uLevel:s,uFall:c,uAmb:l,uBase:{value:r?new R(.75,.22,.17):new R(.16,.16,.17)}}});u.push(i);let a=e.toShapes(!0).map(e=>new n(e,{depth:110,bevelEnabled:!0,bevelThickness:10,bevelSize:7,bevelSegments:3,curveSegments:2}));if(a.length&&f.add(new p(a.length>1?re(a):a[0],i)),a.length>1)for(let e of a)e.dispose()}f.rotation.x=Math.PI;let m=new j().setFromObject(f),g=m.getCenter(new R);f.position.set(-g.x,-g.y,-m.max.z),d={w:m.max.x-m.min.x,h:m.max.y-m.min.y},a.add(f),h=!0,e.renderer?.compileAsync(r,i).catch(()=>{})},S=new T,C=new v,w=new g(new R(0,0,1),-420),O=new R,k={x:0,y:0},A=0,M={level:NaN,lx:0,ly:0,top:0,W:0,H:0},N={visible:!1,still:!1,build:y,scene:r,camera:i,setLevel(e){s.value=e},setLight(e,t){k.x=e,k.y=t},setTop(e){A=e},update(){let t=e.width,n=e.height;if(N.visible=h&&s.value>.002,!N.visible||(N.still=M.level===s.value&&M.lx===k.x&&M.ly===k.y&&M.top===A&&M.W===t&&M.H===n,N.still))return;let r=t/n;i.aspect=r;let u=r<1;l.value=u?.42:.22;let p=u?.94:.9,m=d.w/p,g=m/r,_=g/2/Math.tan(f.degToRad(i.fov/2)),v=d.h/g*n,y=(A+v/2-n/2)/n;i.position.set(0,g*y,_),i.lookAt(0,g*y,0),i.updateProjectionMatrix(),a.rotation.x=-.16,C.set(k.x/t*2-1,-(k.y/n*2-1)),S.setFromCamera(C,i),S.ray.intersectPlane(w,O)&&o.value.copy(O),c.value=1/Math.max(600,m*.55)**2},render(t){M.level=s.value,M.lx=k.x,M.ly=k.y,M.top=A,M.W=e.width,M.H=e.height,t.clearDepth(),t.render(r,i)},resize(){}};return N}var fe=new R;function $(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;fe.copy(t),fe[r]=0,fe.normalize();let l=.5*o/(o+s),u=1-fe.angleTo(e)/c;return Math.sign(fe[n])===1?u*l:s/(o+s)+l+l*(1-u)}var pe=class e extends O{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new R,c=new R,l=new R(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new R,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=$(m,c,`z`,`y`,i,n),f[a+1]=1-$(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-$(m,c,`z`,`y`,i,n),f[a+1]=1-$(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-$(m,c,`x`,`z`,i,e),f[a+1]=$(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-$(m,c,`x`,`z`,i,e),f[a+1]=1-$(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-$(m,c,`x`,`y`,i,e),f[a+1]=1-$(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=$(m,c,`x`,`y`,i,e),f[a+1]=1-$(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},me=Math.PI/180,he=24,ge=.62,_e=.022,ve=2*Math.PI/90,ye=new R(.08,1,.05).normalize(),be=7*me,xe=.25,Se=.85,Ce=`
vec3 tonemap(vec3 x) { return 1.0 - exp(-x); }
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`,we=`
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`,Te=`
precision highp float;
uniform float uRight;   // frame right edge, device px, GL y-up space
uniform float uLY;      // light centre y, device px, GL y-up
uniform float uS;       // min(frame w, h), device px
uniform float uLv;      // 0..1 glow level
uniform vec2 uSpan;     // frame bottom, top: device px, GL y-up
uniform float uPitch;   // halo cell pitch, device px (the cell's halo pitch)
uniform float uCells;   // 0 = smooth light, 1 = the site's halftone halo
${Ce}
// the softbox's light on the wall at a screen point, linear
vec3 wall(vec2 p) {
  float dx = (uRight - p.x) / uS;
  float dy = (p.y - uLY) / uS;
  float reach = mix(0.1, 1.0, uLv);
  vec2 q = vec2((dx + 0.04) / (0.22 * reach), dy / (0.55 * mix(0.55, 1.0, uLv)));
  float r2 = dot(q, q);
  vec3 c = vec3(1.0) * exp(-r2 * 1.5) * 2.2 + vec3(0.29) * exp(-sqrt(r2 + 0.02) * 1.25) * 0.32;
  c += vec3(0.58) * exp(-max(dx + 0.02, 0.0) / (0.05 * reach)) * 0.25 * exp(-dy * dy * 0.9);
  c *= uLv;
  c *= 1.0 - smoothstep(0.0, 0.01, -dx);
  float fade = 0.22 * uS;
  c *= smoothstep(uSpan.x - fade, uSpan.x, p.y) * (1.0 - smoothstep(uSpan.y, uSpan.y + fade, p.y));
  return c;
}
void main() {
  vec2 p = gl_FragCoord.xy;
  if (uCells > 0.5) {
    // The cell's halo, lit by the softbox: a regular grid of square cells
    // anchored on the light's edge. Each cell takes the light at its centre and
    // grows with it (a halftone): solid white at the source, small grey squares
    // into the room, dropping out at random where the light runs out.
    vec2 g = vec2(uRight - p.x, uSpan.y - p.y) / uPitch;   // fixed to the frame: the light moves, the grid does not
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    vec2 cc = vec2(uRight, uSpan.y) - (id + 0.5) * uPitch;
    float v = dot(tonemap(wall(cc)), vec3(0.3333));
    float h = hash12(id + 17.0);
    // the cells live where the light thins out; at the source the light outshines
    // them (max below), so nothing ever switches off as the level rises
    float zone = smoothstep(0.035, 0.11, v);
    float keep = step(h, zone) * step(0.001, zone);
    float aa = 0.6 / uPitch;
    float sq = 1.0 - smoothstep(0.33 - aa, 0.33 + aa, max(abs(f.x), abs(f.y)));
    // each cell is a 2x2 cluster, as on the banner
    vec2 sf = fract(g * 2.0) - 0.5;
    float sub = 1.0 - smoothstep(0.3, 0.44, max(abs(sf.x), abs(sf.y)));
    float cellV = min(0.46, 0.12 + v * 1.1) * (0.8 + 0.4 * hash12(id + 3.1)) * mix(0.55, 1.0, sub);
    // the light itself: whole at the source, thinning to a low wash under the cells
    vec3 lightC = tonemap(wall(p));
    float vl = dot(lightC, vec3(0.3333));
    vec3 under = lightC * mix(0.3, 1.0, smoothstep(0.2, 0.55, vl));
    gl_FragColor = vec4(max(under, vec3(sq * keep * cellV)), 1.0);
  } else {
    gl_FragColor = vec4(tonemap(wall(p)), 1.0);
  }
  #include <colorspace_fragment>
  gl_FragColor.rgb += (hash12(p) - 0.5) / 255.0 * step(0.001, uLv);
}
`,Ee=`
varying vec3 vW;
varying vec3 vN;
varying vec3 vON;
varying vec3 vOP;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vON = normal;
  vOP = position;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,De=`
precision highp float;
uniform vec3 uBoxC;     // softbox centre, world; the panel lies in the plane x = uBoxC.x, facing -x
uniform vec2 uBoxH;     // softbox half size along y and z
uniform float uRad;     // softbox radiance
uniform float uRim;     // 0..1 the bevels' reflection
uniform float uFace;    // 0..1 the faces' reflection and diffuse
uniform float uAmb;     // 0..1 room fill
uniform float uCoat;    // 1 = clearcoat lobe on (dropped on the low tier)
uniform vec3 uAlbedo;
uniform vec3 uF0;
uniform float uRough;
uniform float uHeart;
uniform float uSpill;
uniform float uCoatW;
uniform float uRimBoost;
uniform float uWrap;
uniform float uVoid;    // 0..1 the cell's void engraved in every face
uniform float uDots;    // dots across a face
uniform float uLine;    // 0..1 the cell's white light living in the edges
varying vec3 vW;
varying vec3 vN;
varying vec3 vON;
varying vec3 vOP;
${Ce}
float hash21(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 15731.743); }

// The cell's void, as on the banner: solid at its heart, breaking into a
// diagonal screen of dots toward its rim. Here it is cut into the finish:
// 1 = matte ink, 0 = the polished graphite around it.
float voidInk(vec2 p) {
  float x = length(p) / 0.34;
  float dens = 1.0 - smoothstep(0.35, 0.95, x);
  vec2 q = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p * uDots;
  vec2 g = floor(q);
  vec2 fq = fract(q) - 0.5;
  float size = mix(0.3, 0.5, dens);
  float aa = fwidth(q.x) * 0.75;
  float dotA = 1.0 - smoothstep(size - aa, size + aa, max(abs(fq.x), abs(fq.y)));
  dotA = max(dotA, smoothstep(0.85, 0.97, dens));
  return step(hash21(g), dens) * dotA;
}

float band(float x, float h, float s) {
  return smoothstep(-h - s, -h + s, x) * (1.0 - smoothstep(h - s, h + s, x));
}

// radiance seen along ray P + R t, blurred by the lobe's width (a = roughness^2)
float softbox(vec3 P, vec3 R, float a) {
  if (R.x <= 0.0) return 0.0;
  float t = (uBoxC.x - P.x) / R.x;
  vec3 H = P + R * t - uBoxC;
  float s = 0.015 + t * a * 1.1;
  // brighter at its heart, falling off to its rim like a real diffuser: faces
  // that see it get a gradient, not a flat sheet of white
  vec2 q = H.yz / uBoxH;
  float heart = 0.12 + 0.88 * exp(-dot(q, q) * uHeart);
  float shape = band(H.y, uBoxH.x, s) * band(H.z, uBoxH.y, s);
  // a broad falloff around the panel: light the panel throws on the room
  float spill = uSpill * exp(-length(H.yz) * 1.2);
  return uRad * (shape * heart + spill);
}

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  if (dot(N, V) < 0.0) N = -N;
  float NoV = max(dot(N, V), 1e-3);
  vec3 R = reflect(-V, N);

  // bevels vs faces: a face's object normal is one axis
  vec3 on = abs(normalize(vON));
  float axis = max(on.x, max(on.y, on.z));
  float edge = 1.0 - smoothstep(0.965, 0.998, axis);
  float lit = mix(uFace, uRim, edge);

  // which face, and where on it
  vec2 fp = on.x > on.y && on.x > on.z ? vOP.yz : (on.y > on.z ? vOP.xz : vOP.xy);
  float ink = voidInk(fp) * (1.0 - edge) * uVoid;

  // widen the lobe where the normal turns fast within a pixel: crisp rims, no sparkle
  float curv = length(fwidth(N));
  float aBase = sqrt(uRough * uRough * uRough * uRough + curv * curv * 0.6);
  float aCoat = sqrt(0.0016 + curv * curv * 0.6);

  float fres = pow(1.0 - NoV, 5.0);
  vec3 Fb = uF0 + (max(vec3(1.0 - uRough), uF0) - uF0) * fres;
  float Fc = 0.04 + 0.96 * fres;

  // the ink is matte: the softbox's reflection shows the void as a dark screen in the gloss
  vec3 col = Fb * softbox(vW, R, mix(aBase, 0.7, ink)) * (1.0 - 0.3 * ink);
  col += uCoat * uCoatW * Fc * softbox(vW, R, aCoat) * (1.0 - ink);
  // the bevels are polished: they hold the light's full strength as thin bright lines
  col *= lit * (1.0 + edge * uRimBoost);

  // diffuse from the panel: graphite drinks almost all of it
  vec3 toBox = uBoxC - vW;
  float d2 = dot(toBox, toBox);
  float ndl = max(dot(N, toBox * inversesqrt(d2)), 0.0);
  col += uAlbedo * uRad * 0.55 * ndl / (1.0 + d2 * 0.35) * uFace;
  // the lit room wraps around: faces turned half away still carry a graphite gradient
  float wrap = clamp((dot(N, toBox * inversesqrt(d2)) + 0.65) / 1.65, 0.0, 1.0);
  col += uAlbedo * uRad * uWrap * wrap * wrap * uFace;
  // and the bright wall to the right shows faintly in the gloss
  col += Fb * uRad * 0.035 * smoothstep(-0.3, 1.0, R.x) * uFace;

  // the void drinks the light: the ink is darker than the graphite around it
  col *= 1.0 - 0.6 * ink;

  // the cell's light lives in its edges: a thin even line of white along every
  // bevel, faint against the graphite, the same outline the visitor followed
  float line = smoothstep(0.55, 0.95, edge);
  col += vec3(line * 0.11 * uLine);

  // the room: a whisper of cool fill so the shadow side still has a shape
  col += uAlbedo * (0.12 + 0.1 * N.y) * uAmb;

  gl_FragColor = vec4(tonemap(col) + vec3(0.0015), 1.0);
  #include <colorspace_fragment>
  gl_FragColor.rgb += (hash12(gl_FragCoord.xy) - 0.5) / 255.0 * step(0.001, uAmb);
}
`;function Oe(t){let n=new b,r=new m(he,1,.05,100),i=t.tier===`low`,a=new C;a.setAttribute(`position`,new c([-1,-1,0,3,-1,0,-1,3,0],3));let o={uRight:{value:0},uLY:{value:0},uS:{value:1},uLv:{value:0},uSpan:{value:new v},uPitch:{value:8},uCells:{value:1}},s=new p(a,new D({vertexShader:we,fragmentShader:Te,uniforms:o,depthTest:!1,depthWrite:!1,blending:2,transparent:!1}));s.frustumCulled=!1,s.renderOrder=-1,n.add(s);let l={uBoxC:{value:new R},uBoxH:{value:new v(.62,1.5)},uRad:{value:6},uRim:{value:0},uFace:{value:0},uAmb:{value:0},uCoat:{value:+!i},uAlbedo:{value:new R(.026,.029,.036)},uF0:{value:new R(.042,.047,.058)},uRough:{value:.46},uHeart:{value:2.2},uSpill:{value:.02},uCoatW:{value:.5},uRimBoost:{value:7},uWrap:{value:.35},uVoid:{value:1},uDots:{value:46},uLine:{value:0}},u=new p(new pe(1,1,1,i?3:5,_e),new D({vertexShader:Ee,fragmentShader:De,uniforms:l}));n.add(u);let f=new e().setFromAxisAngle(new R(1,0,0),14*me).multiply(new e().setFromAxisAngle(new R(0,1,0),-28*me)),h=new e,g=new e,_=new d,y={x:0,y:0,w:1,h:1,set:!1},x=null,S=0,w=0,T=0,E={x:0,y:0},O={x:0,y:0,init:!1},k={x:0,y:0,h:0},A={sig:``},j=``,M=new R,N=new R,F=new R;function I(e,n,i){M.set(e/t.width*2-1,-(n/t.height*2-1),.5).unproject(r),N.copy(M).sub(r.position).normalize();let a=-r.position.z/N.z;return i.copy(r.position).addScaledVector(N,a)}let L={visible:!1,still:!1,scene:n,camera:r,_tune:{cubeU:l,glowU:o,POSE:null,spin:null,lineOff:!1},setLevel(e){S=Math.min(1,Math.max(0,e))},setFrame(e){y.x=e.x,y.y=e.y,y.w=Math.max(1,e.w),y.h=Math.max(1,e.h),y.set=!0},setScroll(e){w=e},setCube(e){x=e},lightAt(){return{x:y.x+y.w,y:O.y}},screen(){return{x:k.x,y:k.y,h:k.h}},update(e,n){let i=t.width,a=t.height;y.set||L.setFrame({x:i*.45,y:0,w:i*.55,h:a}),L.visible=S>.001;let s=Math.min(y.w,y.h),c=1-Math.exp(-n/xe),d=y.y+y.h*.5,p=d,m=t.pointer;t.reduced||(p=m.active&&!m.touch?Math.min(y.y+y.h*.82,Math.max(y.y+y.h*.18,m.y)):d+Math.sin(e*2*Math.PI/12)*y.h*.1),!O.init||t.reduced?(O.y=p,O.init=!0):O.y+=(p-O.y)*c;let v=0,b=0;if(t.reduced||(T+=n*ve,m.active&&!m.touch?(v=Math.max(-1,Math.min(1,(m.y-d)/(y.h*.5))),b=Math.max(-1,Math.min(1,(m.x-(y.x+y.w*.5))/(y.w*.5)))):(v=Math.sin(e*2*Math.PI/12)*.4,b=Math.cos(e*2*Math.PI/12)*.4)),E.x+=(v*be-E.x)*c,E.y+=(b*be-E.y)*c,L._tune.spin!=null&&(T=L._tune.spin),!L.visible)return;if(t.reduced){let e=x?x.x:0;if(j=`${S},${y.x},${y.y},${y.w},${y.h},${w},${e},${x?x.y:0},${x?x.edge:0},${i},${a},${t.dpr}`,L.still=j===A.sig,L.still)return}h.setFromAxisAngle(ye,T),g.setFromEuler(_.set(E.x,E.y,0,`XYZ`)),u.quaternion.copy(g).multiply(L._tune.POSE||f).multiply(h);let C=x?x.x:y.x+y.w*.5,D=(x?x.y:y.y+y.h*.5)-w*Se,N=x?x.edge:s*ge;r.aspect=i/a,r.position.set(0,0,a/(2*Math.tan(he*me/2)*N)),r.lookAt(0,0,0),r.updateProjectionMatrix();let R=r.projectionMatrix.elements;R[8]=-(C/i*2-1),R[9]=D/a*2-1,r.projectionMatrixInverse.copy(r.projectionMatrix).invert(),r.updateMatrixWorld(),I(y.x+y.w,O.y,F),l.uBoxC.value.set(F.x+.08,F.y,-.35),l.uBoxH.value.set(y.h*.34/N,1.6);let z=S;o.uLv.value=P(0,.7,z),l.uRim.value=P(.12,.5,z),l.uFace.value=P(.35,.95,z),l.uAmb.value=P(.1,.8,z),l.uLine.value=L._tune.lineOff?0:P(.05,.4,z);let B=t.dpr;o.uRight.value=(y.x+y.w)*B,o.uLY.value=(a-O.y)*B,o.uS.value=s*B,o.uPitch.value=Math.max(6,N*.0363)*B,o.uSpan.value.set((a-y.y-y.h)*B,(a-y.y)*B),u.updateMatrixWorld(),M.set(0,0,0).project(r),k.x=(M.x*.5+.5)*i,k.y=(-M.y*.5+.5)*a;let V=1/0,H=-1/0;for(let e=0;e<8;e++){F.set(e&1?.5:-.5,e&2?.5:-.5,e&4?.5:-.5).applyMatrix4(u.matrixWorld).project(r);let t=(-F.y*.5+.5)*a;t<V&&(V=t),t>H&&(H=t)}k.h=H-V},render(e){A.sig=t.reduced?j:``,e.clearDepth(),e.render(n,r)},resize(){}};return L}export{ce as createAward,Oe as createMonolith,K as createOffice,de as createWordmark};