class Button extends Box {
    #pos;
    #width;
    #height;
    #colour; 
    #stateChange;
    #txt;

    constructor(inX, inY, inWidth, inHeight, inColour, inText, inStateChange) {
        super(inX, inY, inWidth, inHeight, inColour);
        this.#stateChange = inStateChange;
        this.#txt = inText;
    }   

    display() {
        super.display();
        textAlign(CENTER, MIDDLE);
        fill([255,255,255]);
        text(this.#txt, this.getPos()[0], this.getPos()[1]);
    }

    getStateChange() {
        return this.#stateChange;
    }
}