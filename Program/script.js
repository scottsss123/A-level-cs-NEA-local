// initialising global variables
const states = ['main menu', 'main simulation', 'learn menu', 'pause menu', 'simulation tutorial', 'physics information', 'newtonian mechanics', 'SI units']
const newtonsLawsOfMotionString = `Newton's laws of motion
------------------------
Isaac Newton formulated three 'laws' of motion, which all objects appear to follow. They are as follows:
 
1. Every object perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.
2. The change of motion of an object is proportional to the force impressed; and is made in the direction of the straight line in which the force is impressed.
3. To every action, there is always opposed an equal reaction; or, the mutual actions of two bodies upon each other are always equal, and directed to contrary parts.
 
The first of these laws describes the fact that objects that are either stationary or are otherwise moving at a constant velocity are in equillibrium. These objects will remain in equillibrium while the sum of forces acting on it, it's resultant force is zero. 
 
The second of these laws states that the acceleration of the body is proportional to the resultant force and inversely proportional to it's mass.
Describing the following equation:
    a = F / m
Relating the following:
    F, the resultant force acting on the body measured in newtons
    m, the mass of the body in kilograms
    a, the acceleration of the body in meters per second per second.

This can be rearranged to the following famous equation:
    F = ma
 
The third of these laws describes how if there is ever a force acting on a body, there is another force of equal magnitude but opposite direction acting on another body.
 
At a planetary scale ( like with this sandbox-simulation ) the main force acting on objects is the force between two massive bodies due to gravity, weight. This weight, between any two bodies, is proportional to the mass of each body and is inversely proportional to the square of the distance between them.
:   F = Gm₁m₂ / r² 
  where F is the force due to gravity on each body, in the direction between said body and the other
        G is the gravitational constant, some number ≈ 6.67430 * 10⁻¹¹
        m₁, m₂ are the masses of the two bodies
  and   r is the distance between thw two bodies.`;
const SIUnitsString = `SI Units
----------
SI is a french abbreviation for Système international d'unités, in english an international standard of units.`;
const simulationTutorialString = `Pause Menu               :  Escape
Stop / Start Simulation  :  Spacebar
Camera Movement          :  w, a, s, d  /  ↑, ←, ↓, →
Camera Zoom  (in / out)  :  scroll up   /  scroll down`;

// storing image data
let starFieldBackgroundImage;
let pauseIconImage,playIconImage,cameraIconImage;
let earthImage;
let moonImage;

let mainButtonWidth;
let mainButtonHeight;
// 2d list of lists of buttons: buttons[i] is the list of buttons to be shown in state = i
let buttons = [];
// 2d list of lists of textBoxes: "
let textBoxes = [];
let state = 0;
// textBox displaying program stateS
let stateIndicator;
// holds current simulation object
let currentSimulation;
// icon variables
let pauseIcon, playIcon, cameraIcon;
let iconWidth = 32;
let iconHeight = 32;
let icons = [];
// toolbar textBox setup
let timeRateTextBox, timeTextBox, camPosTextBox, camZoomTextBox;

