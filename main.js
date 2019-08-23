let canvas,ctx;

let player = {
    x: 30,
    y: 700,
    w: 140,
    h: 30
}

let KeyboardKeyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
}

let currentKeyPress = '';

let playerDrawArguments = [player.x, player.y, player.w, player.h];

window.onload = () => {
        canvas = document.getElementById('GameBoard');
        canvas.width = 800;
        canvas.height = 800;
        ctx = canvas.getContext('2d');

        frame();
};

function frame() {

    update();
    draw();

    window.requestAnimationFrame(frame);
}

function update() {
    switch (currentKeyPress) {
        case KeyboardKeyCodes.left:
            move(KeyboardKeyCodes.left);
            break;
        case KeyboardKeyCodes.right:
            move(KeyboardKeyCodes.right);
            break;
    }
}

function draw(color) {

}

function drawPlayer(color) {
    ctx.style = color;
    ctx.rect(...playerDrawArguments);
    ctx.stroke();
}

function move() {
    ctx.style = 'white';
    ctx.rect(...playerDrawArguments);
    ctx.stroke
}

document.addEventListener('keypress', (event) => {currentKeyPress = event.code})
document.addEventListener('keyup', () => {currentKeyPress = ''})