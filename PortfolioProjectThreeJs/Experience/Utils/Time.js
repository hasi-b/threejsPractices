import EventEmitter from "events";

export default class Time extends EventEmitter{
    constructor(){
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsedTime = 0;
        this.delta = 16;

        this.update();
    }

    update(){
        const currentTime = Date.now();
        this.delta = currentTime-this.current;
        this.current = currentTime;
        this.elapsedTime = this.current - this.delta;
        this.emit("update");
        window.requestAnimationFrame(()=>this.update());
    }
}