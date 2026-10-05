import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {GLTFLoader} from './vendor/GLTFLoader.js';

const $=id=>document.getElementById(id);
const views=[
 ['sleeve_iso','Full sensor sleeve','01','Fingers to shoulder · one right arm','One sleeve, coordinated sensing','Five finger IMUs plus hand, forearm, upper-arm and shoulder sensors. Five finger motors plus wrist, elbow and shoulder cues. The palm and fingertips remain uncovered.'],
 ['hand','Hand close-up','02','Open palm · five finger channels','Feel the craft directly','Separate finger motion pods and vibration pods connect to the back-of-hand board. View the palm side by dragging underneath the hand.'],
 ['ring_exploded','Finger sensor · exploded','03','Housing: 13 × 11 × 4.4 mm, excluding strap lugs','Inside the motion-sensing ring','A BMI270 inertial sensor sits on a 10 × 8 mm board. The concave base, cable notch and strap slots come directly from the CAD design.'],
 ['motor_exploded','Haptic pod · exploded','04','Housing: Ø12 × 5.2 mm, excluding strap lugs','A small cue, at the right finger','An 8 × 3.3 mm linear resonant actuator sits inside the pod. The exploded spacing separates parts for inspection; it is not the assembled size.'],
 ['hand_exploded','Hand board · exploded','05','Housing: 42 × 32 × 8 mm','Five fingers, one local board','The back-of-hand board contains a BMI270, an I²C switch and five DRV2605L haptic drivers. Connections lead to each finger and the forearm hub.'],
 ['hub_exploded','Forearm hub · exploded','06','Housing: 62 × 44 × 16.4 mm, excluding strap loops','Control, recording and power','ESP32-S3 module, microSD, battery, charger and arm-channel electronics. These are design components, not a tested assembled circuit.'],
 ['tabla_iso','Tabla sensor kit','07','Flagship · two shell-mounted pickups','Connect movement to sound','Two piezo pickups and a base unit are designed to capture drum-stroke timing and strength. The 140 mm dayan and 229 mm bayan heads follow the repository geometry.'],
 ['puppet_iso','Kathputli kit','08','Generalisation demo · strings and finger rings','Follow the gesture','Finger rings sense the puppeteer; a torso-mounted sensor tracks puppet movement. Body shapes and strings are illustrative CAD.'],
 ['loom_iso','Handloom kit','09','Generalisation demo · a two-treadle loom','Capture a complete weaving cycle','Beater motion, treadle switches and an overhead phone camera provide the planned tool signals. The loom frame is a stylised installation model.']
];
const renderer=new THREE.WebGLRenderer({canvas:$('canvas'),antialias:true,preserveDrawingBuffer:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.8;
const scene=new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xe7f4ff,0x56533b,.9));
const key=new THREE.DirectionalLight(0xffedce,2);key.position.set(1,2,3);scene.add(key);
const rim=new THREE.DirectionalLight(0x9bcee0,.7);rim.position.set(-2,1,-2);scene.add(rim);
const camera=new THREE.PerspectiveCamera(35,1,.001,100);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.autoRotateSpeed=.8;
const loader=new GLTFLoader(),cache=new Map(),raycaster=new THREE.Raycaster();
let current=null,view=views[0],request=0,manifest={},showLabels=false,labelItems=[];
fetch('./models/manifest.json').then(r=>r.json()).then(x=>manifest=x).catch(()=>{});
function size(){const r=$('stage').getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();if(current)home();}
new ResizeObserver(size).observe($('stage'));
function home(){
 let box=new THREE.Box3().setFromObject(current),center=box.getCenter(new THREE.Vector3()),extent=box.getSize(new THREE.Vector3());
 if(view[0]==='hand'){center.set(.65,.006,0);extent.set(.25,.15,.20);}
 const close=view[0]==='hand'||view[0]==='sleeve_iso';
 const radius=extent.length()/2, distance=radius/Math.sin(THREE.MathUtils.degToRad(camera.fov/2))*(close?1.13:1.3)/Math.min(camera.aspect,close?1.5:1);
 let dir=view[0].includes('sleeve')||view[0]==='hand'?new THREE.Vector3(-.25,.8,1.3):new THREE.Vector3(1,.7,1.5);
 camera.position.copy(center).add(dir.normalize().multiplyScalar(distance));controls.target.copy(center);controls.minDistance=radius*.25;controls.maxDistance=radius*15;camera.near=Math.max(.0001,radius/100);camera.far=radius*100;camera.updateProjectionMatrix();controls.update();
}
function labels(){ $('labels').replaceChildren();labelItems=[];const source=manifest[view[0]==='hand'?'sleeve_iso':view[0]];
 Object.entries(source?.anchors||{}).filter(([n,p])=>view[0]!=='hand'||p[0]>.50).forEach(([n,p])=>{const el=document.createElement('div');el.className='label';el.textContent=n.replaceAll('\n',' ');$('labels').append(el);labelItems.push([el,new THREE.Vector3(...p)]);});
}
async function select(v){
 view=v;const ticket=++request,key=v[0]==='hand'?'sleeve_iso':v[0];$('loading').hidden=false;$('loading').textContent='Loading CAD geometry…';$('loading').classList.remove('error');
 $('title').textContent=v[1];$('subtitle').textContent=v[3];$('detailTitle').textContent=v[4];$('detail').textContent=v[5];$('selected').textContent='Click a component to inspect its name.';
 [...$('nav').children].forEach((b,i)=>b.classList.toggle('active',views[i]===v));$('download').href=`models/${key}.glb`;
 try{let model=cache.get(key);if(!model){model=(await loader.loadAsync(`models/${key}.glb`)).scene;cache.set(key,model);}if(ticket!==request)return;
 if(current)scene.remove(current);current=model;scene.add(current);home();labels();$('loading').hidden=true;window.viewerState={view:v[0],meshes:0};current.traverse(o=>{if(o.isMesh)window.viewerState.meshes++;});
 }catch(e){if(ticket!==request)return;$('loading').textContent='Could not load model. Open through the local server; see START_HERE.md.';$('loading').classList.add('error');console.error(e);}
}
views.forEach(v=>{const b=document.createElement('button');b.innerHTML=`${v[1]}<span>${v[2]}</span>`;b.onclick=()=>select(v);$('nav').append(b);});
$('reset').onclick=()=>current&&home();$('rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('rotate').textContent=`Auto-rotate: ${controls.autoRotate?'on':'off'}`;};
$('labelToggle').onclick=()=>{showLabels=!showLabels;labels();$('labelToggle').textContent=`Labels: ${showLabels?'on':'off'}`;};
$('snapshot').onclick=()=>{renderer.render(scene,camera);const out=document.createElement('canvas');out.width=renderer.domElement.width;out.height=renderer.domElement.height;const ctx=out.getContext('2d');ctx.fillStyle='#172427';ctx.fillRect(0,0,out.width,out.height);ctx.drawImage(renderer.domElement,0,0);ctx.fillStyle='#efddad';ctx.font=`${Math.max(18,out.width/55)}px Segoe UI`;ctx.fillText('PARAMPARA · '+view[1],25,40);ctx.fillStyle='#c3cece';ctx.font=`${Math.max(13,out.width/90)}px Segoe UI`;ctx.fillText('CAD design visualisation · Physical prototype not yet validated',25,out.height-25);const a=document.createElement('a');a.download=`PARAMPARA-${view[0]}.png`;a.href=out.toDataURL('image/png');a.click();};
let pointerDown;
renderer.domElement.addEventListener('pointerdown',e=>pointerDown=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{if(!current||!pointerDown||Math.hypot(e.clientX-pointerDown[0],e.clientY-pointerDown[1])>5)return;const r=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=raycaster.intersectObject(current,true)[0];if(hit)$('selected').textContent='Selected: '+hit.object.name.replace(/^\d+_/,'').replaceAll('_',' ');});
function frame(){requestAnimationFrame(frame);controls.update();renderer.render(scene,camera);const used=[];for(const [el,pos]of labelItems){const p=pos.clone().project(camera);el.hidden=!showLabels||p.z>1||p.z< -1||Math.abs(p.x)>.8||Math.abs(p.y)>.65;el.style.left=(p.x*.5+.5)*$('stage').clientWidth+'px';el.style.top=(-p.y*.5+.5)*$('stage').clientHeight+'px';if(!el.hidden){const r=el.getBoundingClientRect();if(used.some(q=>r.left<q.right+8&&r.right>q.left-8&&r.top<q.bottom+8&&r.bottom>q.top-8))el.hidden=true;else used.push(r);}}}
size();select(views[0]);frame();
