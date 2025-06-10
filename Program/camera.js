class Camera {
    #pos;
    #zoom;
    #scaleFactor;
    #focus;

    constructor(inPos, inZoom) {
        this.#pos = inPos;
        this.#zoom = inZoom;
        // takes diameter of earth (meters) to 50 pixels
        this.#scaleFactor = 50 / 12756274;
        this.#focus = ''; // camera focus to be implemented later
    }
    updatePosition(displacement) {
        this.#pos[0] += displacement[0];
        this.#pos[1] += displacement[1];
    }
    setPosition(newPos) {
        this.#pos[0] = newPos[0];
        this.#pos[1] = newPos[1];
    }
    setZoom(inZoom) {
        this.#zoom = inZoom;
    }
    adjustZoom(sf) {
        this.#zoom = sf * this.#zoom;
    }
    getCanvasPosition(body) {
        // cache body position to not call getPos() twice
        let bodyPos = body.getPos();
        // calculate body x,y on canvas relative to camera position and zoom
        let canvasX = ((bodyPos[0] - this.#pos[0]) * this.#scaleFactor * this.#zoom) + (width / 2);
        let canvasY = ((bodyPos[1] - this.#pos[1]) * this.#scaleFactor * this.#zoom) + (height / 2);
        return [canvasX, canvasY]; 
    }
    getCanvasDiameter(body) {
        // calculate and return body canvas diameter based on camera zoom
        return body.getDiameter() * this.#scaleFactor * this.#zoom;
    }
    getPos() {
        return this.#pos;
    }
    getZoom() {
        return this.#zoom;
    }
    getScaleFactor() {
        return this.#scaleFactor;
    }
}