let canvas,ctx;

let KeyboardKeyCodes = {
    left: 'Numpad4',
    up: 'Numpad8',
    right: 'Numpad6',
    down: 'Numpad2'
}

let currentKeyPress = '';

let playerDrawArguments = [30, 700, 140, 30];
let playerDrawArgsNames = {
    x: 0,
    y: 1,
    w: 2,
    h: 3
}

let ballDrawArguments = [100, 75, 12, 0, 2 * Math.PI];
let ballDrawArgNames = {
    x:  0,
    y:  1,
    r:  2,
    as: 3,
    ae: 4
}

let playerMoveGap = 20;

let ballVelocity = {x: 0, y: 0};

window.onload = () => {
        canvas = document.getElementById('GameBoard');
        canvas.width = 801;
        canvas.height = 800;
        ctx = canvas.getContext('2d');

        frame();
};

function frame() {
    update();
    draw();

    window.requestAnimationFrame(frame);
}

function applyGravityToBall() {
    ballVelocity.y += 0.2;
}

function moveBall() {
    ballDrawArguments[ballDrawArgNames.x] += Math.floor(ballVelocity.x);
    ballDrawArguments[ballDrawArgNames.y] += Math.floor(ballVelocity.y);
}

function update() {
    applyGravityToBall();
    moveBall();
    switch (currentKeyPress) {
        case KeyboardKeyCodes.left:
            movePlayer(KeyboardKeyCodes.left);
            currentKeyPress = '';
            break;
        case KeyboardKeyCodes.right:
            movePlayer(KeyboardKeyCodes.right);
            currentKeyPress = '';
            break;
    }
}

function draw() {
    clearCanvas();
    drawPlayer('black', playerDrawArguments);
    drawBall('black', ballDrawArguments);
}

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function drawPlayer(color, drawArguments) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(...drawArguments);
    ctx.stroke();
}

function drawBall(color, drawArguments) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(...drawArguments);

    ctx.stroke();
}

function movePlayer(direction) {
    switch (direction) {
        case KeyboardKeyCodes.left:
            if (playerDrawArguments[playerDrawArgsNames.x] >= canvas.offsetLeft)
                playerDrawArguments[playerDrawArgsNames.x] -= playerMoveGap;
            break;
        case KeyboardKeyCodes.right:
            if (playerDrawArguments[playerDrawArgsNames.x] +
                playerDrawArguments[playerDrawArgsNames.w] +
                playerMoveGap <= canvas.offsetWidth)
                    playerDrawArguments[playerDrawArgsNames.x] += playerMoveGap;
            break;
    }
}

function keypress(event) {
    currentKeyPress = event.code;
}

function keyRelease() {
    currentKeyPress = '';
}

document.addEventListener('keypress', keypress);
document.addEventListener('keyup', keyRelease);
















