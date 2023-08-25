import * as THREE from 'three';
import "./style.css"
import { Scene } from 'three';
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


//Creating Scene
const scene = new THREE.Scene();

//Creating Sphere

const geometry = new THREE.SphereGeometry(3,64,64);

const material = new THREE.MeshStandardMaterial({
  color : "#FFA500",
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


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


//Controls

const controls = new OrbitControls(camera,canvas);









//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.render(scene,camera);

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



  
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);

}
loop();

