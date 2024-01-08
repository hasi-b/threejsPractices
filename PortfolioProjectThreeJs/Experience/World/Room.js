
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import gsap from "gsap";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
export default class Room {

   constructor() {
      this.experience = new Experience();
      this.scene = this.experience.scene;

      this.resources = this.experience.resources;

      this.room = this.resources.items.hasibRoom;
      this.actualRoom = this.room.scene;
      this.roomChildren = {};
      this.setAudio();
      this.listener = new THREE.AudioListener();
      this.experience.camera.orthograpchicCamera.add(this.listener);
      this.audioLoader = new THREE.AudioLoader();
      this.batmanSound = new THREE.Audio(this.listener);


      this.lerp = {
         current: 0,
         target: 0,
         ease: 0.1,
      }
      this.light;

      this.setCube();
      this.setModel();
      this.OnMouseMove();
      this.setRaycast();


   }

   setAudio() {
      this.batman = "/models/Audio/Batman.mp3";
   }
   playAudio(audioFilePath) {
         this.audioLoader.load(audioFilePath, function (buffer) {
         this.batmanSound.setBuffer(buffer);
         this.batmanSound.setVolume(1);
         this.batmanSound.play();
        
      }.bind(this));
   }

   setRaycast() {
      const pointer = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      
      // window.addEventListener("mousemove",(event)=>{
      //    pointer.x = (event.clientX/window.innerWidth)*2 -1;
      //    pointer.y = -(event.clientY/window.innerHeight)*2+1;
      //    raycaster.setFromCamera(pointer,this.experience.camera.orthograpchicCamera);
      //    const intersects = raycaster.intersectObjects(this.scene.children);
      //    if(intersects.length>0){
      //      // this.experience.renderer.outlinePass.selectedObjects = intersects[0].object;

      //    }
      //    else{
      //          //this.experience.renderer.outlinePass.selectedObjects=[];
      //    }
      // });
      window.addEventListener("click", (event) => {
         pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
         pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
         raycaster.setFromCamera(pointer, this.experience.camera.orthograpchicCamera);
         const intersects = raycaster.intersectObjects(this.scene.children);
         if (intersects.length > 0) {
            console.log(intersects[0].object.name);
            if (intersects[0].object.name === "Batman-black" || intersects[0].object.name === "Batman_Light") {
               this.playAudio(this.batman);
            }
            if (intersects[0].object.name === "Poster_Frame_1" || intersects[0].object.name === "Poster_1") {
               window.open("https://www.youtube.com/watch?v=hvL1339luv0", "_blank");
            }
            if (intersects[0].object.name === "Poster_Frame_2" || intersects[0].object.name === "Poster_2") {
               window.open("https://www.youtube.com/watch?v=OUlnQuz78Ek", "_blank");
            }
            if (intersects[0].object.name === "Poster_Frame_3" || intersects[0].object.name === "Poster_3") {
               window.open("https://www.youtube.com/watch?v=dlQ3FeNu5Yw", "_blank");
            }
            if (intersects[0].object.name === "Monitor_Screen002") {
               window.open("https://www.youtube.com/watch?v=zkrxcTHNkiE", "_blank");
            }
            if (intersects[0].object.name === "Monitor_2001") {
               window.open("https://www.youtube.com/watch?v=9X5F553KOsM&t=1s", "_blank");
            }
            if (intersects[0].object.name === "Comic") {
               window.open("https://www.youtube.com/watch?v=eW_YN_2t-e4", "_blank");
            }


         }
      });


   }



   setCube() {
      const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(0.188, 0.22, 0.227) }); // black color
      const cube = new THREE.Mesh(geometry, material);

      cube.castShadow = true; // enable casting shadow
      cube.position.set(0, -0.9, 0);
      cube.rotation.y = Math.PI / 4
      this.scene.add(cube);
      this.roomChildren['cubeLoader'] = cube;

   }

   OnMouseMove() {
      window.addEventListener("mousemove", (e) => {

         this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
         this.lerp.target = this.rotation * 0.05;

      });


   }

   setModel() {

      this.actualRoom.children.forEach(child => {
         child.castShadow = true;
         child.receiveShadow = true;

         if (child instanceof THREE.Group) {
            child.children.forEach(groupChild => {
               groupChild.castShadow = true;
               groupChild.receiveShadow = true;
            });
         }
         if (child.name === 'Fish_Tank') {
            child.material = new THREE.MeshPhysicalMaterial();
            child.material.roughness = 0.1;
            child.material.color.set(0xffffff);
            child.material.ior = 3;
            child.material.transmission = 1;
            child.material.opacity = 1;
            //  child.material.reflectivity = 0.2;
            //  child.material.refractionRatio = 0.2;
         }
         if (child.name === 'Pillow') {
            child.castShadow = false;
         }
         if (child.name === 'Monitor_Screen002') {
            child.material = new THREE.MeshBasicMaterial({
               map: this.resources.items.video,
            });
            child.castShadow = false;
         }
         if (child.name === 'Monitor_2001') {
            child.material = new THREE.MeshBasicMaterial({
               map: this.resources.items.video2,
            });
            child.castShadow = false;
         }
         if (child.name === 'Batman_Light') {
            child.material = new THREE.MeshStandardMaterial({
               color: 0x5A5A5A,

               emissiveIntensity: 100, // Adjust the intensity as needed
            });


         }
         if (child.name === "Room_Cube" || child.name === "Room_Cube004") {
            child.position.x = 10;
            child.position.z = 5;
         }

         if (child.name === "Sketchfab_model") {


            child.scale.set(0, 0, 0);
         }
         if (child.name === "Comic") {
            child.position.set(-4, 15.45, 36.5);

            child.scale.set(0, 0, 0);
         }


         child.scale.set(0, 0, 0);

         this.roomChildren[child.name] = child;


      });

      const width = 1.2;
      const height = 0.45;
      const intensity = 1;
      const rectLight = new THREE.RectAreaLight(0xF4E98C, intensity, 0, 0);

      rectLight.position.set(10,
         25.57,
         8);
      // rectLight.rotation.z = Math.PI/2;
      rectLight.rotation.y = -Math.PI / 4.5;



      this.actualRoom.add(rectLight);
      rectLight.scale.set(0, 0, 0);
      this.roomChildren['rectLight'] = rectLight;


      const rectLightHelper = new RectAreaLightHelper(rectLight);
      //rectLight.add( rectLightHelper )



      this.scene.add(this.actualRoom);
      this.actualRoom.scale.set(0.06, 0.06, 0.06);
      this.actualRoom.position.set(-.07, -1, 0);
      this.actualRoom.rotation.y = Math.PI * 2;
      this.light = rectLight;
   }

   resize() {

   }

   update() {
      this.lerp.current = gsap.utils.interpolate(
         this.lerp.current,
         this.lerp.target,
         this.lerp.ease
      );

      this.actualRoom.rotation.y = this.lerp.current;

   }


}