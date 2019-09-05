let canvas,ctx,objects,signalManager;

let signals = new Que();

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

function update() {
    objects.forEach((item) => {
        item.update();
    });
}

function draw() {
    clearCanvas();
    objects.forEach((item) => {
        item.draw();
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
    signalManager.registerObject(ball);
    objects.push(ball);
}

function createSignal() {
    signalManager = new Signal();
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

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

















