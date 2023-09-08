import * as THREE from 'three';
import "./style.css"
import { Scene } from 'three';
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';


//Creating Scene
const scene = new THREE.Scene();

//Creating Sphere

const geometry = new THREE.SphereGeometry(3,64,64);

const material = new THREE.MeshStandardMaterial({
  color : "#FFA500",
  
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

mesh.position.y-=2;
//Sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight,
}


//Light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(10,20,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100);
camera.position.z = 20;
scene.add(camera);












//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);//for making the edges smoooth
renderer.render(scene,camera);

//Controls

const controls = new OrbitControls(camera,canvas);
controls.enableDamping =true;
controls.enablePan =false; //disables moving the camera
controls.enableZoom = false;
controls.autoRotate =true;
controls.autoRotateSpeed = 6;


//Resize
window.addEventListener('resize',()=>{
//Updating sizes
  sizes.width= window.innerWidth;
  sizes.height = window.innerHeight;
  //Update Camera
  
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height);
})

const loop = ()=>{



  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);

}
loop();

//timeline

const timeline= gsap.timeline({defaults:{duration:1}});
timeline.fromTo(mesh.scale,{x:0,y:0,z:0},{x:1,y:1,z:1});
timeline.fromTo("nav",{y:'-100%'},{y:'0%'});
timeline.fromTo(".title",{opacity:0},{opacity:1});

//Change Color on mouse animation 

let mouseDown = false;
let rgb=[];
window.addEventListener('mousedown',()=>{
mouseDown= true;

});
window.addEventListener('mouseup',()=>{
  mouseDown=false;
});

window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
     rgb = [ Math.round((e.pageX/sizes.width)*255),Math.round((e.pageX/sizes.width)*255),150];
  }
  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
  gsap.to(mesh.material.color,{r: newColor.r,g:newColor.g,b:newColor.b});
})