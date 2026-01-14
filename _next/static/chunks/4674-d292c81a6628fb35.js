"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4674],{3632:function(e,t,r){r.d(t,{S:function(){return a}}),r(2265);var o=r(2079),i=r(9148);let n=0,a=(0,i.Z)(e=>(o.tEQ.onStart=(t,r,o)=>{e({active:!0,item:t,loaded:r,total:o,progress:(r-n)/(o-n)*100})},o.tEQ.onLoad=()=>{e({active:!1})},o.tEQ.onError=t=>e(e=>({errors:[...e.errors,t]})),o.tEQ.onProgress=(t,r,o)=>{r===o&&(n=o),e({active:!0,item:t,loaded:r,total:o,progress:(r-n)/(o-n)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0}))},8328:function(e,t,r){let o,i;r.d(t,{V:function(){return y}});var n=r(1119),a=r(2265),l=r(4040),s=r(2079),c=r(2624);let u=new s.Pa4,d=new s.Pa4,m=new s.Pa4,f=new s.FM8;function v(e,t,r){let o=u.setFromMatrixPosition(e.matrixWorld);o.project(t);let i=r.width/2,n=r.height/2;return[o.x*i+i,-(o.y*n)+n]}let p=e=>1e-10>Math.abs(e)?0:e;function x(e,t,r=""){let o="matrix3d(";for(let r=0;16!==r;r++)o+=p(t[r]*e.elements[r])+(15!==r?",":")");return r+o}let h=(o=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>x(e,o)),g=(i=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>x(e,i(t),"translate(-50%,-50%)")),y=a.forwardRef(({children:e,eps:t=.001,style:r,className:o,prepend:i,center:x,fullscreen:y,portal:w,distanceFactor:M,sprite:P=!1,transform:b=!1,occlude:S,onOcclude:_,castShadow:C,receiveShadow:W,material:E,geometry:z,zIndexRange:D=[16777271,0],calculatePosition:R=v,as:L="div",wrapperClass:N,pointerEvents:k="auto",...j},F)=>{let{gl:I,camera:$,scene:T,size:A,raycaster:G,events:H,viewport:V}=(0,c.D)(),[O]=a.useState(()=>document.createElement(L)),Q=a.useRef(),U=a.useRef(null),B=a.useRef(0),K=a.useRef([0,0]),Z=a.useRef(null),J=a.useRef(null),Y=(null==w?void 0:w.current)||H.connected||I.domElement.parentNode,q=a.useRef(null),X=a.useRef(!1),ee=a.useMemo(()=>{var e;return S&&"blending"!==S||Array.isArray(S)&&S.length&&(e=S[0])&&"object"==typeof e&&"current"in e},[S]);a.useLayoutEffect(()=>{let e=I.domElement;S&&"blending"===S?(e.style.zIndex=`${Math.floor(D[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[S]),a.useLayoutEffect(()=>{if(U.current){let e=Q.current=l.createRoot(O);if(T.updateMatrixWorld(),b)O.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=R(U.current,$,A);O.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Y&&(i?Y.prepend(O):Y.appendChild(O)),()=>{Y&&Y.removeChild(O),e.unmount()}}},[Y,b]),a.useLayoutEffect(()=>{N&&(O.className=N)},[N]);let et=a.useMemo(()=>b?{position:"absolute",top:0,left:0,width:A.width,height:A.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:x?"translate3d(-50%,-50%,0)":"none",...y&&{top:-A.height/2,left:-A.width/2,width:A.width,height:A.height},...r},[r,x,y,A,b]),er=a.useMemo(()=>({position:"absolute",pointerEvents:k}),[k]);a.useLayoutEffect(()=>{var t,i;X.current=!1,b?null==(t=Q.current)||t.render(a.createElement("div",{ref:Z,style:et},a.createElement("div",{ref:J,style:er},a.createElement("div",{ref:F,className:o,style:r,children:e})))):null==(i=Q.current)||i.render(a.createElement("div",{ref:F,style:et,className:o,children:e}))});let eo=a.useRef(!0);(0,c.F)(e=>{if(U.current){$.updateMatrixWorld(),U.current.updateWorldMatrix(!0,!1);let e=b?K.current:R(U.current,$,A);if(b||Math.abs(B.current-$.zoom)>t||Math.abs(K.current[0]-e[0])>t||Math.abs(K.current[1]-e[1])>t){let t=function(e,t){let r=u.setFromMatrixPosition(e.matrixWorld),o=d.setFromMatrixPosition(t.matrixWorld),i=r.sub(o),n=t.getWorldDirection(m);return i.angleTo(n)>Math.PI/2}(U.current,$),r=!1;ee&&(Array.isArray(S)?r=S.map(e=>e.current):"blending"!==S&&(r=[T]));let o=eo.current;if(r){let e=function(e,t,r,o){let i=u.setFromMatrixPosition(e.matrixWorld),n=i.clone();n.project(t),f.set(n.x,n.y),r.setFromCamera(f,t);let a=r.intersectObjects(o,!0);if(a.length){let e=a[0].distance;return i.distanceTo(r.ray.origin)<e}return!0}(U.current,$,G,r);eo.current=e&&!t}else eo.current=!t;o!==eo.current&&(_?_(!eo.current):O.style.display=eo.current?"block":"none");let i=Math.floor(D[0]/2),n=S?ee?[D[0],i]:[i-1,0]:D;if(O.style.zIndex=`${function(e,t,r){if(t instanceof s.cPb||t instanceof s.iKG){let o=u.setFromMatrixPosition(e.matrixWorld),i=d.setFromMatrixPosition(t.matrixWorld),n=o.distanceTo(i),a=(r[1]-r[0])/(t.far-t.near),l=r[1]-a*t.far;return Math.round(a*n+l)}}(U.current,$,n)}`,b){let[e,t]=[A.width/2,A.height/2],r=$.projectionMatrix.elements[5]*t,{isOrthographicCamera:o,top:i,left:n,bottom:a,right:l}=$,s=h($.matrixWorldInverse),c=o?`scale(${r})translate(${p(-(l+n)/2)}px,${p((i+a)/2)}px)`:`translateZ(${r}px)`,u=U.current.matrixWorld;P&&((u=$.matrixWorldInverse.clone().transpose().copyPosition(u).scale(U.current.scale)).elements[3]=u.elements[7]=u.elements[11]=0,u.elements[15]=1),O.style.width=A.width+"px",O.style.height=A.height+"px",O.style.perspective=o?"":`${r}px`,Z.current&&J.current&&(Z.current.style.transform=`${c}${s}translate(${e}px,${t}px)`,J.current.style.transform=g(u,1/((M||10)/400)))}else{let t=void 0===M?1:function(e,t){if(t instanceof s.iKG)return t.zoom;if(!(t instanceof s.cPb))return 1;{let r=u.setFromMatrixPosition(e.matrixWorld),o=d.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*r.distanceTo(o))}}(U.current,$)*M;O.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}K.current=e,B.current=$.zoom}}if(!ee&&q.current&&!X.current){if(b){if(Z.current){let e=Z.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=$;if(t||z)j.scale&&(Array.isArray(j.scale)?j.scale instanceof s.Pa4?q.current.scale.copy(j.scale.clone().divideScalar(1)):q.current.scale.set(1/j.scale[0],1/j.scale[1],1/j.scale[2]):q.current.scale.setScalar(1/j.scale));else{let t=(M||10)/400,r=e.clientWidth*t,o=e.clientHeight*t;q.current.scale.set(r,o,1)}X.current=!0}}}else{let t=O.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/V.factor,r=t.clientWidth*e,o=t.clientHeight*e;q.current.scale.set(r,o,1),X.current=!0}q.current.lookAt(e.camera.position)}}});let ei=a.useMemo(()=>({vertexShader:b?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[b]);return a.createElement("group",(0,n.Z)({},j,{ref:U}),S&&!ee&&a.createElement("mesh",{castShadow:C,receiveShadow:W,ref:q},z||a.createElement("planeGeometry",null),E||a.createElement("shaderMaterial",{side:s.ehD,vertexShader:ei.vertexShader,fragmentShader:ei.fragmentShader})))})},3145:function(e,t,r){r(8461)},9376:function(e,t,r){var o=r(5475);r.o(o,"useRouter")&&r.d(t,{useRouter:function(){return o.useRouter}})},8461:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return s},getImageProps:function(){return l}});let o=r(7043),i=r(5346),n=r(5878),a=o._(r(5084));function l(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/JaneStyle/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let s=n.Image},4752:function(e,t,r){r.d(t,{B:function(){return n}});var o=r(2079),i=r(1448);class n extends o.Kj0{constructor(e,t={}){super(e),this.isWater=!0;let r=this,n=void 0!==t.textureWidth?t.textureWidth:512,a=void 0!==t.textureHeight?t.textureHeight:512,l=void 0!==t.clipBias?t.clipBias:0,s=void 0!==t.alpha?t.alpha:1,c=void 0!==t.time?t.time:0,u=void 0!==t.waterNormals?t.waterNormals:null,d=void 0!==t.sunDirection?t.sunDirection:new o.Pa4(.70707,.70707,0),m=new o.Ilk(void 0!==t.sunColor?t.sunColor:16777215),f=new o.Ilk(void 0!==t.waterColor?t.waterColor:8355711),v=void 0!==t.eye?t.eye:new o.Pa4(0,0,0),p=void 0!==t.distortionScale?t.distortionScale:20,x=void 0!==t.side?t.side:o.Wl3,h=void 0!==t.fog&&t.fog,g=new o.JOQ,y=new o.Pa4,w=new o.Pa4,M=new o.Pa4,P=new o.yGw,b=new o.Pa4(0,0,-1),S=new o.Ltg,_=new o.Pa4,C=new o.Pa4,W=new o.Ltg,E=new o.yGw,z=new o.cPb,D=new o.dd2(n,a),R={name:"MirrorShader",uniforms:o.rDY.merge([i.UniformsLib.fog,i.UniformsLib.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new o.yGw},sunColor:{value:new o.Ilk(8355711)},sunDirection:{value:new o.Pa4(.70707,.70707,0)},eye:{value:new o.Pa4},waterColor:{value:new o.Ilk(5592405)}}]),vertexShader:`
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
				}`},L=new o.jyz({name:R.name,uniforms:o.rDY.clone(R.uniforms),vertexShader:R.vertexShader,fragmentShader:R.fragmentShader,lights:!0,side:x,fog:h});L.uniforms.mirrorSampler.value=D.texture,L.uniforms.textureMatrix.value=E,L.uniforms.alpha.value=s,L.uniforms.time.value=c,L.uniforms.normalSampler.value=u,L.uniforms.sunColor.value=m,L.uniforms.waterColor.value=f,L.uniforms.sunDirection.value=d,L.uniforms.distortionScale.value=p,L.uniforms.eye.value=v,r.material=L,r.onBeforeRender=function(e,t,o){if(w.setFromMatrixPosition(r.matrixWorld),M.setFromMatrixPosition(o.matrixWorld),P.extractRotation(r.matrixWorld),y.set(0,0,1),y.applyMatrix4(P),_.subVectors(w,M),_.dot(y)>0)return;_.reflect(y).negate(),_.add(w),P.extractRotation(o.matrixWorld),b.set(0,0,-1),b.applyMatrix4(P),b.add(M),C.subVectors(w,b),C.reflect(y).negate(),C.add(w),z.position.copy(_),z.up.set(0,1,0),z.up.applyMatrix4(P),z.up.reflect(y),z.lookAt(C),z.far=o.far,z.updateMatrixWorld(),z.projectionMatrix.copy(o.projectionMatrix),E.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),E.multiply(z.projectionMatrix),E.multiply(z.matrixWorldInverse),g.setFromNormalAndCoplanarPoint(y,w),g.applyMatrix4(z.matrixWorldInverse),S.set(g.normal.x,g.normal.y,g.normal.z,g.constant);let i=z.projectionMatrix;W.x=(Math.sign(S.x)+i.elements[8])/i.elements[0],W.y=(Math.sign(S.y)+i.elements[9])/i.elements[5],W.z=-1,W.w=(1+i.elements[10])/i.elements[14],S.multiplyScalar(2/S.dot(W)),i.elements[2]=S.x,i.elements[6]=S.y,i.elements[10]=S.z+1-l,i.elements[14]=S.w,v.setFromMatrixPosition(o.matrixWorld);let n=e.getRenderTarget(),a=e.xr.enabled,s=e.shadowMap.autoUpdate;r.visible=!1,e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(D),e.state.buffers.depth.setMask(!0),!1===e.autoClear&&e.clear(),e.render(t,z),r.visible=!0,e.xr.enabled=a,e.shadowMap.autoUpdate=s,e.setRenderTarget(n);let c=o.viewport;void 0!==c&&e.state.viewport(c)}}}}}]);