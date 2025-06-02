let testBox;

// executed before setup to load assets in more modular way
function preload() {

}

// first function containing logic, is run immediately after preload by q5 library
function setup() {
    // q5 function and inbuilt variables
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    testBox = new Box(windowWidth / 2, windowHeight / 2, windowWidth / 5, windowWidth / 25, [50,50,200]);
}

// called once per frame
function update() {
    // colour test box according to relative mouse position for testing
    if (testBox.mouseOverlapping()) {
        testBox.setColour([25,25,100]);
    } else {
        testBox.setColour([50,50,200]);
    }
}

// run once per frame, by default 60Hz, by q5 library, for drawing to canvas
function draw() {
    // program logic
    update();

    // program display
    background(220);
    testBox.display();
}

