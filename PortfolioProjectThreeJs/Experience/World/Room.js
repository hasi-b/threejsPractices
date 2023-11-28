
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
        this.scene.add(this.actualRoom);
   }

    resize(){
       
    }

    update(){
     
    }

   
}