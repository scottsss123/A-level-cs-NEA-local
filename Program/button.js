class Button extends Box {
    // private variables
    #colourDefault;
    #colourHover;
    #stateChange;
    #txt;

    constructor(inX, inY, inWidth, inHeight, inColourDefault, inColourHover, inText, inStateChange) {
        // box constructor
        super(inX, inY, inWidth, inHeight, inColourDefault);
        // additional variable assignment
        this.#colourDefault = inColourDefault;
        this.setColour(this.#colourDefault);
        this.#colourHover = inColourHover;
        this.#stateChange = inStateChange;
        this.#txt = inText;
    }   

    // display same as box also with centered text
    display() {
        super.display();
        textAlign(CENTER, MIDDLE);
        fill([255,255,255]);
        text(this.#txt, this.getPos()[0], this.getPos()[1]);
    }

    mouseOverlapping() {
        let overlapping = super.mouseOverlapping()
        if (overlapping) {
            this.setColour(this.#colourHover);
        } else {
            this.setColour(this.#colourDefault);
        }
        return overlapping;
    }

    // for changing program state on click
    getStateChange() {
        return this.#stateChange;
    }
    //return text in button
    getContents() {
        return this.#txt;
    }
}

