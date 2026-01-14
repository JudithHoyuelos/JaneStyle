(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9969],{2644:function(e,r,t){Promise.resolve().then(t.bind(t,5498))},3632:function(e,r,t){"use strict";t.d(r,{S:function(){return a}}),t(2265);var o=t(2079),n=t(9148);let i=0,a=(0,n.Z)(e=>(o.tEQ.onStart=(r,t,o)=>{e({active:!0,item:r,loaded:t,total:o,progress:(t-i)/(o-i)*100})},o.tEQ.onLoad=()=>{e({active:!1})},o.tEQ.onError=r=>e(e=>({errors:[...e.errors,r]})),o.tEQ.onProgress=(r,t,o)=>{t===o&&(i=o),e({active:!0,item:r,loaded:t,total:o,progress:(t-i)/(o-i)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0}))},3145:function(e,r,t){"use strict";t(8461)},9376:function(e,r,t){"use strict";var o=t(5475);t.o(o,"useRouter")&&t.d(r,{useRouter:function(){return o.useRouter}})},8461:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{default:function(){return s},getImageProps:function(){return l}});let o=t(7043),n=t(5346),i=t(5878),a=o._(t(5084));function l(e){let{props:r}=(0,n.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/JaneStyle/dev/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,t]of Object.entries(r))void 0===t&&delete r[e];return{props:r}}let s=i.Image},5498:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return g}});var o=t(7437),n=t(2265),i=t(7031),a=t(8516),l=()=>{let[e,r]=(0,n.useState)(!1),t=(0,n.useRef)(null);return(0,n.useEffect)(()=>{e?(console.log("Sonido activado"),t.current&&t.current.play()):(console.log("Sonido desactivado"),t.current&&(t.current.pause(),t.current.currentTime=0))},[e]),(0,o.jsxs)("div",{id:"bloque-sonido",onClick:()=>{r(e=>!e)},children:[(0,o.jsx)("div",{id:"sonido",children:(0,o.jsx)("p",{children:"Sound"})}),(0,o.jsxs)("div",{id:"cuadro",className:e?"activo":"inactivo",children:[(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"})]}),(0,o.jsx)("audio",{ref:t,src:(0,a.p)("audio/Natural speed.mp3")})]})},s=t(8451),u=t(9836),c=t(7806),d=t(2624),m=t(2079);function f(e){let{url:r,position:t,scale:i=[1,1,1],rotation:a=[0,0,0],renderOrder:l=1,mode:s="tree",onClick:u=null}=e,c=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"tree",[t,o]=(0,n.useState)(null);return(0,n.useEffect)(()=>{let t=!1,n=new Image;n.crossOrigin="anonymous",n.src=e;let i=null;return n.onload=()=>{if(t)return;let e=n.width,a=n.height,l=document.createElement("canvas");l.width=e,l.height=a;let s=l.getContext("2d");s.drawImage(n,0,0);let u=s.getImageData(0,0,e,a),c=u.data;for(let e=0;e<c.length;e+=4){let t=c[e],o=c[e+1],n=c[e+2],i=t/(o+n+1);if("tree"===r)(t>130&&o<70&&n<70&&i>1.6||t>120&&o<60&&n<60&&i>1.4||t>100&&o<50&&n<50&&i>1.2)&&(c[e+3]=0);else if("mountain"===r){let r=t>90&&o<100&&n<100,a=40>Math.abs(o-n),l=t>110&&o<80&&n<80;(i>1.4&&r&&a||l)&&(c[e+3]=0)}}s.putImageData(u,0,0),l.toBlob(e=>{!t&&e&&(i&&URL.revokeObjectURL(i),o(i=URL.createObjectURL(e)))},"image/png")},n.onerror=()=>{t||o(null)},()=>{t=!0,i&&URL.revokeObjectURL(i)}},[e,r]),t}(r,s),f=(0,d.H)(m.dpR,c||r);return(0,o.jsxs)("mesh",{position:t,scale:i,rotation:a,renderOrder:l,onClick:u,onPointerDown:u,children:[(0,o.jsx)("planeGeometry",{args:[1,1]}),(0,o.jsx)("meshBasicMaterial",{map:f,transparent:!0,alphaTest:.5,depthWrite:!1,depthTest:!0,side:m.Wl3})]})}function v(e,r){let t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15,o=arguments.length>3?arguments[3]:void 0,n=arguments.length>4?arguments[4]:void 0,i=[],a=Math.floor((r-e)/t);for(let r=0;r<n;r++){let n=e+r%a*t+(r%3-1)*2,l=o-15*Math.floor(r/a)+(r%2-.5)*2;i.push({x:n,y:1.5,z:l})}return i}var p=t(9424),g=(0,c.Z)(function(){let{cameraRef:e,isDragging:r,velocityRef:t,handlePointerDown:a,handlePointerUp:c,handlePointerMove:d,handleCreated:m,CameraInertia:g}=(0,i.S)(),x=(0,n.useMemo)(()=>[{url:"/img/arbolesymontanas/Arbol1.png"},{url:"/img/arbolesymontanas/Arbol2.png"},{url:"/img/arbolesymontanas/Arbol3.png"}],[]),h=(0,n.useMemo)(()=>{let e=v(-25,-10,5,-37,3);return[...e,...v(-15,-5,5,-70,2),...v(55,80,5,-55,2),...v(15,40,6,-35,3)]},[]),w=(0,n.useMemo)(()=>h.map((e,r)=>{let{x:t,y:o,z:n}=e,i=x[r%x.length];return{key:"tree-".concat(r),url:i.url,position:[t,o,n],scale:[6,4,10],rotation:[0,0,0]}}),[h,x]),y=(0,n.useMemo)(()=>[{key:"mountain-1",url:"/img/arbolesymontanas/2DMontana3.png",position:[35,2,-60],scale:[90,95,380]},{key:"mountain-2",url:"/img/arbolesymontanas/2DMontana2.png",position:[-35,1,-45],scale:[60,35,100]},{key:"mountain-3",url:"/img/arbolesymontanas/2DMontana3.png",position:[-25,2,-75],scale:[85,100,230]},{key:"mountain-4",url:"/img/arbolesymontanas/2DMontana1.png",position:[20,1,-40],scale:[40,40,50]}],[]);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(p.h9,{onPointerDown:a,onPointerUp:c,onPointerMove:d,onCreated:m,children:[(0,o.jsx)(g,{cameraRef:e,velocityRef:t,isDragging:r}),(0,o.jsx)(p.nT,{}),(0,o.jsx)(p.pJ,{}),w.map(e=>{let{key:r,url:t,position:n,scale:i,rotation:a}=e;return(0,o.jsx)(f,{url:t,position:n,scale:i,rotation:a,mode:"tree"},r)}),y.map(e=>{let{key:r,url:t,position:n,scale:i}=e;return(0,o.jsx)(f,{url:t,position:n,scale:i,mode:"mountain"},r)}),(0,o.jsx)(p._v,{})]}),(0,o.jsx)(l,{}),(0,o.jsx)(s.Z,{}),(0,o.jsx)(u.Z,{})]})})},9424:function(e,r,t){"use strict";t.d(r,{h9:function(){return v},_v:function(){return x},a$:function(){return f},pJ:function(){return g},nT:function(){return p}});var o=t(7437),n=t(2265),i=t(1106),a=t(6007),l=t(2079),s=t(7283),u=t(4752),c=t(2624);let d=(0,n.forwardRef)((e,r)=>{let{dimensions:t=[1e3,1e3],normals:i,distortionScale:a=.6,size:s=10,options:d={},...m}=e,[f]=(0,n.useState)(()=>new l._12(...t)),v=(0,n.useMemo)(()=>{if(i)return new l.dpR().load(i,e=>{e.wrapS=e.wrapT=l.rpg})},[i]),[p]=(0,n.useState)(()=>new u.B(f,{textureWidth:512,textureHeight:512,waterNormals:v,sunDirection:new l.Pa4,sunColor:16777215,waterColor:7695,distortionScale:a,fog:!1,...d}));return(0,n.useImperativeHandle)(r,()=>p),(0,n.useEffect)(()=>{var e;(null==p?void 0:null===(e=p.material)||void 0===e?void 0:e.uniforms)&&(p.material.uniforms.distortionScale.value=a,p.material.uniforms.size.value=s,p.material.uniforms.normalSampler.value=v)},[a,s,v,p]),(0,c.F)(()=>{p.material.uniforms.time.value+=.001}),(0,o.jsx)("group",{...m,children:(0,o.jsx)("primitive",{object:p,"rotation-x":-Math.PI/2})})});d.displayName="Ocean";var m=t(8516);function f(e){let{url:r,position:t=[0,0,0],scale:n=[1,1,1],rotation:a=[0,0,0]}=e;i.L.preload(r);let{scene:l}=(0,i.L)(r),s=l.clone();return s.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),(0,o.jsx)("primitive",{object:s,position:t,scale:n,rotation:a})}function v(e){let{camera:r={position:[0,2,0],fov:75,rotation:[0,0,0]},style:t={width:"100vw",height:"100vh",zIndex:0},children:n,...i}=e;return(0,o.jsx)(s.Xz,{camera:r,gl:{antialias:!0},style:t,...i,children:n})}function p(){return(0,o.jsx)(a.qA,{files:(0,m.p)("img/equirectangular/sky-background-4.hdr"),background:!0})}function g(){return(0,o.jsx)(d,{dimensions:[200,200],normals:(0,m.p)("/img/textures/waternormals.jpg"),distortionScale:1,size:3,options:{clipBias:0,alpha:1,waterNormals:null,sunDirection:new l.Pa4(.70707,.70707,0),sunColor:16761035,waterColor:2573426,eye:new l.Pa4(0,0,0),distortionScale:0,side:l.Wl3,fog:!0}})}function x(e){let{color:r="#3B004F",density:t=.008}=e;return(0,o.jsx)("fogExp2",{attach:"fog",color:r,density:t})}},5850:function(e,r,t){"use strict";var o=t(7437);t(2265),t(3145);var n=t(3599),i=t.n(n);r.Z=()=>(0,o.jsx)("div",{className:i().container,children:(0,o.jsx)("div",{className:i().logoContainer,children:(0,o.jsx)("div",{className:i().waveOverlay})})})},7806:function(e,r,t){"use strict";var o=t(7437),n=t(2265),i=t(3632),a=t(5850);r.Z=e=>function(r){let{progress:t}=(0,i.S)(),[l,s]=(0,n.useState)(!0);return(0,n.useEffect)(()=>{if(100===t){let e=setTimeout(()=>s(!1),500);return()=>clearTimeout(e)}},[t]),(0,o.jsxs)(o.Fragment,{children:[l&&(0,o.jsx)(a.Z,{}),(0,o.jsx)(e,{...r})]})}},9836:function(e,r,t){"use strict";var o=t(7437),n=t(2265),i=t(9376);t(3193),r.Z=()=>{let[e,r]=(0,n.useState)(!1),t=(0,i.useRouter)(),a=()=>{r(!1),t.push("/")};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"bg-black bg-opacity-50 fixed top-10 left-6 z-50 p-2 rounded-full volver",children:(0,o.jsx)("button",{className:" text-white",onClick:a,children:"Volver"})}),e&&(0,o.jsx)("div",{className:"modal-overlay",children:(0,o.jsxs)("div",{className:"modal-content",children:[(0,o.jsx)("p",{children:"\xbfSeguro que quieres volver al inicio?"}),(0,o.jsx)("button",{className:"confirm-button",onClick:a,children:"Salir"}),(0,o.jsx)("button",{className:"cancel-button",onClick:()=>r(!1),children:"Cancelar"})]})})]})}},8451:function(e,r,t){"use strict";var o=t(7437),n=t(9376);t(5015);var i=t(8516);r.Z=e=>{let{title:r}=e,t=(0,n.useRouter)();return(0,o.jsxs)("div",{onClick:()=>{t.push("/")},className:"contenedor-logon",style:{display:"flex",alignItems:"center",position:"fixed",top:"20px",transform:"translateX(-45%)",zIndex:1e3,padding:"10px",cursor:"pointer",fontFamily:"'Sora', sans-serif"},children:[(0,o.jsx)("img",{src:(0,i.p)("img/logos/Alvearium_logo-whitepeq.png"),alt:"Logo",style:{marginTop:"-1rem"},className:"logo"}),r&&(0,o.jsx)("span",{className:"tituloi",style:{marginLeft:"10px",color:"#fff"},children:r})]})}},7031:function(e,r,t){"use strict";t.d(r,{S:function(){return a}});var o=t(2265),n=t(2624);function i(e){let{cameraRef:r,velocityRef:t,isDragging:o}=e;return(0,n.F)(()=>{!o&&r.current&&(r.current.position.x-=t.current.x,t.current.x*=.95,.001>Math.abs(t.current.x)&&(t.current.x=0))}),null}function a(){let e=(0,o.useRef)(),[r,t]=(0,o.useState)(!1),n=(0,o.useRef)({x:0,y:0}),a=(0,o.useRef)({x:0,y:0}),l=(0,o.useCallback)(e=>{t(!0),n.current={x:e.clientX,y:e.clientY}},[]),s=(0,o.useCallback)(()=>{t(!1)},[]),u=(0,o.useCallback)(t=>{if(r&&e.current){let r=t.clientX-n.current.x;a.current.x=.01*r,e.current.position.x-=a.current.x,n.current={x:t.clientX,y:t.clientY}}},[r]),c=(0,o.useCallback)(r=>{let{camera:t}=r;e.current=t},[]);return{cameraRef:e,isDragging:r,velocityRef:a,handlePointerDown:l,handlePointerUp:s,handlePointerMove:u,handleCreated:c,CameraInertia:i}}},8516:function(e,r,t){"use strict";t.d(r,{p:function(){return o}});let o=e=>"".concat("/JaneStyle/dev","/").concat(e).replace(/\/+/g,"/")},3193:function(){},5015:function(){},3599:function(e){e.exports={container:"Loader_container__IKaco",logoContainer:"Loader_logoContainer__mp4Vc",logoWhite:"Loader_logoWhite__HV87R",logoColor:"Loader_logoColor__8OTrc",waveReveal:"Loader_waveReveal__y6laM"}},4752:function(e,r,t){"use strict";t.d(r,{B:function(){return i}});var o=t(2079),n=t(1448);class i extends o.Kj0{constructor(e,r={}){super(e),this.isWater=!0;let t=this,i=void 0!==r.textureWidth?r.textureWidth:512,a=void 0!==r.textureHeight?r.textureHeight:512,l=void 0!==r.clipBias?r.clipBias:0,s=void 0!==r.alpha?r.alpha:1,u=void 0!==r.time?r.time:0,c=void 0!==r.waterNormals?r.waterNormals:null,d=void 0!==r.sunDirection?r.sunDirection:new o.Pa4(.70707,.70707,0),m=new o.Ilk(void 0!==r.sunColor?r.sunColor:16777215),f=new o.Ilk(void 0!==r.waterColor?r.waterColor:8355711),v=void 0!==r.eye?r.eye:new o.Pa4(0,0,0),p=void 0!==r.distortionScale?r.distortionScale:20,g=void 0!==r.side?r.side:o.Wl3,x=void 0!==r.fog&&r.fog,h=new o.JOQ,w=new o.Pa4,y=new o.Pa4,b=new o.Pa4,j=new o.yGw,S=new o.Pa4(0,0,-1),_=new o.Ltg,C=new o.Pa4,M=new o.Pa4,N=new o.Ltg,P=new o.yGw,k=new o.cPb,D=new o.dd2(i,a),L={name:"MirrorShader",uniforms:o.rDY.merge([n.UniformsLib.fog,n.UniformsLib.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new o.yGw},sunColor:{value:new o.Ilk(8355711)},sunDirection:{value:new o.Pa4(.70707,.70707,0)},eye:{value:new o.Pa4},waterColor:{value:new o.Ilk(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},R=new o.jyz({name:L.name,uniforms:o.rDY.clone(L.uniforms),vertexShader:L.vertexShader,fragmentShader:L.fragmentShader,lights:!0,side:g,fog:x});R.uniforms.mirrorSampler.value=D.texture,R.uniforms.textureMatrix.value=P,R.uniforms.alpha.value=s,R.uniforms.time.value=u,R.uniforms.normalSampler.value=c,R.uniforms.sunColor.value=m,R.uniforms.waterColor.value=f,R.uniforms.sunDirection.value=d,R.uniforms.distortionScale.value=p,R.uniforms.eye.value=v,t.material=R,t.onBeforeRender=function(e,r,o){if(y.setFromMatrixPosition(t.matrixWorld),b.setFromMatrixPosition(o.matrixWorld),j.extractRotation(t.matrixWorld),w.set(0,0,1),w.applyMatrix4(j),C.subVectors(y,b),C.dot(w)>0)return;C.reflect(w).negate(),C.add(y),j.extractRotation(o.matrixWorld),S.set(0,0,-1),S.applyMatrix4(j),S.add(b),M.subVectors(y,S),M.reflect(w).negate(),M.add(y),k.position.copy(C),k.up.set(0,1,0),k.up.applyMatrix4(j),k.up.reflect(w),k.lookAt(M),k.far=o.far,k.updateMatrixWorld(),k.projectionMatrix.copy(o.projectionMatrix),P.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),P.multiply(k.projectionMatrix),P.multiply(k.matrixWorldInverse),h.setFromNormalAndCoplanarPoint(w,y),h.applyMatrix4(k.matrixWorldInverse),_.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let n=k.projectionMatrix;N.x=(Math.sign(_.x)+n.elements[8])/n.elements[0],N.y=(Math.sign(_.y)+n.elements[9])/n.elements[5],N.z=-1,N.w=(1+n.elements[10])/n.elements[14],_.multiplyScalar(2/_.dot(N)),n.elements[2]=_.x,n.elements[6]=_.y,n.elements[10]=_.z+1-l,n.elements[14]=_.w,v.setFromMatrixPosition(o.matrixWorld);let i=e.getRenderTarget(),a=e.xr.enabled,s=e.shadowMap.autoUpdate;t.visible=!1,e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(D),e.state.buffers.depth.setMask(!0),!1===e.autoClear&&e.clear(),e.render(r,k),t.visible=!0,e.xr.enabled=a,e.shadowMap.autoUpdate=s,e.setRenderTarget(i);let u=o.viewport;void 0!==u&&e.state.viewport(u)}}}}},function(e){e.O(0,[535,9197,5336,5870,6689,5878,4687,2971,2117,1744],function(){return e(e.s=2644)}),_N_E=e.O()}]);