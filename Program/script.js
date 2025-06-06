// initialising global variables
const states = ['main menu', 'main simulation', 'learn menu', 'pause menu', 'simulation tutorial', 'physics information', 'newtonian mechanics']
const newtonsLawsOfMotionString =
`Newton's laws of motion
------------------------
Isaac Newton formulated three 'laws' of motion, which all objects appear to follow. They are as follows:
 
1. Every object perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.
2. The change of motion of an object is proportional to the force impressed; and is made in the direction of the straight line in which the force is impressed.
3. To every action, there is always opposed an equal reaction; or, the mutual actions of two bodies upon each other are always equal, and directed to contrary parts.
 
At a planetary scale ( like with this sandbox-simulation ) the main force acting on objects is the force due to gravity, weight. This weight, between any two bodies, is proportional to the mass of each body and is inversely proportional to the square of the distance between them.
F = G`;
let mainButtonWidth;
let mainButtonHeight;

// 2d list of lists of buttons: buttons[i] is the list of buttons to be shown in state = i
let buttons = [];
// 2d list of lists of textBoxes: "
let textBoxes = [];

let state = 0;
// textBox displaying program state
let stateIndicator;

// executed before setup to load assets in more modular way
function preload() {
    loadFont("./monoMMM_5.ttf");
}

// first function containing logic, is run immediately after preload by q5 library
function setup() {
    // q5 function and inbuilt variables
    createCanvas(windowWidth, windowHeight);
    // draw rectangle objects with their co-ordinates at their center
    rectMode(CENTER);
    
    let learnMenuTextBoxWidth;
    let learnMenuTextBoxHeight;
    function initialiseMenuButtons() {
        mainButtonWidth = windowWidth / 3;
        mainButtonHeight = windowHeight / 15;
        let mainMenuButtonX = windowWidth / 2;
        let mainMenuButtonOffset = 0.5 * (mainButtonHeight + 10);
        let topRightMenuButtonX = windowWidth - (mainButtonWidth / 2) - 40;
        let topMenuButtonY = mainButtonHeight / 2 + 20;
        let largeLeftButtonX = (topRightMenuButtonX - mainButtonWidth / 2) / 2;
        let largeButtonWidth = topRightMenuButtonX - mainButtonWidth / 2 - 20 - 20;
        learnMenuTextBoxWidth = largeButtonWidth;

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
    
    function initialiseMenuTextBoxes() {
        let learnMenuTextBoxX = 15;
        let learnMenuTextBoxY = 25;
        learnMenuTextBoxHeight = windowHeight - 2 * learnMenuTextBoxY;

        stateIndicator = new TextBox(3,0, windowWidth / 2, 20, states[state]);
        stateIndicator.toggleDisplayBox();

        let mainMenuTextBoxes = [];
        let titleTextBox = new TextBox(windowWidth/2, windowHeight / 4, windowWidth/2, windowHeight / 8, 'space simulation');
        titleTextBox.setTextSize(48);
        titleTextBox.toggleCentered();
        titleTextBox.toggleDisplayBox();
        mainMenuTextBoxes.push(titleTextBox);

        let simulationTutorialTextBoxes = [];
        simulationTutorialTextBoxes.push(new TextBox(learnMenuTextBoxX, learnMenuTextBoxY, learnMenuTextBoxWidth, learnMenuTextBoxHeight, 'Pause simulation  -  Escape'+'\n...'.repeat(50)));

        let newtonianMechanicsTextboxes = [];
        newtonianMechanicsTextboxes.push(new TextBox(learnMenuTextBoxX, learnMenuTextBoxY, learnMenuTextBoxWidth, learnMenuTextBoxHeight, newtonsLawsOfMotionString));

        textBoxes[0] = mainMenuTextBoxes;
        textBoxes[4] = simulationTutorialTextBoxes;
        textBoxes[6] = newtonianMechanicsTextboxes;
    }

    

    // sets up menu button and text box attributes
    initialiseMenuButtons();
    initialiseMenuTextBoxes();
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
    // display elements of current state
    drawButtons();
    drawTextBoxes();
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

// draw textBoxes in current state
function drawTextBoxes() {
    let stateTextBoxes = textBoxes[state];
    if (!stateTextBoxes) {
        return;
    }
    for (let textBox of stateTextBoxes) {
        textBox.display();
    }
}

function drawCurrentState() {
    stateIndicator.updateContents(states[state]);
    stateIndicator.display();
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
