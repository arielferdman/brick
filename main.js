let canvas,ctx,objects,signalManager;

let signals = new Que();

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
        canvas.width = 800;
        canvas.height = 800;
        ctx = canvas.getContext('2d');
        createObjectsByOrder();
        frame();
};

function frame() {
    update();
    draw();

    window.requestAnimationFrame(frame);
}

function moveBall() {
    ballDrawArguments[ballDrawArgNames.x] += Math.floor(ballVelocity.x);
    ballDrawArguments[ballDrawArgNames.y] += Math.floor(ballVelocity.y);
}

function update() {
    objects.forEach((item) => {
        item.update();
    });
}

function createObjectsByOrder() {
    createSignal();
    createInput();
    createPlayer();
    createBall();
}

function createBall() {
    let ball = new Ball(100, 75, 12, 0, 2 * Math.PI);
}

function createSignal() {
    let signalManager = new Signal();
}

function createInput() {
    let input = new Input();
    signalManager.registerObject(input);
    objects.push(input);
}

function createPlayer() {
    let position = {x: 30, y: 700};
    let dimensions = {w: 140, h: 30};
    let color = 'black';
    let player = new Player(position, dimensions, color);
    signalManager.registerObject(player);
    objects.push(player);
}

function draw() {
    clearCanvas();
    objects.forEach((item) => {
        item.draw();
    });
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


















