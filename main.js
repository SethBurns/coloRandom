var hexData = [];
var currentHexes;

var newPaletteButtonSection = document.querySelector('.button-area');
var newPaletteButton = document.querySelector('button');

var mainColorBoxes = document.querySelectorAll('.color-container');

window.addEventListener('load', function () {
    console.log("getNewHexes()");
});

newPaletteButtonSection.addEventListener('click', function(event) {
    if(event.target.classList.contains('button-box-l') || event.target.id === 'new-palette' || event.target.classList.contains('button-box-r')) {
        getNewHexes();
    }
});

function getNewHexes() {
    currentHexes = [];
    mainColorBoxes.forEach((colorBox) => {
        var newColor = getRandomHex().toUpperCase();
        colorBox.firstElementChild.style.backgroundColor = `#${newColor}`;
        colorBox.lastElementChild.innerText = `#${newColor}`;
    });
}
