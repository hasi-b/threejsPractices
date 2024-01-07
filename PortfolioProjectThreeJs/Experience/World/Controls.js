
import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ASScroll from '@ashthornton/asscroll'



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

        this.setSmoothScroll();

        this.setScrollTrigger();
        //this.setPath();
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

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }


    setSmoothScroll(){

        this.asscroll = this.setupASScroll();

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

    setScrollTrigger(){
        
        ScrollTrigger.matchMedia({
            // desktop
            "(min-width: 969px)":  ()=> {
                this.room.scale.set(0.06,0.06,0.06);
                this.experience.world.room.light.width=1.2;;
                this.experience.world.room.light.height=0.45;
                //first section
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });
                this.firstMoveTimeline.to(this.room.position,{
                    x:()=>{
                        return this.sizes.width * 0.0014;
                    }
                });
                //second section

                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                this.secondMoveTimeline.to(this.camera.orthograpchicCamera.position,{
                    x:3,
                    y:0.3,
                    z:1 
                    // x:()=>{
                    //     return 1;
                    // },
                    // z:()=>{
                    //         return this.sizes.height*0.0032;
                    // }
                },"same").to(this.camera.orthograpchicCamera, {
                    zoom: 3, 
                    onUpdate: () => {
                        // Update the projection matrix after each frame
                        this.camera.orthograpchicCamera.updateProjectionMatrix();
                    }
                }, "same");
               
                
               
                //third sectoion 

                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                this.thirdMoveTimeline.to(this.camera.orthograpchicCamera.position,{
                    x:2,
                    y:-1,
                    z:1 
                    
                },"same");

                // this.secondMoveTimeline.to(this.room.scale,{
                //    x: 0.24,
                //    y: 0.24,
                //    z: 0.24
                // },"same");

            },
            //mobile
            "(max-width: 968px)":  ()=> {
                console.log("fired mobile");

                this.room.scale.set(0.03,0.03,0.03);
                
                this.experience.world.room.light.width=0.6;
                this.experience.world.room.light.height=0.2;
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".first-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                }).to(this.room.scale,{
                    x:0.06,
                    y:0.06,
                    z:0.06,
                },"Second").to(this.experience.world.room.light,{
                    width:1.2,
                    height:0.45
                },"Second");
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".second-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                this.secondMoveTimeline.to(this.camera.orthograpchicCamera.position,{
                    x:-0.2,
                    y:0.2,
                    z:1 
                    // x:()=>{
                    //     return 1;
                    // },
                    // z:()=>{
                    //         return this.sizes.height*0.0032;
                    // }
                },"same").to(this.camera.orthograpchicCamera, {
                    zoom: 2.5, 
                    onUpdate: () => {
                        // Update the projection matrix after each frame
                        this.camera.orthograpchicCamera.updateProjectionMatrix();
                    }
                }, "same");








                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });
                this.thirdMoveTimeline.to(this.camera.orthograpchicCamera.position,{
                    x:-0.5,
                    y:-1,
                    z:1 
                    
                },"same");


            },
          
           
          
            // all
            all: ()=> {


                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        gsap.to(section,{
                            borderTopLeftRadius:10,
                            scrollTrigger:{
                                trigger:section,
                                start: "top bottom",
                                end:"top top",
                                
                                scrub:0.6,
                            }
                        });
                        gsap.to(section,{
                            borderBottomLeftRadius:700,
                            scrollTrigger:{
                                trigger:section,
                                start: "bottom bottom",
                                end:"bottom top",
                                
                                scrub:0.6,
                            }
                        });
                    }
                    else{

                        gsap.to(section,{
                            borderTopRightRadius:10,
                            scrollTrigger:{
                                trigger:section,
                                start: "top bottom",
                                end:"top top",
                                
                                scrub:0.6,
                            }
                        });
                        gsap.to(section,{
                            borderBottomRightRadius:700,
                            scrollTrigger:{
                                trigger:section,
                                start: "bottom bottom",
                                end:"bottom top",
                                
                                scrub:0.6,
                            }
                        });
                    }

                    gsap.from(this.progressBar,{
                        scaleY:0,
                        scrollTrigger:{
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub:0.4,
                            pin: this.progressWrapper,
                            pinSpacing:false
                        }

                    });

                   

                });
            
                this.secondPartTimeline = new gsap.timeline({
                    scrollTrigger:{
                        trigger:".third-move",
                        start:"top top",
                        // end: "bottom bottom",
                        // scrub: 0.6,
                        // invalidateOnRefresh: true,
                    }

                });

                this.room.children.forEach(child => {
                    
                    if(child.name==="Room_Cube" ){
                       
                      this.first =  gsap.to(child.position,{
                        
                        x:3.0374865531921387,
                        z:18.245832443237305,
                        duration:0.5,
                        ease:   'back.out(2)'
                    },"same");
                    
                    }
                    if( child.name==="Room_Cube004"){
                       
                        this.fourth =  gsap.to(child.position,{
                          
                          x:3.0374865531921387,
                          z:18.245832443237305,
                          duration:0.5,
                        ease:   'back.out(2)'
                      },"same");
                      
                      }
                    if( child.name==="Sketchfab_model"){
                        
                       this.second= gsap.to(child.scale,{
                         
                         x:10,
                         y:10,
                         z:10,
                         duration:0.5,
                         ease:   'back.out(2)'
                     });
                    }
                     if( child.name==="Comic"){
                        
                        this.third= gsap.to(child.scale,{
                         
                         x:10,
                         y:10,
                         z:10,
                         duration:1,
                         ease:   'bounce.out' 
                     });
                   


                    }
                });

                this.secondPartTimeline.add(this.first,0);
                this.secondPartTimeline.add(this.fourth,0);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                
                
            },
          });

          this.camera.orthograpchicCamera.updateProjectionMatrix();

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