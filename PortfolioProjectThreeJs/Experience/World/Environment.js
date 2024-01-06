
import Experience from "../Experience.js";
import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
export default class Environment{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.gui = new GUI();

        this.obj = {
            colorSunObj:{r:0,g:0,b:0},
            colorAmbObj:{r:0,g:0,b:0},
            intensity :3,
        }

        this.setSunLight();
        this.light= this.setAreaLight();
        this.setSecondAreaLight();
        this.offset = new THREE.Vector3();
        
        //this.setSpotLight();
        //this.setPosterLight();
       
        this.setGUI();
    }
    setGUI(){
        this.gui.addColor(this.obj,"colorSunObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorSunObj);
            
        });
        this.gui.addColor(this.obj,"colorAmbObj").onChange(()=>{
            
            this.ambientLight.color.copy(this.obj.colorAmbObj);
        });

    }

    setPosterLight(){
        // Create a spotlight
const spotlightColor = new THREE.Color(0xffa31a); // White color
const spotlightIntensity = 40;
const spotlightDistance = 10;
const spotlightAngle = Math.PI / 12; // Spotlight cone angle
const spotlightPenumbra = 0.2; // Penumbra percentage
const spotlightPosition = new THREE.Vector3(0.3, 0.5, 2);
 // Adjust the position to focus on the poster
const spotlight = new THREE.SpotLight(spotlightColor, spotlightIntensity, spotlightDistance, spotlightAngle, spotlightPenumbra);
spotlight.position.copy(spotlightPosition);
spotlight.rotateX(90);
this.scene.add(spotlight);

// // Create a spotlight helper
// const spotlightHelper = new THREE.SpotLightHelper(spotlight);
// this.scene.add(spotlightHelper);
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff",2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;


        //  const helper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        //  this.scene.add(helper);

        this.sunLight.position.set(-5,10,10);
        
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#1ac6ff",1);
        this.scene.add(this.ambientLight);
        console.log("light added");
   }
   setAreaLight(){
    this.width = 1;
    this.height = 0.5;
    this.intensity = 40;
    this.rectLight = new THREE.RectAreaLight( 0xffd300, this.intensity, this.width, this.height );
  
    this.rectLight.position.set( -.5, 1, 1.5 );
    this.rectLight.lookAt( 0, 0, 0 );
    this.scene.add( this.rectLight );
    this.rectAreaLightHelperGeometry = new THREE.PlaneGeometry(this.rectLight.width, this.rectLight.height);
    this.rectAreaLightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0x36006b, side: THREE.DoubleSide, wireframe: true });
    this.rectAreaLightHelperMesh = new THREE.Mesh(this.rectAreaLightHelperGeometry, this.rectAreaLightHelperMaterial);
    this.rectAreaLightHelperMesh.position.copy(this.rectLight.position);
    return this.rectLight;
    //this.scene.add(this.rectAreaLightHelperMesh);
   }
   setSecondAreaLight(){
    this.width = 1;
    this.height = 0.5;
    this.intensity = 40;
    this.rectLightSecond = new THREE.RectAreaLight(0xe600ac , this.intensity, this.width, this.height );
  
    this.rectLightSecond.position.set( 4, 1, 1.5 );
    this.rectLightSecond.lookAt( 0, 0, 0 );
    this.scene.add( this.rectLightSecond );
    this.rectAreaLightHelperGeometry = new THREE.PlaneGeometry(this.rectLightSecond.width, this.rectLight.height);
    this.rectAreaLightHelperMaterial = new THREE.MeshBasicMaterial({ color: 0x36006b, side: THREE.DoubleSide, wireframe: true });
    this.rectAreaLightHelperMesh = new THREE.Mesh(this.rectAreaLightHelperGeometry, this.rectAreaLightHelperMaterial);
    this.rectAreaLightHelperMesh.position.copy(this.rectLightSecond.position);
    
    //this.scene.add(this.rectAreaLightHelperMesh);
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


   switchTheme(theme){
    if(theme ==="dark" ){
        gsap.to(this.sunLight.color,{
            r:0/255,
            g:0/255,
            b:0/255,
            
        });
        gsap.to(this.ambientLight.color,{
            r:0/255,
            g:0/255,
            b:0/255,
            
        });
      
    }
    else{
        gsap.to(this.sunLight.color,{
            r:255/255,
            g:255/255,
            b:255/255,
            
        });
        gsap.to(this.ambientLight.color,{
            r:255/255,
            g:255/255,
            b:255/255,
            
        });
    }
    }
    resize(){
       
    }

    update(){
       
 
    }

   
}