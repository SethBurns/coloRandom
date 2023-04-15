var savedPalettes = [];
var currentPalette = [];
var shouldDelete = false;

var main = document.querySelector('main');
var savedContainer = document.querySelector('.save-container');
var buttonSection = document.querySelector('.button-area');
var newPaletteButton = document.querySelector('button');
var mainColorBoxes = document.querySelectorAll('.color-container');
var lockButton = document.querySelector('.main-display');
var savedPalettesSection = document.querySelector('.mini-palettes');
var deleteModal = document.querySelector('.modal-window');
var paragraph = document.querySelector('p');

window.addEventListener('load', function() {
    getNewHexes(mainColorBoxes);
});

lockButton.addEventListener('click', function(event) {
    if (event.target.classList.contains('lock-box')) {
        toggleLock(event.target);
    }
});

buttonSection.addEventListener('click', function(event) {
    if (event.target.classList.contains('new-palette')) {
        getNewHexes(mainColorBoxes);
    }
});

buttonSection.addEventListener('click', function(event) {
    if (event.target.classList.contains('save-palette')) {
        savePalette();
    }
});

savedPalettesSection.addEventListener('click', async function(event) {
    if (event.target.classList.contains('delete-button')) {
        modalClassToggler();
        await getPromiseFromEvent(deleteModal);
        if (shouldDelete) {
            var eventTargetParent = event.target.parentNode.parentNode;
            var thisSavedPaletteIndex = Array.from(eventTargetParent.parentNode.children).indexOf(eventTargetParent);
            deletePalette(eventTargetParent, thisSavedPaletteIndex);
        } 
        modalClassToggler();
        shouldDelete = false;
    } else if (event.target.classList.contains('mini-box')) {
        displayMainColours(getSavedPalette(event));
    }
});

function getPromiseFromEvent(event) {

    return new Promise(function (resolve) {
        event.addEventListener('click', listener);

        function listener(event) {
            if (event.target.classList.contains('modal-exit-button')) {
                shouldDelete = false;
                resolve(event);
            } else if (event.target.classList.contains('delete-palette-button')) {
                shouldDelete = true;
                resolve(event);
            }
        };
    });
}

function modalClassToggler() {
    deleteModal.classList.toggle('hidden');
    main.classList.toggle('block');
    savedContainer.classList.toggle('block');
}

function getNewHexes(mainDisplayedColors) {
    var oldHexes = currentPalette;
    currentPalette = [];
    var newColor;
    for (i = 0; i < mainDisplayedColors.length; i++) {
        var thisColorBoxLock = mainDisplayedColors[i].firstElementChild.firstElementChild;
        if (thisColorBoxLock.classList.contains('unlocked')) {
            newColor = getRandomHex();
            mainDisplayedColors[i].firstElementChild.style.backgroundColor = `#${newColor}`;
            mainDisplayedColors[i].lastElementChild.innerText = `#${newColor}`;
            currentPalette.push(newColor);
        } else { 
            currentPalette.push(oldHexes[i]);
        }
    }
}

function toggleLock(event) {
    if (event.getAttribute('src') === './assets/unlocked.png') {
        event.src = './assets/locked.png';
    } else {
        event.src = './assets/unlocked.png'; 
    }
    event.classList.toggle('unlocked');
}

function getRandomHex() {
    return (Math.floor(Math.random() * 16777216).toString(16).padStart(6, 0)).toUpperCase();
}

function savePalette() {
    if (!savedPalettes.length) {
        paragraph.classList.add('hidden');
    } 
    if (isPaletteUnique(savedPalettes, currentPalette)) {
        savedPalettes.push(currentPalette);
        addPaletteToSavedPalettes(currentPalette);
    }
    getNewHexes(mainColorBoxes);
}

function isPaletteUnique(palettesList, singlePalette) {
    for (i = 0; i < palettesList.length; i++) {
        var matches = true;
        for (j = 0; j < palettesList[i].length; j++) {
            if (palettesList[i][j] !== singlePalette[j]) {
                matches = false;
                break;
            }
        }
        if (matches) {
            return false;
        }
    }    
    return true;
}

function deletePalette(savedPalette, savedPalettesIndex) {
    savedPalettes.splice(savedPalettesIndex, 1);
    savedPalette.remove();
    if (!savedPalettes.length) {
        paragraph.classList.remove('hidden');
    }
}

function addPaletteToSavedPalettes(palette) {
    var newMiniContainer = document.createElement('div');
    var newMiniColorsContainer = document.createElement('div');
    var newHoverContainer = document.createElement('div');

    newMiniContainer.classList.add('mini-container');
    newHoverContainer.classList.add('hover');
    newMiniColorsContainer.classList.add('hover', 'mini-colors');
    
    savedPalettesSection.appendChild(newMiniContainer);    
    newMiniContainer.appendChild(newMiniColorsContainer);

    for (i = 0; i < palette.length; i++) {
        newMiniColorsContainer.innerHTML += `<div class="mini-box", style="background-color: #${palette[i]}"></div>`;
    }

    newMiniContainer.appendChild(newHoverContainer);
    newHoverContainer.innerHTML += `<img class="delete-button" src='./assets/delete.png'></img>`;
}

function getSavedPalette(event) {
    var color;
    var savedColors = [];
    if (event.target.classList.contains('mini-box')) {
        for (var i = 0; i < event.target.parentNode.children.length; i++) {
            color = event.target.parentNode.children[i].style.backgroundColor;
            savedColors[i] = rgbToHex(rgbToNumbers(color));
        }
    }
    return savedColors;
}

function rgbToNumbers(rgbString) {
    var rgbArray = rgbString.substring(4, rgbString.length -1 ).split(',');
    var rgbNumbers = [];
    for (var i = 0; i < rgbArray.length; i++) {
        rgbNumbers.push(Number(rgbArray[i]));
    }
    return rgbNumbers;
}

function rgbToHex(rgbNumbers) {
    rgbToHexString = '';
    for (var i = 0; i < rgbNumbers.length; i++) {
        rgbToHexString += rgbNumbers[i].toString(16).padStart(2, 0);
    }

    return rgbToHexString.toUpperCase();
}  

function displayMainColours(savedPalette) {
    currentPalette = savedPalette;
    for (i = 0; i < savedPalette.length; i++) {
        mainColorBoxes[i].firstElementChild.style.backgroundColor = `#${savedPalette[i]}`;
        mainColorBoxes[i].lastElementChild.innerText = `#${savedPalette[i]}`;
    }
}
