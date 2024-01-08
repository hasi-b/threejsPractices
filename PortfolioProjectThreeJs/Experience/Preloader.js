import EventEmitter from "events";
import Experience from "./Experience";
import gsap from "gsap";
import convert from "./Utils/convertDivsToSpans"


export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;


        this.sizes.on("switchdevice", (device) => {
            this.device = device;

        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();

        });

    }


    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-subheading"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;



    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new gsap.timeline();
            this.timeline.set(".animatedis",{y:0,yPercent:100});
            this.timeline.to(".preloader", {
                   opacity :0,
                   onComplete:()=>{
                    document.querySelector(".preloader").classList.add("hidden");
                   }

                })
            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cubeLoader.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    ease: "back.out(2.5)",
                    duration: 1,

                }).to(this.roomChildren.cubeLoader.position, {
                    x: ()=>{
                        return (1/this.sizes.width) * -1538.46;
                    },
                    ease: "power1.out",
                    duration: 1,

                });
            }
            else {

                this.timeline.to(this.roomChildren.cubeLoader.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    ease: "back.out(2.5)",
                    duration: 1,

                }).to(this.roomChildren.cubeLoader.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 1,

                });




            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",


            }).to(".arrow-svg_wrapper", {
                opacity: 1,
            }, "same").to(".toggle-bar", {
                opacity: 1,
                pointerEvents: 'auto',
                
                onComplete: resolve
            }, "same");
        });

    }


    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new gsap.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",


            }, "fadeout").to(".arrow-svg_wrapper", {
                opacity: 0,
            }, "fadeout").to(this.roomChildren.cubeLoader.position, {
                x: 0,
                ease: "power1.out",
                duration: 1,
            }).to(this.roomChildren.cubeLoader.rotation, {
                y: 2 * Math.PI + Math.PI / 4
            }).to(this.roomChildren.cubeLoader.scale, {
                x: 10,
                y: 10,
                z: 10
            }, "same").to(this.camera.orthograpchicCamera.position, {
                y: 0.1
            }, "same").to(this.roomChildren.cubeLoader.position, {
                y: 0
            }, "same").to(this.roomChildren.cubeLoader.scale, {
                x: 0,
                y: 0,
                z: 0,

            }, "now").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",


            }, "now").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",


            }, "now").to(".hero-second-subheading .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",


            }, "now").to(".second-subheading .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",


            }, "now");

            const values = Object.values(this.roomChildren);
            if (this.device === "desktop") {
                values.forEach((element) => {

                    if (this.roomChildren.cubeLoader !== element && element.name != "Sketchfab_model" && element.name != "Batman_Light" && element.name != "Comic" && element.name != "Batman-black" && element.name != "Batman_wall" && element.name != "Fish_Tank" && element.name != "Tetra_Fish" && element.name != "Poster_Frame_1" && element.name != "Poster_1" && element.name != "Poster_Frame_2" && element.name != "Poster_2" && element.name != "Poster_Frame_3" && element.name != "Poster_3") {
                        this.secondTimeline.to(element.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2.2)"
                        }, "now");
                    }
                });
                this.secondTimeline.to(this.roomChildren.Batman_Light.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren["Batman-black"].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren.Batman_wall.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren.Fish_Tank.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "fish").to(this.roomChildren.Tetra_Fish.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "fish").to(this.roomChildren.Poster_Frame_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_1").to(this.roomChildren.Poster_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_1").to(this.roomChildren.Poster_Frame_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_2").to(this.roomChildren.Poster_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_2").to(this.roomChildren.Poster_Frame_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_3").to(this.roomChildren.Poster_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",


                }, "Poster_3").to(this.roomChildren['rectLight'], {
                    width: 1.2,
                    height:0.45
                }).to(".arrow-svg_wrapper", {
                    opacity: 1,
                    onComplete: resolve
                },);
            }

            else {




                values.forEach((element) => {

                    if (this.roomChildren.cubeLoader !== element && element.name != "Sketchfab_model" && element.name != "Batman_Light" && element.name != "Comic" && element.name != "Batman-black" && element.name != "Batman_wall" && element.name != "Fish_Tank" && element.name != "Tetra_Fish" && element.name != "Poster_Frame_1" && element.name != "Poster_1" && element.name != "Poster_Frame_2" && element.name != "Poster_2" && element.name != "Poster_Frame_3" && element.name != "Poster_3") {
                        this.secondTimeline.to(element.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2.2)"
                        }, "now");
                    }
                });
                this.secondTimeline.to(this.roomChildren.Batman_Light.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren["Batman-black"].scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren.Batman_wall.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "batman").to(this.roomChildren.Fish_Tank.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "fish").to(this.roomChildren.Tetra_Fish.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "fish").to(this.roomChildren.Poster_Frame_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_1").to(this.roomChildren.Poster_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_1").to(this.roomChildren.Poster_Frame_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_2").to(this.roomChildren.Poster_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_2").to(this.roomChildren.Poster_Frame_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)"

                }, "Poster_3").to(this.roomChildren.Poster_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",


                }, "Poster_3").to(this.roomChildren['rectLight'], {
                    width: 0.6,
                    height:0.225
                });





                this.secondTimeline.to(this.roomChildren.cubeLoader.position, {
                    z: 1.5,
                    ease: "power1.out",
                    duration: 1,
                }, "same").to(this.room.scale, {
                    x: 0.03,
                    y: 0.03,
                    z: 0.03,

                }, "now").to(".arrow-svg_wrapper", {
                    opacity: 1,
                    onComplete: resolve
                },);;


            }




        });
    }


    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();

            this.playSecondIntro();


        }


    }
    onTouch(e) {
        this.initialY = e.touches[0].clientY;


    }
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swiped");
            this.removeEventListeners();
            this.playSecondIntro();

        }
        this.initialY = null;//


    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);

    }

    async playIntro() {

        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);


    }

    async playSecondIntro() {
        await this.secondIntro();
        this.moveFlag = false;
        this.emit("enablecontrols");


    }
    move() {
        if (this.device === "desktop") {
            this.roomChildren.cubeLoader.position.set(-1, 0, 0);
        }
        else {
            this.roomChildren.cubeLoader.position.set(0, 0, -1);
        }



    }
    update() {
        if (this.moveFlag) {
            //this.move();
        }

    }
}