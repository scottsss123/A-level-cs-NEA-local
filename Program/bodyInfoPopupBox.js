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
        // display textbox contents
        super.display();

        // draws line from text box to linked body 
        let pos = this.getPos();
        let bodyCanvasPos = this.#linkedCamera.getCanvasPosition(this.#linkedBody);
        stroke('white');
        line(pos[0] - this.getWidth() / 2, pos[1] - this.getHeight() / 2, bodyCanvasPos[0], bodyCanvasPos[1]);
    }


    /// TODO: convert units & maybe comment more in doc
    updateBodyInfo() {
        // stores linked body's attributes
        let bodyName = this.#linkedBody.getName();
        let bodyPosition = this.#linkedBody.getPos();
        let bodyVelocity = this.#linkedBody.getVel();
        let bodyVelocityMagnitude = (Math.sqrt((bodyVelocity[0])**2 + (bodyVelocity[1])**2)).toFixed(1);
        // calculate angle of body's velocity currently standard angle, could change to bearing 
        let bodyVelocityDirection = -(Math.atan2(bodyVelocity[1], bodyVelocity[0]) * 180 / Math.PI).toFixed(0)
        let bodyDiameter = this.#linkedBody.getDiameter().toFixed(0);
        let bodyMass = this.#linkedBody.getMass().toFixed(0);

        let newContents = "Body Name: " + bodyName + "\nBody Position (x, y):\n" + bodyPosition[0].toFixed(0) + ", " + bodyPosition[1].toFixed(0) + "\nBody velocity: " + bodyVelocityMagnitude + " " + displaySpeedUnit + "\nBody direection: " + bodyVelocityDirection + "°\nBody diameter: " + bodyDiameter + " " + this.#displayDistanceUnit + "\nBody mass: " + bodyMass + " " + this.#displayMassUnit;
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