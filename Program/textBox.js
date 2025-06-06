class TextBox extends Box {
    #contents;
    #textOffsetX;
    #textOffsetY;
    #textPos;
    #textSize;
    #centered;
    #displayBox;

    // public procedure method new
    constructor(inX, inY, inWidth, inHeight, inContents) {
        // parent class box's constructor
        // ,shifiting position as box's display function draws box with x,y position at center
        // ,textBoxes should be from the top left corner
        super(inX + inWidth / 2, inY + inHeight / 2, inWidth, inHeight, [30,30,30]);

        this.#centered = false;
        this.#displayBox = true;
        this.#textOffsetX = 5;
        this.#textOffsetY = 5;
        this.#textPos = [inX + this.#textOffsetX, inY + this.#textOffsetY];
        this.#contents = inContents;
        this.#textSize = 12;
    }

    // draw text to canvas
    display() {
        // display box
        if (this.#displayBox) {
            super.display();
        }

        if (!this.#centered) {
            textAlign('left', 'top');
        } else {
            textAlign('center', 'top');
        }

        // display text with proper alignment
        rectMode(CORNER);
        textSize(this.#textSize);
        fill(255);

        // display text, wrap text limited to text box width and height
        text(this.#contents, this.#textPos[0], this.#textPos[1], (this.getWidth() - 2 * this.#textOffsetX) / textWidth('a'), (this.getHeight() - 2 * this.#textOffsetY) / textLeading());

        // return to normal alignemnet
        textAlign('left', 'top');
        rectMode(CENTER);
    }

    updateContents(inContents) {
        this.#contents = inContents;
    }

    setTextSize(inSize) {
        this.#textSize = inSize;
    }

    toggleCentered() {
        if (this.#centered) {
            this.#centered = false;
        } else {
            this.#centered = true;
        }
    }

    toggleDisplayBox() {
        if (this.#displayBox) {
            this.#displayBox = false;
        } else {
            this.#displayBox = true;
        }
    }
}

