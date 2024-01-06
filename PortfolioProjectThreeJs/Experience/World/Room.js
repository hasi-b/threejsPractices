
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import gsap from "gsap";
export default class Room{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
       
       this.resources = this.experience.resources;

       this.room = this.resources.items.hasibRoom;
       this.actualRoom = this.room.scene;
      
       this.lerp={
         current:0,
         target:0,
         ease:0.1,
     }
     this.setModel();
     this.OnMouseMove();
       
  
    }


   OnMouseMove(){
      window.addEventListener("mousemove",(e)=>{
  
         this.rotation = ((e.clientX-window.innerWidth/2)*2)/window.innerWidth;
         this.lerp.target = this.rotation*0.05;

      });


   }

   setModel(){
       
        this.actualRoom.children.forEach(child => {
             child.castShadow = true;
             child.receiveShadow = true;
             
             if(child instanceof THREE.Group){
                child.children.forEach(groupChild=>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
             }
             if(child.name ==='Fish_Tank'){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness =0.1;
                child.material.color.set(0xffffff);
                child.material.ior =3;
                child.material.transmission =1;
                child.material.opacity =1;
               //  child.material.reflectivity = 0.2;
               //  child.material.refractionRatio = 0.2;
             }
             if(child.name ==='Pillow'){
                child.castShadow = false;
             }
             if(child.name==='Monitor_Screen002'){
                  child.material = new THREE.MeshBasicMaterial({
                     map:this.resources.items.video,
                  });
                  child.castShadow= false;
             }
             if(child.name==='Monitor_2001'){
               child.material = new THREE.MeshBasicMaterial({
                  map:this.resources.items.video2,
               });
               child.castShadow= false;
             }
             if(child.name ==='Batman_Light'){
               child.material = new THREE.MeshStandardMaterial({
                  color: 0x5A5A5A,
                  
                  emissiveIntensity: 100, // Adjust the intensity as needed
                });
                
               
             }
            
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.06,0.06,0.06);
        this.actualRoom.position.set(-.07,-1,0);
        this.actualRoom.rotation.y = Math.PI*2;
   }

    resize(){
       
    }

    update(){
      this.lerp.current = gsap.utils.interpolate(
         this.lerp.current,
         this.lerp.target,
         this.lerp.ease
     );

this.actualRoom.rotation.y = this.lerp.current;

    }

   
}