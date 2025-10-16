class Simulation {
    #bodies // array of body objects
    #camera // camera object
    #time;  // float
    #timeRate;  // float
    #prevTimeRate; // float
    #G; // gravitational constant float
    #focus; // bool / string
    #id;

    constructor() {
        this.#camera = new Camera([0,0], 1);
        this.#bodies = [];
        this.#time = 0;
        this.#timeRate = 0;
        this.#prevTimeRate = 1/60 * 1000;
        this.#G = 6.67430e-11;
        this.#focus = false;
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
    setFocusByName(inFocusName) {
        let newFocus = this.getBodyByName(inFocusName);
        if (newFocus) {
            this.#focus = newFocus;
        } else {
            // reset simulation focus if nothing inputted into prompt
            console.log('no body of given name - setFocusByName');
            this.#focus = false;
        }
    }

    updateTime() {
        this.#time += this.#timeRate;
        this.#prevTimeRate = this.#timeRate;
    }
    updateTimeRate(sf) {
        this.#timeRate *= sf;
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
        return false;
    }
    getBodyIndexByName(name) {
        for (let i = 0; i < this.#bodies.length; i++) {
            if (body.getName() === name) {
                return body;
            }
        }
    }
    moveCameraToFocus() {
        if (!this.#focus) { 
            //console.log('no focus');
            return; 
        }
        let focusPos = this.#focus.getPos();
        this.#camera.setPosition(focusPos);
    }
    getFocus() {
        return this.#focus;
    }

    updateBodyVelocities() {
        // for each pair of bodies, bodyi, bodyj
        for (let i = 0; i < this.#bodies.length; i++) {
            for (let j = i + 1; j < this.#bodies.length; j++) {
                
                let body1 = this.#bodies[i];
                let body2 = this.#bodies[j];

                // cache body attributes to number of reduce getter calls
                let pos1 = body1.getPos();
                let pos2 = body2.getPos();

                let mass1 = body1.getMass();
                let mass2 = body2.getMass();

                if (mass1 === 0 || mass2 === 0) {
                    continue;
                }

                // calculate unit vector in direction of bodyi to bodyj, unitVec
                let dir = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
                let modDir = Math.sqrt((dir[0] ** 2) + (dir[1] ** 2));
                let unitVec = [dir[0] / modDir, dir[1] / modDir];
                // calculate magnitude of force, could be extracted to function
                let forceMag = (this.#G * mass1 * mass2) / (modDir ** 2);

                let accelerationMag1 = forceMag / mass1; // a = F / m 
                let accelerationMag2 = -1 * forceMag / mass2;

                let accelerationVec1 = [unitVec[0] * accelerationMag1, unitVec[1] * accelerationMag1];
                let accelerationVec2 = [unitVec[0] * accelerationMag2, unitVec[1] * accelerationMag2];

                // add calculated acceleration to each body
                this.#bodies[i].addVel(accelerationVec1, this.#timeRate);
                this.#bodies[j].addVel(accelerationVec2, this.#timeRate);
            }
        }
    }

    step() {
        this.#time += this.#timeRate;
        this.updateBodyVelocities();
        this.updateBodyPositions();         
        // implement this usefully, camera follow feature
        //this.#camera.setPosition(this.#bodies[0].getPos());
        return;
    }

    setID(id) {
        this.#id = id;
    }

    getID() {
        return this.#id;
    }

    getSimulationData() {
        let bodyArr = [];
        let focus = false;
        for (let i = 0; i < this.#bodies.length; i++) {
            bodyArr.push(this.#bodies[i].getBodyData());
        }
        if (this.#focus) {
            focus = this.#focus.getBodyData();
        }

        return {
            bodies: bodyArr, 
            camera: this.#camera.getCameraData(),
            time: this.#time,
            timeRate: this.#timeRate,
            prevTimeRate: this.#prevTimeRate,
            G: this.#G,  
            focus: focus, 
            id: this.#id
        }
    }
}
