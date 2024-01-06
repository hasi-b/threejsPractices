
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default class Controls{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
      
        this.room = this.experience.world.room.actualRoom;
        
        gsap.registerPlugin(ScrollTrigger);
        this.setPath();
        // this.progress =0;
        // this.dummyCurve = new THREE.Vector3(0,0,0);
       
        // this.position = new THREE.Vector3(0,0,0);
        // this.lookAtPosition = new THREE.Vector3(0,0,0);
        // this.directionalVector = new THREE.Vector3(0,0,0);
        // this.staticVector = new THREE.Vector3(0,-1,0);
        // this.crossVector = new THREE.Vector3(0,0,0);

        // this.setPath();
        
        // this.onWheel();
  
    }

    // setPath(){
    //     this.curve = new THREE.CatmullRomCurve3( [
    //         //new THREE.Vector3( -10, 0, 10 ),
    //         new THREE.Vector3( -5, 0, 0 ),
    //         new THREE.Vector3( 0, 0, -5 ),
    //         new THREE.Vector3( 5, 0, 0 ),
    //         new THREE.Vector3( 0, 0, 5 )
    //     ],true );
        
    
   
       

    //     const points = this.curve.getPoints( 50 );
    //     const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
    //     const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
    //     // Create the final object to add to the scene
    //     const curveObject = new THREE.Line( geometry, material );
    //     this.scene.add(curveObject);
    // }
   
    setPath(){
            this.timeline = new gsap.timeline();
            this.timeline.to(this.room.position,{
                x:()=>{return this.sizes.width*0.0012} ,
                scrollTrigger:{
                    trigger:".first-move",
                    markers:true,
                    start:"top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh:true
                }
            });
            
           

    }
    onWheel(){
        window.addEventListener("wheel",(e)=>{
            if(e.deltaY>0){
                this.lerp.target+=0.01;
               
            }
            else{
                this.lerp.target-=0.01;
                
                
            }

        });

        
    }

    resize(){
       
    }

    update(){

       
        
        // this.curve.getPointAt( (this.lerp.current % 1 + 1) % 1,this.position);
        // this.camera.orthograpchicCamera.position.copy(this.position);

        // this.directionalVector.subVectors(this.curve.getPointAt(( (this.lerp.current % 1 + 1) % 1)+0.000001),this.position);
        // this.directionalVector.normalize();
        // this.crossVector.crossVectors(this.directionalVector,this.staticVector);

        // this.crossVector.multiplyScalar(100000);

        // this.camera.orthograpchicCamera.lookAt(this.crossVector);

        
    }

   
}