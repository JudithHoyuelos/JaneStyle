(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9642],{5463:function(e,r,t){Promise.resolve().then(t.bind(t,5752))},3632:function(e,r,t){"use strict";t.d(r,{S:function(){return a}}),t(2265);var o=t(2079),i=t(9148);let n=0,a=(0,i.Z)(e=>(o.tEQ.onStart=(r,t,o)=>{e({active:!0,item:r,loaded:t,total:o,progress:(t-n)/(o-n)*100})},o.tEQ.onLoad=()=>{e({active:!1})},o.tEQ.onError=r=>e(e=>({errors:[...e.errors,r]})),o.tEQ.onProgress=(r,t,o)=>{t===o&&(n=o),e({active:!0,item:r,loaded:t,total:o,progress:(t-n)/(o-n)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0}))},3145:function(e,r,t){"use strict";t(8461)},9376:function(e,r,t){"use strict";var o=t(5475);t.o(o,"useRouter")&&t.d(r,{useRouter:function(){return o.useRouter}})},8461:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(r,{default:function(){return s},getImageProps:function(){return l}});let o=t(7043),i=t(5346),n=t(5878),a=o._(t(5084));function l(e){let{props:r}=(0,i.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/JaneStyle/dev/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,t]of Object.entries(r))void 0===t&&delete r[e];return{props:r}}let s=n.Image},5752:function(e,r,t){"use strict";t.r(r);var o=t(7437),i=t(9424),n=t(9873),a=t(8451),l=t(9836),s=t(7806);r.default=(0,s.Z)(function(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i.h9,{children:[(0,o.jsx)(i.nT,{}),(0,o.jsx)(i.pJ,{})]}),(0,o.jsx)(n.Z,{}),(0,o.jsx)(a.Z,{}),(0,o.jsx)(l.Z,{})]})})},9424:function(e,r,t){"use strict";t.d(r,{h9:function(){return v},_v:function(){return g},a$:function(){return f},pJ:function(){return x},nT:function(){return p}});var o=t(7437),i=t(2265),n=t(1106),a=t(6007),l=t(2079),s=t(7283),u=t(4752),c=t(2624);let d=(0,i.forwardRef)((e,r)=>{let{dimensions:t=[1e3,1e3],normals:n,distortionScale:a=.6,size:s=10,options:d={},...m}=e,[f]=(0,i.useState)(()=>new l._12(...t)),v=(0,i.useMemo)(()=>{if(n)return new l.dpR().load(n,e=>{e.wrapS=e.wrapT=l.rpg})},[n]),[p]=(0,i.useState)(()=>new u.B(f,{textureWidth:512,textureHeight:512,waterNormals:v,sunDirection:new l.Pa4,sunColor:16777215,waterColor:7695,distortionScale:a,fog:!1,...d}));return(0,i.useImperativeHandle)(r,()=>p),(0,i.useEffect)(()=>{var e;(null==p?void 0:null===(e=p.material)||void 0===e?void 0:e.uniforms)&&(p.material.uniforms.distortionScale.value=a,p.material.uniforms.size.value=s,p.material.uniforms.normalSampler.value=v)},[a,s,v,p]),(0,c.F)(()=>{p.material.uniforms.time.value+=.001}),(0,o.jsx)("group",{...m,children:(0,o.jsx)("primitive",{object:p,"rotation-x":-Math.PI/2})})});d.displayName="Ocean";var m=t(8516);function f(e){let{url:r,position:t=[0,0,0],scale:i=[1,1,1],rotation:a=[0,0,0]}=e;n.L.preload(r);let{scene:l}=(0,n.L)(r),s=l.clone();return s.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),(0,o.jsx)("primitive",{object:s,position:t,scale:i,rotation:a})}function v(e){let{camera:r={position:[0,2,0],fov:75,rotation:[0,0,0]},style:t={width:"100vw",height:"100vh",zIndex:0},children:i,...n}=e;return(0,o.jsx)(s.Xz,{camera:r,gl:{antialias:!0},style:t,...n,children:i})}function p(){return(0,o.jsx)(a.qA,{files:(0,m.p)("img/equirectangular/sky-background-4.hdr"),background:!0})}function x(){return(0,o.jsx)(d,{dimensions:[200,200],normals:(0,m.p)("/img/textures/waternormals.jpg"),distortionScale:1,size:3,options:{clipBias:0,alpha:1,waterNormals:null,sunDirection:new l.Pa4(.70707,.70707,0),sunColor:16761035,waterColor:2573426,eye:new l.Pa4(0,0,0),distortionScale:0,side:l.Wl3,fog:!0}})}function g(e){let{color:r="#3B004F",density:t=.008}=e;return(0,o.jsx)("fogExp2",{attach:"fog",color:r,density:t})}},5850:function(e,r,t){"use strict";var o=t(7437);t(2265),t(3145);var i=t(3599),n=t.n(i);r.Z=()=>(0,o.jsx)("div",{className:n().container,children:(0,o.jsx)("div",{className:n().logoContainer,children:(0,o.jsx)("div",{className:n().waveOverlay})})})},7806:function(e,r,t){"use strict";var o=t(7437),i=t(2265),n=t(3632),a=t(5850);r.Z=e=>function(r){let{progress:t}=(0,n.S)(),[l,s]=(0,i.useState)(!0);return(0,i.useEffect)(()=>{if(100===t){let e=setTimeout(()=>s(!1),500);return()=>clearTimeout(e)}},[t]),(0,o.jsxs)(o.Fragment,{children:[l&&(0,o.jsx)(a.Z,{}),(0,o.jsx)(e,{...r})]})}},9836:function(e,r,t){"use strict";var o=t(7437),i=t(2265),n=t(9376);t(3193),r.Z=()=>{let[e,r]=(0,i.useState)(!1),t=(0,n.useRouter)(),a=()=>{r(!1),t.push("/")};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"bg-black bg-opacity-50 fixed top-10 left-6 z-50 p-2 rounded-full volver",children:(0,o.jsx)("button",{className:" text-white",onClick:a,children:"Volver"})}),e&&(0,o.jsx)("div",{className:"modal-overlay",children:(0,o.jsxs)("div",{className:"modal-content",children:[(0,o.jsx)("p",{children:"\xbfSeguro que quieres volver al inicio?"}),(0,o.jsx)("button",{className:"confirm-button",onClick:a,children:"Salir"}),(0,o.jsx)("button",{className:"cancel-button",onClick:()=>r(!1),children:"Cancelar"})]})})]})}},8451:function(e,r,t){"use strict";var o=t(7437),i=t(9376);t(5015);var n=t(8516);r.Z=e=>{let{title:r}=e,t=(0,i.useRouter)();return(0,o.jsxs)("div",{onClick:()=>{t.push("/")},className:"contenedor-logon",style:{display:"flex",alignItems:"center",position:"fixed",top:"20px",transform:"translateX(-45%)",zIndex:1e3,padding:"10px",cursor:"pointer",fontFamily:"'Sora', sans-serif"},children:[(0,o.jsx)("img",{src:(0,n.p)("img/logos/Alvearium_logo-whitepeq.png"),alt:"Logo",style:{marginTop:"-1rem"},className:"logo"}),r&&(0,o.jsx)("span",{className:"tituloi",style:{marginLeft:"10px",color:"#fff"},children:r})]})}},9873:function(e,r,t){"use strict";var o=t(7437),i=t(2265);t(7037);var n=t(8516);r.Z=e=>{let{isMenuOpen:r}=e,[t,a]=(0,i.useState)(!1),l=(0,i.useRef)(null);return(0,i.useEffect)(()=>{l.current&&(l.current.loop=!0,l.current.volume=.3)},[]),(0,i.useEffect)(()=>{t?(console.log("Sonido activado"),l.current&&l.current.play()):(console.log("Sonido desactivado"),l.current&&(l.current.pause(),l.current.currentTime=0))},[t]),(0,o.jsxs)("div",{id:"bloque-sonido",onClick:()=>{a(e=>!e)},style:{opacity:r?0:1,transition:"opacity 0.3s ease",pointerEvents:r?"none":"auto"},children:[(0,o.jsx)("div",{id:"sonido",children:(0,o.jsx)("p",{children:"Sonido"})}),(0,o.jsxs)("div",{id:"cuadro",className:t?"activo":"inactivo",children:[(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"}),(0,o.jsx)("div",{className:"barra"})]}),(0,o.jsx)("audio",{ref:l,src:(0,n.p)("audio/Sea Waves - Sound Effect.mp3")})]})}},8516:function(e,r,t){"use strict";t.d(r,{p:function(){return o}});let o=e=>"".concat("/JaneStyle/dev","/").concat(e).replace(/\/+/g,"/")},3193:function(){},5015:function(){},7037:function(){},3599:function(e){e.exports={container:"Loader_container__IKaco",logoContainer:"Loader_logoContainer__mp4Vc",logoWhite:"Loader_logoWhite__HV87R",logoColor:"Loader_logoColor__8OTrc",waveReveal:"Loader_waveReveal__y6laM"}},4752:function(e,r,t){"use strict";t.d(r,{B:function(){return n}});var o=t(2079),i=t(1448);class n extends o.Kj0{constructor(e,r={}){super(e),this.isWater=!0;let t=this,n=void 0!==r.textureWidth?r.textureWidth:512,a=void 0!==r.textureHeight?r.textureHeight:512,l=void 0!==r.clipBias?r.clipBias:0,s=void 0!==r.alpha?r.alpha:1,u=void 0!==r.time?r.time:0,c=void 0!==r.waterNormals?r.waterNormals:null,d=void 0!==r.sunDirection?r.sunDirection:new o.Pa4(.70707,.70707,0),m=new o.Ilk(void 0!==r.sunColor?r.sunColor:16777215),f=new o.Ilk(void 0!==r.waterColor?r.waterColor:8355711),v=void 0!==r.eye?r.eye:new o.Pa4(0,0,0),p=void 0!==r.distortionScale?r.distortionScale:20,x=void 0!==r.side?r.side:o.Wl3,g=void 0!==r.fog&&r.fog,h=new o.JOQ,w=new o.Pa4,y=new o.Pa4,S=new o.Pa4,_=new o.yGw,j=new o.Pa4(0,0,-1),C=new o.Ltg,b=new o.Pa4,N=new o.Pa4,P=new o.Ltg,M=new o.yGw,L=new o.cPb,z=new o.dd2(n,a),D={name:"MirrorShader",uniforms:o.rDY.merge([i.UniformsLib.fog,i.UniformsLib.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new o.yGw},sunColor:{value:new o.Ilk(8355711)},sunDirection:{value:new o.Pa4(.70707,.70707,0)},eye:{value:new o.Pa4},waterColor:{value:new o.Ilk(5592405)}}]),vertexShader:`
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
				}`},k=new o.jyz({name:D.name,uniforms:o.rDY.clone(D.uniforms),vertexShader:D.vertexShader,fragmentShader:D.fragmentShader,lights:!0,side:x,fog:g});k.uniforms.mirrorSampler.value=z.texture,k.uniforms.textureMatrix.value=M,k.uniforms.alpha.value=s,k.uniforms.time.value=u,k.uniforms.normalSampler.value=c,k.uniforms.sunColor.value=m,k.uniforms.waterColor.value=f,k.uniforms.sunDirection.value=d,k.uniforms.distortionScale.value=p,k.uniforms.eye.value=v,t.material=k,t.onBeforeRender=function(e,r,o){if(y.setFromMatrixPosition(t.matrixWorld),S.setFromMatrixPosition(o.matrixWorld),_.extractRotation(t.matrixWorld),w.set(0,0,1),w.applyMatrix4(_),b.subVectors(y,S),b.dot(w)>0)return;b.reflect(w).negate(),b.add(y),_.extractRotation(o.matrixWorld),j.set(0,0,-1),j.applyMatrix4(_),j.add(S),N.subVectors(y,j),N.reflect(w).negate(),N.add(y),L.position.copy(b),L.up.set(0,1,0),L.up.applyMatrix4(_),L.up.reflect(w),L.lookAt(N),L.far=o.far,L.updateMatrixWorld(),L.projectionMatrix.copy(o.projectionMatrix),M.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),M.multiply(L.projectionMatrix),M.multiply(L.matrixWorldInverse),h.setFromNormalAndCoplanarPoint(w,y),h.applyMatrix4(L.matrixWorldInverse),C.set(h.normal.x,h.normal.y,h.normal.z,h.constant);let i=L.projectionMatrix;P.x=(Math.sign(C.x)+i.elements[8])/i.elements[0],P.y=(Math.sign(C.y)+i.elements[9])/i.elements[5],P.z=-1,P.w=(1+i.elements[10])/i.elements[14],C.multiplyScalar(2/C.dot(P)),i.elements[2]=C.x,i.elements[6]=C.y,i.elements[10]=C.z+1-l,i.elements[14]=C.w,v.setFromMatrixPosition(o.matrixWorld);let n=e.getRenderTarget(),a=e.xr.enabled,s=e.shadowMap.autoUpdate;t.visible=!1,e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(z),e.state.buffers.depth.setMask(!0),!1===e.autoClear&&e.clear(),e.render(r,L),t.visible=!0,e.xr.enabled=a,e.shadowMap.autoUpdate=s,e.setRenderTarget(n);let u=o.viewport;void 0!==u&&e.state.viewport(u)}}}}},function(e){e.O(0,[6937,535,9197,5336,5870,6689,5878,4687,2971,2117,1744],function(){return e(e.s=5463)}),_N_E=e.O()}]);