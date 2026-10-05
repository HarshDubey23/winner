import * as THREE from 'three';
import {OrbitControls} from '../showcase/vendor/OrbitControls.js';
import {GLTFLoader} from '../showcase/vendor/GLTFLoader.js';
const $=id=>document.getElementById(id);
const trace=(await (await fetch('./results/teaching-trace.json')).json()).cycles;
const renderer=new THREE.WebGLRenderer({canvas:$('canvas'),antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x0a1826);renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();scene.add(new THREE.HemisphereLight(0xe7f4ff,0x35382d,1.5));const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(1,2,3);scene.add(key);
const camera=new THREE.PerspectiveCamera(35,1,.001,20);camera.position.set(.33,.65,1.05);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(.38,.025,0);controls.enableDamping=true;controls.autoRotate=true;controls.autoRotateSpeed=.35;
const model=await new GLTFLoader().loadAsync('../showcase/models/sleeve_iso.glb');scene.add(model.scene);
$('modelStatus').textContent='Drag to orbit · scroll to zoom · amber markers show commands';
const manifest=await (await fetch('../showcase/models/manifest.json')).json();const anchors=manifest.sleeve_iso.anchors;
const markers=[];for(const [name,pos] of Object.entries(anchors)){if(!name.includes('motor'))continue;const material=new THREE.MeshBasicMaterial({color:0xffb854,transparent:true,opacity:.25});const m=new THREE.Mesh(new THREE.SphereGeometry(.009,16,12),material);m.position.fromArray(pos);m.position.y+=.01;scene.add(m);markers.push(m)}
// These markers are representative command indicators, not an actuator deformation model.
function resize(){const r=$('canvas').parentElement.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()};new ResizeObserver(resize).observe($('canvas').parentElement);resize();
const beatEls=Array.from({length:16},(_,i)=>{const el=document.createElement('div');el.className='beat';el.textContent=i+1;$('beats').append(el);return el});
let cycle=0,phase=0,playing=true,last=performance.now();
function eligible(g,i){return g>=.75||(g>=.5&&i%2===0)||(g>=.25&&i%4===0)||(g>.02&&i===0)}
function update(){const r=trace[cycle];$('mode').textContent=r.check?'CHECK — cues off':'PRACTICE — fading guidance';$('cycle').textContent=cycle;$('cycleLabel').textContent=cycle;$('score').textContent=r.inputScore.toFixed(2);$('guidance').textContent=`Guidance ${r.guidanceBefore.toFixed(2)} → ${r.guidanceAfter.toFixed(2)} · ${r.cueCount} cues / 16`;$('fill').style.width=r.guidanceBefore*100+'%';$('scrub').value=cycle;const upcoming=Math.floor((phase+.12)/.5)%16;const lead=upcoming*.5-phase;const on=!r.check&&lead<=.12&&lead>.08&&eligible(r.guidanceBefore,upcoming);beatEls.forEach((el,i)=>{el.classList.toggle('cue',!r.check&&eligible(r.guidanceBefore,i));el.classList.toggle('active',i===Math.floor(phase/.5))});for(const m of markers){m.material.opacity=on?1:.12;m.scale.setScalar(on?1.7:1)}}
$('play').onclick=()=>{playing=!playing;$('play').textContent=playing?'Pause replay':'Play replay'};$('reset').onclick=()=>{cycle=0;phase=0;update()};$('scrub').oninput=e=>{cycle=+e.target.value;phase=0;playing=false;$('play').textContent='Play replay';update()};
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(playing){phase+=dt*4;if(phase>=8){phase-=8;cycle=(cycle+1)%trace.length}}update();controls.update();renderer.render(scene,camera);requestAnimationFrame(frame)}requestAnimationFrame(frame);
