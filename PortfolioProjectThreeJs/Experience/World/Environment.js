
import Experience from "../Experience.js";
import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
export default class Environment{

    constructor(){
        this.experience = new Experience();     
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        //this.gui = new GUI();

        this.obj = {
            colorSunObj:{r:0,g:0,b:0},
            colorAmbObj:{r:0,g:0,b:0},
            Sunintensity :3,
            Ambintensity:3,
            areaLightobj:{r:0,g:0,b:0},
            areaSecondLightobj:{r:0,g:0,b:0},
            areaLightIntensity:3,
            areaSecondLightIntensity:3,

        }

        this.setSunLight();
        this.light= this.setAreaLight();
        this.setSecondAreaLight();
        this.offset = new THREE.Vector3();
        this.currentTheme;
        //this.setSpotLight();
        //this.setPosterLight();
       
        //this.setGUI();
    }
    setGUI(){
        this.gui.addColor(this.obj,"colorSunObj").onChange(()=>{
           
            this.sunLight.color.copy(this.obj.colorSunObj);
            
        });
        this.gui.add(this.obj,"Sunintensity",0,100).onChange(()=>{
            this.sunLight.intensity = this.obj.Sunintensity;
        });
        this.gui.addColor(this.obj,"colorAmbObj").onChange(()=>{
           
            this.ambientLight.color.copy(this.obj.colorAmbObj);
        });
        this.gui.add(this.obj,"Ambintensity",0,100).onChange(()=>{
            this.ambientLight.intensity = this.obj.Ambintensity;
        });
        this.gui.addColor(this.obj,"areaLightobj").onChange(()=>{
            
            this.rectLight.color.copy(this.obj.areaLightobj);
            
        });

        this.gui.add(this.obj,"areaLightIntensity",0,100).onChange(()=>{
            this.rectLight.intensity = this.obj.areaLightIntensity;
        });

        this.gui.addColor(this.obj,"areaSecondLightobj").onChange(()=>{
            console.log(this.rectLightSecond.color);
            this.rectLightSecond.color.copy(this.obj.areaSecondLightobj);
         
            
        });
        this.gui.add(this.obj,"areaSecondLightIntensity",0,100).onChange(()=>{
            this.rectLightSecond.intensity = this.obj.areaSecondLightIntensity;
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
    this.rectLightSecond = new THREE.RectAreaLight(0xBF40BF , this.intensity, this.width, this.height );
  
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
    this.currentTheme = theme;
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
        gsap.to(this.rectLight.color,{
            r: 0.027450980392156862, 
            g: 0.1450980392156863, 
            b: 0.27450980392156865
        });
        gsap.to(this.rectLightSecond.color,{
            r: 0.3568627450980392, 
            g: 0.00392156862745098, 
            b: 0.00392156862745098
        });
        gsap.to(this.experience.world.room.roomChildren['cubeLoader'].material.color,{
            //  r: 0.9725490196078431, 
            //  g: 0.9803921568627451, 
            //  b: 0.8980392156862745
           r:148/255,
           g:235/255,
           b:235/255
        });


        
      
    }
    else{
        gsap.to(this.sunLight.color,{
            r:255/255,
            g:255/255,
            b:255/255,
            
        });
        gsap.to(this.ambientLight.color,{
            r: 0.010329823026364548,
            g: 0.5647115056965487, 
            b: 1
        });
        gsap.to(this.rectLight.color,{
            r: 1, 
            g: 0.651405637412793, 
            b: 0
        });
        gsap.to(this.rectLightSecond.color,{
            r: 0.7912979403281553,
            g: 0, 
            b: 0.41254261347374327
        });
         gsap.to(this.experience.world.room.roomChildren['cubeLoader'].material.color,{
            r: 48/255, 
            g: 56/255, 
            b: 58/255
        });
    }
    }
    resize(){
       
    }

    update(){
       
 
    }

   
}