// executed before setup to load assets in more modular way
function preload() {
    loadFont("./monoMMM_5.ttf");
    starFieldBackgroundImage = loadImage("./starfield.png");

    earthImage = loadImage("./earth.png");
    moonImage = loadImage("./moon.png");

    cameraIconImage = loadImage("./cameraIcon.png");
    pauseIconImage = loadImage("./pauseIcon.png");
    playIconImage = loadImage("./playIcon.png");
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
        physicsInfoMenuButtons.push(new Button(largeLeftButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, largeButtonWidth, mainButtonHeight, 'SI units', 7));

        // newtonian mechanics info menu buttons
        let newtonianMechanicsMenuButtons = [];
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY, mainButtonWidth, mainButtonHeight, 'physics info', 5));
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'learn', 2));
        newtonianMechanicsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 4 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // SI units info menu buttons
        let SIUnitsMenuButtons = [];
        SIUnitsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY, mainButtonWidth, mainButtonHeight, 'physics info', 5));
        SIUnitsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 2 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'learn', 2));
        SIUnitsMenuButtons.push(new Button(topRightMenuButtonX, topMenuButtonY + 4 * mainMenuButtonOffset, mainButtonWidth, mainButtonHeight, 'main menu', 0));

        // appending state button arrays to buttons array
        buttons[0] = mainMenuButtons;
        buttons[2] = learnMenuButtons;
        buttons[3] = pauseMenuButtons;
        buttons[4] = simTutorialMenuButtons;
        buttons[5] = physicsInfoMenuButtons;
        buttons[6] = newtonianMechanicsMenuButtons;
        buttons[7] = SIUnitsMenuButtons;
    }
    
    function initialiseMenuTextBoxes() {
        let learnMenuTextBoxX = 15;
        let learnMenuTextBoxY = 25;
        learnMenuTextBoxHeight = windowHeight - 2 * learnMenuTextBoxY;

        stateIndicator = new TextBox(3,0, windowWidth / 2, 20, states[state]);
        stateIndicator.toggleDisplayBox();

        let mainMenuTextBoxes = [];
        let titleTextBox = new TextBox(windowWidth/2, windowHeight / 6, windowWidth, windowHeight / 8, 'space simulator'.toLowerCase());
        titleTextBox.setTextSize(12*10);
        titleTextBox.toggleCentered();
        titleTextBox.toggleDisplayBox();
        mainMenuTextBoxes.push(titleTextBox);

        // intialising main simulation info display text boxes
        timeRateTextBox = new TextBox(3 * iconWidth, height - (mainButtonHeight/2) -( 0.5 * textLeading()), width/4, mainButtonHeight / 4, '');
        timeRateTextBox.toggleDisplayBox();
        timeTextBox = new TextBox(5*iconWidth, height- (mainButtonHeight/2) -( 0.5 * textLeading()), width/4, mainButtonHeight / 4, '');
        timeTextBox.toggleDisplayBox();
        camZoomTextBox = new TextBox(3 * width / 5 + 2 * iconWidth, height- (mainButtonHeight/2) -( 0.5 * textLeading()), width/4, mainButtonHeight/4, '');
        camZoomTextBox.toggleDisplayBox();
        camPosTextBox = new TextBox(3 * width / 5 + 4 * iconWidth, height - (mainButtonHeight /2) - (0.5* textLeading()), width/4, mainButtonHeight/4, '');
        camPosTextBox.toggleDisplayBox();
        let mainSimulationTextBoxes = [timeRateTextBox, timeTextBox, camZoomTextBox, camPosTextBox];

        let simulationTutorialTextBoxes = [];
        simulationTutorialTextBoxes.push(new TextBox(learnMenuTextBoxX, learnMenuTextBoxY, learnMenuTextBoxWidth, learnMenuTextBoxHeight, simulationTutorialString));

        let newtonianMechanicsTextboxes = [];
        newtonianMechanicsTextboxes.push(new TextBox(learnMenuTextBoxX, learnMenuTextBoxY, learnMenuTextBoxWidth, learnMenuTextBoxHeight, newtonsLawsOfMotionString));

        let SIUnitsTextBoxes = [];
        SIUnitsTextBoxes.push(new TextBox(learnMenuTextBoxX, learnMenuTextBoxY, learnMenuTextBoxWidth, learnMenuTextBoxHeight, SIUnitsString));

        textBoxes[0] = mainMenuTextBoxes;
        textBoxes[1] = mainSimulationTextBoxes;
        textBoxes[4] = simulationTutorialTextBoxes;
        textBoxes[6] = newtonianMechanicsTextboxes;
        textBoxes[7] = SIUnitsTextBoxes;
    }

    function initialiseMainSimulation() {
        currentSimulation = new Simulation();

        let earth = new Body('earth', [0,0], [0,0], 5.972e24, 12756274, earthImage, [0,0,255]);
        let moon = new Body('moon', [384400000, 0], [0,1.022e3], 7.35e22, 3474e3, moonImage, [220,220,220]);

        currentSimulation.addBody(earth);
        currentSimulation.addBody(moon);

        currentSimulation.getCamera().setZoom(1 * (1/1.1) ** 11);
        currentSimulation.getCamera().setPosition([0, 0]);
    }

    function initialiseIcons() {
        let toolbarIconHeight = height - (mainButtonHeight / 2);

        pauseIcon = new Icon(iconWidth, toolbarIconHeight, iconWidth, iconHeight, pauseIconImage);
        playIcon = new Icon(iconWidth * 2, toolbarIconHeight, iconWidth, iconHeight, playIconImage);
        cameraIcon = new Icon(3 * width / 5 + iconWidth, toolbarIconHeight, iconWidth, iconHeight, cameraIconImage);


        icons[0] = [pauseIcon, playIcon, cameraIcon];
    }

    // sets up menu button and text box attributes
    initialiseMenuButtons();
    initialiseMenuTextBoxes();
    initialiseMainSimulation();
    initialiseIcons();
}

// called once per frame
function update() {
    // execute different logic based on program state
    switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            // handle held keys, for camera movement
            mainSimKeyHeldHandler();
            // currently functionless
            currentSimulation.step();
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
        case 7:  // SI units menu
            break;
        default:
            break;
    }
}

