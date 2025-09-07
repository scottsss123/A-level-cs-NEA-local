const massUnits = {
    "kg":1,
    "earths":1/5.97219e24,
    "suns":1/1.989e30
};

const distanceUnits = {
    "m":1,
    "earth diameters": 1/12756274,
    "sun diameters": 1/1.39e9
}

const speedUnits = {
    "m/s": 1,
    "mph": 0.44704,
    "c": 1/299792458
}

class BodyInfoPopupBox extends TextBox {
    // variables linking to body and simulation camera
    #linkedBody
    #linkedCamera
    #displayMassUnit
    #displaySpeedUnit
    #displayDistanceUnit

    constructor(inX, inY, inWidth, inHeight, inLinkedBody, inLinkedCamera, inDisplayMassUnit, inDisplaySpeedUnit, inDisplayDistanceUnit) {
        super(inX, inY, inWidth, inHeight, "");
        this.#linkedBody = inLinkedBody;
        this.#linkedCamera = inLinkedCamera;
        this.#displayMassUnit = inDisplayMassUnit;
        this.#displaySpeedUnit = inDisplaySpeedUnit;
        this.#displayDistanceUnit = inDisplayDistanceUnit;

    }

    display() {

         // draws line from text box to linked body 
        let pos = this.getPos();
        let bodyCanvasPos = this.#linkedCamera.getCanvasPosition(this.#linkedBody);
        stroke('white');
        line(pos[0] , pos[1], bodyCanvasPos[0], bodyCanvasPos[1]);

        // display textbox contents
        super.display();

       
    }


    /// TODO: convert units & maybe comment more in doc
    updateBodyInfo() {
        // stores linked body's attributes
        let bodyName = this.#linkedBody.getName();
        let bodyPosition = this.#linkedBody.getPos();
        let bodyVelocity = this.#linkedBody.getVel();
        let bodyVelocityMagnitude = (Math.sqrt((bodyVelocity[0])**2 + (bodyVelocity[1])**2) * speedUnits[this.#displaySpeedUnit]).toPrecision(3);
        // calculate angle of body's velocity currently standard angle, could change to bearing 
        let bodyVelocityDirection = -(Math.atan2(bodyVelocity[1], bodyVelocity[0]) * 180 / Math.PI).toPrecision(3)
        let bodyDiameter = (this.#linkedBody.getDiameter() * distanceUnits[this.#displayDistanceUnit]).toPrecision(3);
        let bodyMass = (this.#linkedBody.getMass() *  massUnits[this.#displayMassUnit]).toPrecision(3);

        let newContents = "Body Name: " + bodyName + "\n \nBody Position (x, y):\n" + (bodyPosition[0] * distanceUnits[this.#displayDistanceUnit]).toPrecision(3) + " " + this.#displayDistanceUnit + ", " + (bodyPosition[1] * distanceUnits[this.#displayDistanceUnit]).toPrecision(3) + " " + this.#displayDistanceUnit + "\nBody mass: " + bodyMass + " " + this.#displayMassUnit + "\nBody diameter: " + bodyDiameter + " " + this.#displayDistanceUnit + "\nBody velocity: " + bodyVelocityMagnitude + " " + displaySpeedUnit + "\nBody direection: " + bodyVelocityDirection + '°';
        // updates text contents with updated attributes
        super.updateContents(newContents);
    }

    setPosCorner(newPos) {
        super.setPos(newPos[0] - this.getWidth() / 2 , newPos[1] - this.getHeight() / 2);
    }

    getPosCorner() {
        let centerPos = this.getPos();
        return [centerPos[0] - this.getWidth() / 2, centerPos[1] - this.getHeight() / 2];
    }

    updateUnits(inDisplayMassUnit, inDisplaySpeedUnit, inDisplayDistanceUnit) {
        this.#displayMassUnit = inDisplayMassUnit;
        this.#displaySpeedUnit = inDisplaySpeedUnit;
        this.#displayDistanceUnit = inDisplayDistanceUnit;
    }
};