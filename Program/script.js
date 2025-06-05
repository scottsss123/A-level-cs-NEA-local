// initialising global variables
const states = ['main menu', 'main simulation', 'learn menu', 'pause menu', 'simulation tutorial', 'physics information', 'newtonian mechanics']
let mainButtonWidth;
let mainButtonHeight;

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
    // draw rectangle objects with their co-ordinates at their center
    rectMode(CENTER);
    
    function initialiseMenuButtons() {
        mainButtonWidth = windowWidth / 3;
        mainButtonHeight = windowHeight / 15;
        let mainMenuButtonX = windowWidth / 2;
        let mainMenuButtonOffset = 0.5 * (mainButtonHeight + 10);
        let topRightMenuButtonX = windowWidth - (mainButtonWidth / 2) - 40;
        let topMenuButtonY = mainButtonHeight / 2 + 20;
        let largeLeftButtonX = (topRightMenuButtonX - mainButtonWidth / 2) / 2;
        let largeButtonWidth = topRightMenuButtonX - mainButtonWidth / 2 - 20 - 20;

        // initialising main menu buttons
        let mainMenuButtons = [];
        //new simulation button
        mainMenuButtons.push(new Button(mainMenuButtonX, (windowHeight / 2) - mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'new simulation', 1));
        // learn button
        mainMenuButtons.push(new Button(mainMenuButtonX, (windowHeight / 2) + mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'learn', 2));

        // initialising learn menu buttons
        let learnMenuButtons = [];
        // simulation tutorial button
        learnMenuButtons.push(new Button(mainMenuButtonX, (windowHeight / 2) - mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'simulation tutorial', 4));
        // physics info button
        learnMenuButtons.push(new Button(mainMenuButtonX, (windowHeight / 2) + mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'physics information', 5));
        // main menu button
        learnMenuButtons.push(new Button(mainMenuButtonX, (windowHeight / 2) + 3 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // initialising pause menu buttons
        let pauseMenuButtons = [];
        // unpause button
        pauseMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) - mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'continue simulation', 1));
        // learn button
        pauseMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) + mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'learn', 2));
        // main menu button
        pauseMenuButtons.push(new Button(windowWidth / 2, (windowHeight / 2) + 3 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // simulation tutorial menu buttons
        let simTutorialMenuButtons = [];
        simTutorialMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY, mainButtonWidth, mainButtonHeight, 'learn', 2));
        simTutorialMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // physics info menu buttons
        let physicsInfoMenuButtons = [];
        physicsInfoMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY, mainButtonWidth, mainButtonHeight, 'learn', 2));
        physicsInfoMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));
        physicsInfoMenuButtons.push(new Button(largeLeftButtonX, topMenuButtonY, largeButtonWidth, mainButtonHeight, 'newtonian mechanics', 6));

        // newtonian mechanics info menu buttons
        let newtonianMechanicsMenuButtons = [];
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY, mainButtonWidth, mainButtonHeight, 'physics info', 5));
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'learn', 2));
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 4 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // appending state button arrays to buttons array
        buttons[0] = mainMenuButtons;
        buttons[2] = learnMenuButtons;
        buttons[3] = pauseMenuButtons;
        buttons[4] = simTutorialMenuButtons;
        buttons[5] = physicsInfoMenuButtons;
        buttons[6] = newtonianMechanicsMenuButtons;
    }

    // sets up menu buttons' attributes
    initialiseMenuButtons();
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
    // display buttons of current state
    drawButtons();
    drawCurrentState();
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

function drawCurrentState() {
    fill(255);
    textAlign(LEFT);
    textSize(12);
    
    text(states[state], 5, 10);
}

// checks if clicked on buttons in current state
function buttonsClicked() {
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

// q5 library function, run on mouse click
function mousePressed() {
    buttonsClicked();

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
// q5 library function, run once when any key pressed
function keyPressed() {
        switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            if (key == "Escape") {
                state = 3;
            }
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
