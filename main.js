var lockButton = document.querySelector('.main-display');

window.addEventListener('load', getNewHexes);

lockButton.addEventListener('click', function(event) {
    if (event.target.className === 'lock-box') {
        lockToggle(event.target);
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
        mainColorBoxes[i].firstElementChild.style.backgroundColor = `#${newColor}`;
        mainColorBoxes[i].lastElementChild.innerText = `#${newColor}`;
    }
}

function lockToggle(event) {
    if (event.getAttribute('src') === './assets/unlocked.png') {
        event.src = './assets/locked.png'
    } else {
        event.src = './assets/unlocked.png'
    }
}
