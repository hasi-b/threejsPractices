import './style.css'
import './style.css'
import * as THREE from 'three'


//Scene
const scene = new THREE.Scene();

//Red Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'red'});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);
//variable

const sizes = {
    width: 800,
    height: 600
};
//camera

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = 3;
scene.add(camera);

//renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height);

renderer.render(scene,camera);
