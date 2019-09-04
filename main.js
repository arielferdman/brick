let canvas,ctx,objects,eventManager;

let ballDrawArguments = [100, 75, 12, 0, 2 * Math.PI];
let ballDrawArgNames = {
    x:  0,
    y:  1,
    r:  2,
    as: 3,
    ae: 4
}

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

}

function createEventManager() {
    eventManager = new EventManager();
}

function createInput() {
    let input = new Input();
    objects.push(input);

}

function createPlayer() {
    let position = {x: 30, y: 700};
    let dimensions = {w: 140, h: 30};
    let color = 'black';
    objects.push(new Player(position, dimensions, color));
}

function draw() {
    clearCanvas();
    drawPlayer('black', playerDrawArguments);
    drawBall('black', ballDrawArguments);
}

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function drawBall(color, drawArguments) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(...drawArguments);

    ctx.stroke();
}

function keypress(event) {
    currentKeyPress = event.code;
}

function keyRelease() {
    currentKeyPress = '';
}


