// run once per frame, by default 60Hz, by q5 library, for drawing to canvas
function draw() {
    // program logic
    update();

    // starry background
    background(0);
    image(starFieldBackgroundImage, 0, 0, width, height);

    // display different elements based on program state   
    switch (state) {
        case 0:  // main menu
            break;
        case 1:  // main simulation
            drawCurrentSimBodies();
            drawCurrentSimToolbar();
            break;
        case 2:  // learn menu
            break;
        case 3:  // pause menu
            drawCurrentSimBodies();
            break;
        case 4:  // simulation tutorial menu
            break;
        case 5:  // physics info menu
            break;
        case 6:  // newtonian mechanics menu
            break;
        case 7:  // SI units menu
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
            if (pauseIcon.mouseOverlapping() && currentSimulation.getTimeRate() !== 0) {
                currentSimulation.setTimeRate(0);
            }
            if (playIcon.mouseOverlapping() && currentSimulation.getTimeRate() === 0) {
                currentSimulation.setPrevTimeRate();
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
        case 7:  // SI units menu
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
            switch (keyCode) {
                case 27: // escape
                    state = 3;
                    break;
                case 32: // spacebar
                    if (currentSimulation.getTimeRate() !== 0) {
                        currentSimulation.setTimeRate(0);
                    } else {
                        currentSimulation.setPrevTimeRate();
                    }
                    break;
            }
            break;
        case 2:  // learn menu
            break;
        case 3:  // pause menu
            if (keyCode === 27) { // escape
                state = 1;
            }
            break;
        case 4:  // simulation tutorial menu
            break;
        case 5:  // physics info menu
            break;
        case 6:  // newtonian mechanics menu
            break;
        case 7:  // SI units menu
            break;
        default:
            break;
    }
}

function drawCurrentSimBodies() {
    // display images and ellipse with the given position at the center not top left corner to reduce number of calculations
    imageMode(CENTER);
    ellipseMode(CENTER);

    // cache current simulation camera and bodies to not call .getCamera(), .getBodies() many times
    let camera = currentSimulation.getCamera();
    let bodies = currentSimulation.getBodies();

    for (let body of bodies) {
        // calculate body position and diameter on canvas using camera object methods
        let canvasPos = camera.getCanvasPosition(body);
        let canvasDiameter = camera.getCanvasDiameter(body);

        // display ellipse if body has no stored image, else display the image. both at calculated canvas position and diameter
        let bodyImage = body.getImage();
        if (bodyImage === 0) {
            fill(body.getColour());
            circle(canvasPos[0], canvasPos[1], canvasDiameter);
        } else {
            image(bodyImage, canvasPos[0], canvasPos[1], canvasDiameter, canvasDiameter);
        }
    }

    // return display modes to default for rest of program 
    imageMode(CORNER); // ask rhys about commenting on this fixed bug 
    ellipseMode(CORNER);
}

function drawToolbar() {
    rectMode(CORNER);
    fill(buttonColourDefault[0], buttonColourDefault[1], buttonColourDefault[2], 100);
    rect(0, height - mainButtonHeight, width, mainButtonHeight);
    rectMode(CENTER);
}

function drawToolbarIcons() {
    imageMode(CENTER);
    for (let icon of icons[0]) {
        icon.display();
    }
    imageMode(CORNER);
}

function drawCurrentSimToolbar() {
    let simTime = currentSimulation.getTime();
    let simTimeRate = currentSimulation.getTimeRate();
    let camera = currentSimulation.getCamera();
    let cameraPos = camera.getPos();
    let cameraZoom = camera.getZoom();

    drawToolbar();
    drawToolbarIcons();
    timeRateTextBox.updateContents("x"+simTimeRate.toFixed(3));
    timeTextBox.updateContents("simulation time elapsed (s): " + simTime.toFixed(3)); // number of seconds elapsed for now, to be 0000000:000:00:00:00
    camZoomTextBox.updateContents("x"+cameraZoom.toFixed(3));
    camPosTextBox.updateContents("( " + cameraPos[0].toFixed(1) + " , " + cameraPos[1].toFixed(1) + " )");
}

function mainSimKeyHeldHandler() {
    if (keyIsDown('d') || keyIsDown(RIGHT_ARROW)) {
        //                               for now move camera by radius of moon
        currentSimulation.getCamera().updatePosition([1740e3,0]);
    } 
    if (keyIsDown('a') || keyIsDown(LEFT_ARROW)) {
        currentSimulation.getCamera().updatePosition([-1740e3,0]);
    }
    if (keyIsDown('w') || keyIsDown(UP_ARROW)) {
        currentSimulation.getCamera().updatePosition([0,-1740e3]);
    }
    if (keyIsDown('s') || keyIsDown(DOWN_ARROW)) {
        currentSimulation.getCamera().updatePosition([0,1740e3]);
    }
}

let zoomInFactor = 1.1;
let zoomOutFactor = 1 / 1.1;
// q5 library function, run on any scroll wheel event where parameter event is an object containing information about the event.
function mouseWheel(event) {
    switch (state) {
        case 1:  // main simulation
            if (event.delta > 0) { // scroll down
                currentSimulation.getCamera().adjustZoom(zoomOutFactor);
            } else if (event.delta < 0) { // scroll up
                currentSimulation.getCamera().adjustZoom(zoomInFactor);
            }
            break;
    }
}
