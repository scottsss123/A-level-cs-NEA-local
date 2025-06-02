class Button extends Box {
    #stateChange;

    constructor(inX, inY, inWidth, inHeight, inColour, inStateChange) {
        super(inX, inY, inWidth, inHeight, inColour);
        this.#stateChange = inStateChange;
    }

    
}