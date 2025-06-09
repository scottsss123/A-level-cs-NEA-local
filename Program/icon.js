class Icon  extends Box {
    #image;

    constructor(inX, inY, inWidth, inHeight, inImage) {
        super(inX, inY, inWidth, inHeight, [255,255,255]);
        this.#image = inImage;
    }

    display() {
        let pos = this.getPos();
        let imageWidth = this.getWidth();
        let imageHeight = this.getHeight();
        image(this.#image, pos[0], pos[1], imageWidth, imageHeight);
    }
}