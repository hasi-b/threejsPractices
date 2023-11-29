
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();

      
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
            this.scene.add(this.perspectiveCamera);
            this.perspectiveCamera.position.z = 5;
    }

    createOrthographicCamera(){
        this.frustrum = 5;
        this.orthograpchicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect*this.sizes.frustrum)/2,
            (this.sizes.aspect*this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100);
            this.scene.add(this.orthograpchicCamera);
            //helper code
            const size =10;
            const divisions =10;
            const gridHelper = new THREE.GridHelper(size,divisions);
            this.scene.add(gridHelper);
            const axesHelper = new THREE.AxesHelper(10);
            this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas);
        this.controls.enableDamping =true;
        this.controls.enableZoom =true;


    }
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        this.orthograpchicCamera.left = (-this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthograpchicCamera.right = (this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthograpchicCamera.top =   this.sizes.frustrum/2;
        this.orthograpchicCamera.bottom =  -this.sizes.frustrum/2;
        this.orthograpchicCamera.updateProjectionMatrix();
    }

    update(){
       this.controls.update();
    }
}