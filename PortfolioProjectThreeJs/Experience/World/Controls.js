
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import gsap from "gsap";

export default class Controls{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.progress =0;
        this.dummyCurve = new THREE.Vector3(0,0,0);
        this.lerp={
            current:0,
            target:0,
            ease:0.1,
        }
        this.position = new THREE.Vector3(0,0,0);
        this.setPath();
       
        this.onWheel();
  
    }

    setPath(){
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ],true );
        
    
   



        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }
   

    onWheel(){
        window.addEventListener("wheel",(e)=>{
            if(e.deltaY>0){
                this.lerp.target+=0.1;
            }
            else{
                this.lerp.target-=0.1;
                
                
            }

        });

        
    }

    resize(){
       
    }

    update(){

        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
            this.lerp.target= gsap.utils.clamp(0,1,this.lerp.target);
            this.lerp.current= gsap.utils.clamp(0,1,this.lerp.current);
            this.curve.getPointAt(this.lerp.current,this.position);
        //this.progress+=0.001;
        
        this.camera.orthograpchicCamera.position.copy(this.position);
    }

   
}