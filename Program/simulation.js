class Simulation {
    #bodies
    #camera
    #time;
    #timeRate;


    constructor() {
        this.#camera = new Camera([0,0], 1);
        this.#bodies = [];
    }


    getBodies() {
        return this.#bodies;
    }
    getCamera() {
        return this.#camera;
    }
    getTime() {
        return this.#time;
    }
    getTimeRate() {
        return this.#timeRate;
    }

    setTime(inTime) {
        this.#time = inTime;
    }
    setTimeRate(inTimeRate) {
        this.#timeRate = inTimeRate;
    }

    updateTime() {
        this.#time += this.#timeRate;
    }
    addBody(inBody) {
        this.#bodies.push(inBody);
    }
    step() {
        return;
    }

}