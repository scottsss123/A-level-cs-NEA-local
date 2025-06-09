class Simulation {
    #bodies
    #camera
    #time;
    #timeRate;
    #prevTimeRate;

    constructor() {
        this.#camera = new Camera([0,0], 1);
        this.#bodies = [];
        this.#time = 0;
        this.#timeRate = 1 / 60;
        this.#prevTimeRate = 1;
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
        this.#prevTimeRate = this.#timeRate;
        this.#timeRate = inTimeRate;
    }

    updateTime() {
        this.#time += this.#timeRate;
        this.#prevTimeRate = this.#timeRate;
    }
    addBody(inBody) {
        this.#bodies.push(inBody);
    }
    step() {
        this.#time += this.#timeRate;
        return;
    }
    setPrevTimeRate() {
        this.#timeRate = this.#prevTimeRate;
    }
}