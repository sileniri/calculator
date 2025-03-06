// CALCULATOR PROGRAM

// CALCULATOR

const cursor = document.getElementById("cursor");
let cursorPlacement = 0;
const display = document.getElementById("display");
getTextWidth();
updateCursor();

function getTextWidth() {
    text = document.createElement("span");
    document.body.appendChild(text);

    text.style.font = "Roboto Mono";
    text.style.fontSize = 50 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = '1';

    width = Math.ceil(text.clientWidth);

    document.body.removeChild(text);
    return width;
}

function moveCursor(direction) {
    if (direction === 'right') {
        if (cursorPlacement < display.value.length) {
            cursorPlacement++;
        }
    } else {
        if (cursorPlacement > 0) {
            cursorPlacement--;
        }
    }
    updateCursor();
}

function updateCursor() {
    cursor.style.left = `${cursorPlacement * width}px`;
}

function appendToDisplay(input) {
    // Trying to remove decleration of "removedStuff", "cursorAtRight" and "amount" from here (trying to create function that does that);
    let removedStuff;
    const cursorAtRight = cursorPlacement === (display.value).length;
    if (!cursorAtRight) {
        const amount = cursorPlacement - (display.value).length;
        removedStuff = (display.value).slice(amount);
        display.value = (display.value).substring(0, (display.value).length - (0 - amount));
    }
    cursorPlacement = cursorPlacement + input.length;
    if (input.includes("()")) {
        cursorPlacement--;
    }
    updateCursor();
    display.value += input;
    if (!cursorAtRight) {
        display.value += removedStuff;
    }
}

function allClear(){
    cursorPlacement = 0;
    cursor.style.left = `0`;
    display.value = "";
}

function clearEntry() {
    let removedStuff;
    const cursorAtRight = cursorPlacement === (display.value).length;
    if (!cursorAtRight) {
        const amount = cursorPlacement - (display.value).length;
        removedStuff = (display.value).slice(amount);
        display.value = (display.value).substring(0, (display.value).length - (0 - amount));
    }
    display.value = (display.value).substring(0, (display.value).length - 1);
    moveCursor('left');
    if (!cursorAtRight) {
        display.value += removedStuff;
    }
}

function change(x, y) {
    display.value = display.value.replace(x, y);
}

function calculate(){
    change("π", Math.PI);
    change("e", Math.E);
    change("×", "*");
    change("÷", "/");
    try{
        /* Code for rounded calc {
        test = eval(display.value);
        logt = 8-Math.floor(Math.log10( test));
        corr = Math.pow(10,logt);
        display.value = Math.round(test*corr)/corr;
        }*/ 
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
    cursorPlacement = display.value.length;
    updateCursor();
}

// OPTIONS

// Open menu
function openMenu() {
    document.querySelector('.options').classList.toggle('active');
    document.querySelector('#openIcon').classList.toggle('active');
    document.querySelector('#closeIcon').classList.toggle('active');
}

// Change/swap theme

const html = document.documentElement;

function setTheme(theme) {
    // setThemeColour('--main-btn', 'n');
    // setThemeColour('--operator-btn', 'null');
    html.classList.remove('custom');
    if (theme === 'Dark') {
        html.classList.remove('light');
    } else if (theme === 'Light') {
        html.classList.add('light');
    }
    document.querySelector('#theme-btn').innerHTML = `${theme} Theme`;
}


function setType(type) {
    if (type === "Scientific") {
        document.querySelector('.keys').classList.add('sci');
    } else {
        document.querySelector('.keys').classList.remove('sci');
    }
    document.querySelector('#type-btn').innerHTML = type;
}

function settingsPopup(task) {
    if (task === 'open') {
        document.querySelector('.settingsPopup').classList.remove('hidden');
    } else if (task === 'close') {
        document.querySelector('.settingsPopup').classList.add('hidden');
    }
}

function setThemeColour(variable, colour) {
    document.querySelector(':root').style.setProperty(variable, colour);
}

function setCustomTheme() {
    if (window.confirm('Are you sure?')) {
        document.documentElement.classList.remove('light');
        // document.documentElement.classList.add('custom');
        const mainBtnColour = document.getElementById('main-btns').value;
        setThemeColour('--main-btn', mainBtnColour);
        const operatorBtnColour = document.getElementById('operator-btns').value;
        setThemeColour('--operator-btn', operatorBtnColour);
    }
}