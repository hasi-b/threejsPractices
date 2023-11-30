
import Experience from "../Experience.js";
import * as THREE from "three";
export default class Environment{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setSunLight();
        //this.setAreaLight();
        //this.setSpotLight();
       
  
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff",3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-5,10,10);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff",1);
        this.scene.add(this.ambientLight);
        console.log("light added");
   }
   setAreaLight(){
    this.width = 0.5;
    this.height = 0.5;
    this.intensity = 1;
    this.rectLight = new THREE.RectAreaLight( 0xffffff, this.intensity, this.width, this.height );
    this.rectLight.position.set( 5, 5, 0 );
    this.rectLight.lookAt( 0, 0, 0 );
    this.scene.add( this.rectLight );
    this.rectAreaLightHelperGeometry = new THREE.PlaneGeometry(this.rectLight.width, this.rectLight.height);
    this.rectAreaLightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    this.rectAreaLightHelperMesh = new THREE.Mesh(this.rectAreaLightHelperGeometry, this.rectAreaLightHelperMaterial);
    this.rectAreaLightHelperMesh.position.copy(this.rectLight.position);
    this.scene.add(this.rectAreaLightHelperMesh);
   }

   setSpotLight(){
    this.spotLight = new THREE.SpotLight(0xff0000, 1, 100);
    this.spotLight.position.set(0, 10, 0); 
    this.spotLight.angle = Math.PI / 4; // Set the cone angle to 45 degrees (in radians)
    this.spotLight.penumbra = 0.001;
    
    // Adjust position as needed
    this.scene.add(this.spotLight);

    // Visualize spotlight
    this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    this.scene.add(this.spotLightHelper);
   }

    resize(){
       
    }

    update(){
     
    }

   
}