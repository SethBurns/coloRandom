// When the page initially loads, is refreshed, or the button is clicked: eventListener
// -- 5 random and new colors should appear
// -- the color’s hex codes should appear below each color box
// -- the current palette should be tracked somewhere in your Data Model and updated when a new palette is generated
var hexData = [];
var currentHexes;

var newPalatteButtonSection = document.querySelectorAll('section:last-of-type');
var newPalatteButton = document.querySelectorAll('.button-boxL, button, .button-boxL');
var mainColorBoxes = document.querySelectorAll('.box-title');

window.addEventListener('load', function () {
    console.log("getNewHexes()");
});

newPalatteButton.addEventListener('click', getNewHexes)

// newPalatteButtonSection.addEventListener('click', function(event) {
//     console.log(event);
// });


function getNewHexes() {
    currentHexes = [];
    for(i = 0; i <= 5; i++) {
        currentHexes.push(getRandomhex());
        console.log(mainColorBoxes[i]);
    }
}
