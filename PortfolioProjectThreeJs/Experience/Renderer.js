
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import * as THREE from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";

import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export default class Renderer {

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();

        this.renderScene = new RenderPass(this.scene, this.camera.orthograpchicCamera);
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);

        this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), //resolution parameter
            this.scene,
            this.camera);
        this.outlinePass.edgeStrength = 20.0;
        this.outlinePass.edgeGlow = 1.0;
        this.outlinePass.edgeThickness = 20.0;
        this.outlinePass.pulsePeriod = 0;
        this.outlinePass.usePatternTexture = false; // patter texture for an object mesh
        this.outlinePass.visibleEdgeColor.set("#1abaff"); // set basic edge color
        this.outlinePass.hiddenEdgeColor.set("#1abaff"); // set edge color when it hidden by other objects
        this.composer.addPass(this.outlinePass);

        //shader
        this.effectFXAA = new ShaderPass(FXAAShader);
        this.effectFXAA.uniforms["resolution"].value.set(
            1 / window.innerWidth,
            1 / window.innerHeight
        );
        this.effectFXAA.renderToScreen = true;
        this.composer.addPass(this.effectFXAA);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.5,
            0.1,
            0.1
        );
        //this.composer.addPass(this.bloomPass);
        this.composer.renderToScreen = true;

        this.mixPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.composer.renderTarget2.texture }
                },
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent
            }), 'baseTexture'

        );


        this.finalComposer = new EffectComposer(this.renderer);
        this.finalComposer.addPass(this.renderScene);











    }



    nonBloomed(obj) {



        if (obj.isMesh && this.bloomLayer.test(obj.Layers) === false) {

            this.materials[obj.uuid] = obj.material;
            obj.material = this.darkMaterial;
        }


    }

    restoreMaterial(obj) {


        if (this.materials[obj.uuid]) {
            obj.material = this.materials[obj.uuid];
            delete this.materials[obj.uuid];
        }

    }



    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.composer.setSize(this.sizes.width, this.sizes.height);
        this.finalComposer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.composer.setPixelRatio(this.sizes.pixelRatio);
        this.finalComposer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {

        // this.renderer.setViewport(0,0,this.sizes.width,this.sizes.height);

        this.renderer.render(this.scene,this.camera.orthograpchicCamera);

        // this.scene.traverse(this.nonBloomed);
        //this.composer.render();
        // this.scene.traverse(this.restoreMaterial);
        //this.finalComposer.render();
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(this.sizes.width-this.sizes.width/3,this.sizes.height-this.sizes.height/3,this.sizes.width/3,this.sizes.height/3);
        // this.renderer.setScissor(this.sizes.width-this.sizes.width/3,this.sizes.height-this.sizes.height/3,this.sizes.width/3,this.sizes.height/3);
        // this.renderer.render(this.scene,this.camera.perspectiveCamera);
        // this.renderer.setScissorTest(false);

    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,

        });


        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

    }
}