var hexData = [];
var currentHexes = [];

var newPaletteButtonSection = document.querySelector('.button-area');
var newPaletteButton = document.querySelector('button');

var mainColorBoxes = document.querySelectorAll('.color-container');
var lockButton = document.querySelector('.main-palettes');

// new code on this branch
var savedPalettes = document.querySelector('.saved-containers')
// end

window.addEventListener('load', getNewHexes);

lockButton.addEventListener('click', function(event) {
    if (event.target.className === 'lock-box') {
        toggleLock(event.target);
    }
});

newPaletteButtonSection.addEventListener('click', function(event) {
    if(event.target.classList.contains('button-box-l') || event.target.id === 'new-palette' || event.target.classList.contains('button-box-r')) {
        getNewHexes();
    }
});

function getNewHexes() {
    currentHexes = [];
    var newColor;
    for(i = 0; i < mainColorBoxes.length; i++) {
        newColor = getRandomHex().toUpperCase();
        currentHexes.push(newColor);
        mainColorBoxes[i].firstElementChild.style.backgroundColor = `#${newColor}`;
        mainColorBoxes[i].lastElementChild.innerText = `#${newColor}`;
    }
}

function toggleLock(event) {
    if (event.getAttribute('src') === './assets/unlocked.png') {
        event.src = './assets/locked.png'
    } else {
        event.src = './assets/unlocked.png'
    }
}

function getRandomHex() {
    return (Math.floor(Math.random() * 16777216).toString(16).padStart(6, 0));
}


// new code on this branch
function savePalette() {
    if (!hexData.includes(currentHexes)) {
        hexData.push(currentHexes);
    }
    displayHexData();
}

function displayHexData() {
    savedPalettes.innerHTML = '';
    for (i = 0; i < hexData.length; i++) {
        savedPalettes.innerHTML +=
        `
        <section class="mini-container">
            <div class="mini-box"></div>
            <div class="mini-box"></div>
            <div class="mini-box"></div>
            <div class="mini-box"></div>
            <div class="mini-box"></div>
        </section>
        `
    }
}

// end