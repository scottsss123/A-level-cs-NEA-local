class Body {
    #pos;
    #vel;
    #mass;
    #diameter;
    #image;
    #colour;
    #name;

    constructor(inName, inPos, inVel, inMass, inDiameter, inImage, inColour) {
        this.#name = inName;
        this.#pos = inPos;
        this.#vel = inVel;
        this.#mass = inMass;
        this.#diameter = inDiameter;
        this.#image = inImage;
        this.#colour = inColour;
    }

    getName() {
        return this.#name;
    }
    getPos() {
        return this.#pos;
    }
    getVel() {
        return this.#vel;
    }
    getMass() {
        return this.#mass;
    }
    getDiameter() {
        return this.#diameter;
    }
    getImage() {
        return this.#image;
    }
    getColour() {
        return this.#colour;
    }
    

    setName(inName) {
        this.#name = inName;
    }
    setPos(inPos) {
        this.#pos[0] = inPos[0];
        this.#pos[1] = inPos[1];
    }
    setVel(inVel) {
        this.#vel[0] = inVel[0];
        this.#vel[1] = inVel[1];
    }
    setMass(inMass) {
        this.#mass = inMass;
    }
    setDiameter(inDiameter) {
        this.#diameter = inDiameter;
    }
    setImage(inImage) {
        this.#image = inImage;
    }
    

    updatePos() {
        this.#pos[0] += this.#vel[0];
        this.#pos[1] += this.#vel[1];
    }
    addVel(inAcceleration) {
        this.#vel[0] += inAcceleration[0];
        this.#vel[1] += inAcceleration[1];
    }
}