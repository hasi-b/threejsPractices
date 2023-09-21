
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import * as THREE from "three";
export default class Camera{

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();

        console.log(this.experience,this.sizes,this.scene,this.canvas);
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
            this.scene.add(this.perspectiveCamera);
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
        
    }
}