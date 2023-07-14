import * as THREE from 'three';
import { Scene } from 'three';

//Creating Scene
const scene = new THREE.Scene();

//Creating Sphere

const geometry = new THREE.SphereGeometry(3,64,64);

const material = new THREE.MeshStandardMaterial({
  color : "#FFA500",
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
//Light
const light = new THREE.PointLight(0xffffff,1,100);
light.position.set(-10,10,10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45,800/600);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(800,600);
renderer.render(scene,camera);