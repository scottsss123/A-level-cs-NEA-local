class Simulation {
    #bodies
    #camera
    #time;
    #timeRate;
    #prevTimeRate;
    #G; // gravitational constatn

    constructor() {
        this.#camera = new Camera([0,0], 1);
        this.#bodies = [];
        this.#time = 0;
        this.#timeRate = 0;
        this.#prevTimeRate = 1/60;
        this.#G = 6.67430e-11;
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
    setPrevTimeRate() {
        this.#timeRate = this.#prevTimeRate;
    }

    updateBodyPositions() {
        for (let body of this.#bodies) {
            body.stepPos(this.#timeRate);
        }
    }

    getBodyByName(name) {
        for (let body of this.#bodies) {
            if (body.getName() === name) {
                return body;
            }
        }
        return 0;
    }

    // document this & comment
    updateBodyVelocities() {
        for (let i = 0; i < this.#bodies.length; i++) {
            for (let j = i + 1; j < this.#bodies.length; j++) {
                let body1 = this.#bodies[i];
                let body2 = this.#bodies[j];

                let pos1 = body1.getPos();
                let pos2 = body2.getPos();

                let mass1 = body1.getMass();
                let mass2 = body2.getMass();

                // calculate unit vector in direction of bodyi to bodyj, unitVec
                let dir = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
                let modDir = Math.sqrt((dir[0] ** 2) + (dir[1] ** 2));
                this.modDir = modDir;
                let unitVec = [dir[0] / modDir, dir[1] / modDir];
                // this logs accurate initial unit vec of [1, 0] and when moon moves down slightly,accurately logs ~[0.99999999.., 0.00000000...1]
                //console.log(unitVec, body1.getName(), body2.getName())
                // calculate magnitude of force, could be extracted to function
                let forceMag = (this.#G * mass1 * mass2) / (modDir ** 2);

                let accelerationMag1 = forceMag / mass1;
                let accelerationMag2 = forceMag / mass2;

                let accelerationVec1 = [unitVec[0] * accelerationMag1, unitVec[1] * accelerationMag1];
                let accelerationVec2 = [-1 * unitVec[0] * accelerationMag2, -1 * unitVec[1] * accelerationMag2];

                this.#bodies[i].addVel(accelerationVec1, this.#timeRate);
                this.#bodies[j].addVel(accelerationVec2, this.#timeRate);
            }
        }
    }

    step() {
        this.#time += this.#timeRate;
        this.updateBodyPositions(); 
        return;
    }
}