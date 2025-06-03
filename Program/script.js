// initialising global variables
const states = ['main menu', 'main simulation', 'learn menu', 'pause menu', 'simulation tutorial', 'physics information', 'newtonian mechanics']
const buttonColourDefault = [50,50,200];
const buttonColourHover = [25,25,100];

// 2d list of lists of buttons: buttons[i] is the list of buttons to be shown in state = i
let buttons = []
let state = 0;

// executed before setup to load assets in more modular way
function preload() {

}

// first function containing logic, is run immediately after preload by q5 library
function setup() {
    // q5 function and inbuilt variables
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    // initialising main menu buttons
    let mainMenuButtons = [];
    //new simulation button
    mainMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) - 0.5*(windowHeight/12), windowWidth / 3, windowHeight / 15, buttonColourDefault, buttonColourHover, 'new simulation', 1));
    // learn button
    mainMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) + 0.5*(windowHeight/12), windowWidth / 3, windowHeight / 15, buttonColourDefault, buttonColourHover, 'learn', 2));
    let learnMenuButtons = [];
    learnMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) - 0.5*(windowHeight/12), windowWidth / 3, windowHeight / 15, buttonColourDefault, buttonColourHover, 'main menu', 0));
    buttons[0] = mainMenuButtons;
    buttons[2] = learnMenuButtons;
}

// called once per frame
function update() {
    // execute different logic based on program state
    switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            break;
        case 2:  // learn menu
            break;
        case 3:  // pause menu
            break;
        case 4:  // simulation tutorial menu
            break;
        case 5:  // physics info menu
            break;
        case 6:  // newtonian mechanics menu
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
    // display buttons of current state
    drawButtons();
    switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            break;
        case 2:  // learn menu
            break;
        case 3:  // pause menu
            break;
        case 4:  // simulation tutorial menu
            break;
        case 5:  // physics info menu
            break;
        case 6:  // newtonian mechanics menu
            break;
        default:
            break;
    }
}

// draws buttons of current state
function drawButtons() {
    let stateButtons = buttons[state];
    if (!stateButtons) {
        return;
    }
    for (let button of stateButtons) {
        button.mouseOverlapping();
        button.display();
    }
}

// checks if clicked on buttons in current state
function buttonPressed() {
    let stateButtons = buttons[state];
    if (!stateButtons) {
        return;
    }
    for (let button of stateButtons) {
        if (button.mouseOverlapping()) {
            state = button.getStateChange();
        }
    }
}

// change button colour on mouse hover
function menuButtonColourLogic(buttonArr) {
    for (let button of buttonArr) {
        if (button.mouseOverlapping()) {
            button.setColour(testButtonHoverColour);
        } else {
            button.setColour(testButtonColour);
        }
    }
}

function mousePressed() {
    buttonPressed();

    switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            break;
        case 2:  // learn menu
            break;
        case 3:  // pause menu
            break;
        case 4:  // simulation tutorial menu
            break;
        case 5:  // physics info menu
            break;
        case 6:  // newtonian mechanics menu
            break;
        default:
            break;
    }
}

