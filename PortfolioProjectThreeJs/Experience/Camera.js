
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
        this.createOrthographicCmaera();

        console.log(this.experience,this.sizes,this.scene,this.canvas);
    }

    createPerspectiveCamera(){
        perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
            this.scene.add(perspectiveCamera);
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
}