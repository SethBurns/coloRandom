var lockButton = document.querySelector('.main-display');

lockButton.addEventListener('click', function(event) {
    if (event.target.className === 'lock-box') {
        lockToggle(event.target);
    }
});

function getRandomHex() {
    return (Math.floor(Math.random() * 16777216).toString(16).padStart(6, 0));
}

function lockToggle(event) {
    if (event.getAttribute('src') === './assets/unlocked.png') {
        event.src = './assets/locked.png'
    } else {
        event.src = './assets/unlocked.png'
    }
}
