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
    if (event.target.classList.contains('hue')) {
        changeBrightness(event);
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
            mainDisplayedColors[i].lastElementChild.innerHTML = `<div class="lighter hue">🔆</div> #${newColor} <div class="darker hue">🔅</div>`;
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

function adjustHexColor(hexCode, isLighter) {
    console.log(hexCode)
    var red = parseInt(hexCode.slice(2, 4), 16);
    var green = parseInt(hexCode.slice(4, 6), 16);
    var blue = parseInt(hexCode.slice(6, 8), 16);
  
    var factor = isLighter ? 0.1 : -0.1;
    red = Math.round(red * (1 + factor));
    green = Math.round(green * (1 + factor));
    blue = Math.round(blue * (1 + factor));
  
    red = Math.min(Math.max(0, red), 255);
    green = Math.min(Math.max(0, green), 255);
    blue = Math.min(Math.max(0, blue), 255);
  
    var adjustedHexCode = "#" + rgbToHex([red, green, blue])
    return adjustedHexCode;
  }

  function changeBrightness(event) {
      console.log(event)
      var colorArray = event.target.parentNode.parentNode.parentNode.children;
      for (var i = 0; i < colorArray.length; i++) {
          var rbgColor = rgbToHex(rgbToNumbers(event.target.parentNode.parentNode.parentNode.children[i].children[0].style.backgroundColor));
          if (rbgColor === event.target.parentNode.parentNode.children[1].innerText.slice(4, 10)) {
            var position = i;
            break;
          }
        console.log(rbgColor)
      }
      if (event.target.classList.contains('darker')){
        var siblingHex = event.target.previousSibling.data;
          
        adjustColorBox(position, adjustHexColor(siblingHex, false), mainColorBoxes)
          console.log('this is dark')
        } else {
        var siblingHex = event.target.nextSibling.data;
        
        adjustHexColor(siblingHex, true) 
        console.log('this is light')
    }
  }

  function adjustColorBox(indexPosition, newHex, mainDisplayedColors) {
    mainDisplayedColors[indexPosition].
    // if (thisColorBoxLock.classList.contains('unlocked')) {
        // newHex = adjustHexColor
        mainDisplayedColors[indexPosition].firstElementChild.style.backgroundColor = `#${newHex}`;
        mainDisplayedColors[indexPosition].lastElementChild.innerHTML = `<div class="lighter hue">🔆</div> #${newHex} <div class="darker hue">🔅</div>`;
        currentPalette.splice(indexPosition, 1, newHex);
    // }
  }