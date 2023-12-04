
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";

export default class Room{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
       
       this.resources = this.experience.resources;

       this.room = this.resources.items.hasibRoom;
       this.actualRoom = this.room.scene;
       this.setModel();
       

       
  
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
             }
             if(child.name==='Monitor_2001'){
               child.material = new THREE.MeshBasicMaterial({
                  map:this.resources.items.video2,
               });
             }
             if(child.name ==='Batman_Light'){
               child.material = new THREE.MeshStandardMaterial({
                  color: 0x00ff00,
                  emissive: 0x00ff00,
                  emissiveIntensity: 100, // Adjust the intensity as needed
                });
                
               
             }
            
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.09,0.09,0.09);
        this.actualRoom.position.set(0,-1,0);
        this.actualRoom.rotation.y = Math.PI*2;
   }

    resize(){
       
    }

    update(){
     
    }

   
}