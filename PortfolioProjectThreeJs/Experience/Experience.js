import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Utils/Time";
import World from "./World/World";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import{EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";

export default class Experience{
    static instance;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        // this.renderScene = new RenderPass(this.scene,this.camera);
        // this.composer = new EffectComposer(this.renderer);
        // this.composer.addPass(this.renderScene);

        this.time.on("update",()=>{
            this.update();
        });

        this.sizes.on("resize",()=>{
        this.resize();
        });

    }

    resize(){
        
        this.camera.resize();
        this.renderer.resize();
        
    }
    
    update(){

        this.camera.update();
        this.renderer.update();
        
        
    }

    resize(){

    }

}