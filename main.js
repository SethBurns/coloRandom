var lockButton = document.querySelector('.main-display');

lockButton.addEventListener('click', function(event) {
    if (event.target.className === 'lock-box') {
        lockToggle(event);
    }
});

function getRandomHex() {
    return (Math.floor(Math.random() * 16777216).toString(16).padStart(6, 0));
}

function lockToggle(event) {
    if (event.target.src === 'file:///Users/jason/turing/1mod/projects/coloRandom/assets/unlocked.png') {
        event.target.src = 'file:///Users/jason/turing/1mod/projects/coloRandom/assets/locked.png'
    } else {
        event.target.src = 'file:///Users/jason/turing/1mod/projects/coloRandom/assets/unlocked.png'
    }
}