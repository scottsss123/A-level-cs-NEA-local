let testButton;
let secondTestButton;
let thirdTestButton;
let mainButtonArr;
let secondButtonArr;
let testButtonColour = [50,50,200];
let testButtonHoverColour = [25,25,100];
let state = 0;

// executed before setup to load assets in more modular way
function preload() {

}

// first function containing logic, is run immediately after preload by q5 library
function setup() {
    // q5 function and inbuilt variables
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    testButton = new Button(windowWidth / 2, windowHeight / 2, windowWidth / 5, windowHeight / 10, testButtonColour, 'testButton', 1);
    secondTestButton = new Button(windowWidth / 2, windowHeight / 2, windowWidth / 5, windowHeight / 10, testButtonColour, 'secondTestButton', 0);
    thirdTestButton = new Button(windowWidth / 2, windowHeight / 2 + windowHeight / 10 + 10, windowWidth / 5, windowHeight / 10, testButtonColour, 'thirdTestButton', 1);
    mainButtonArr = [testButton, thirdTestButton];
    secondButtonArr = [secondTestButton];
}

// called once per frame
function update() {
    // execute different logic based on program state
    switch (state) {
        case 0:
            // colour test button according to relative mouse position for testing
            menuButtonLogic(mainButtonArr);
            break;
        case 1:
            menuButtonLogic(secondButtonArr);
            break;
        default:
            break;
    }
}

// run once per frame, by default 60Hz, by q5 library, for drawing to canvas
function draw() {
    // program logic
    update();

    // black background
    background(0);
    // display different elements based on program state
    switch (state) {
        case 0:
            for (let button of mainButtonArr) {
                
            }
            break;
        case 1:
            secondTestButton.display();
            break;
        default:
            break;
    }
}

function menuButtonLogic(buttonArr) {
    for (let button of buttonArr) {
        if (button.mouseOverlapping()) {
            button.setColour(testButtonHoverColour);
            if (mouseIsPressed) {  // comment on this bug
                state = button.getStateChange();
            }
        } else {
            button.setColour(testButtonColour);
        }
    }
}