let canvas, ctx, objects = [], lines = [];

// for debug purpose
let startTime = Date.now();
let gameElapsedTime = 0;
// for debug purpose

function initCollisionDetector() {
    CollisionDetector.init();
}

window.onload = () => {
        canvas = document.getElementById('GameBoard');
        canvas.width = 800;
        canvas.height = 800;
        ctx = canvas.getContext('2d');
        createObjectsByOrder();
        initCollisionDetector();
        frame();
};

function frame() {
    gameElapsedTime = Date.now() - startTime;
    update();
    draw();

    window.requestAnimationFrame(frame);
}

function update() {
    objects.forEach((item) => {
        item.update();
    });
    SignalManager.update();
    CollisionDetector.update();
    SignalManager.update();
}

function draw() {
    clearCanvas();
    objects.forEach((item) => {
        item.draw();
    });
}

function createObjectsByOrder() {
    createInput();
    createPlayer();
    createBall();
}

function createBall() {
    // let ball = new Ball(100, 75, 12, 0, 2 * Math.PI, 'black');
    let ball = new Ball(100, 675, 12, 0, 2 * Math.PI, 'black');
    SignalManager.registerObject(ball);
    objects.push(ball);
    CollisionDetector.registerBall(new Point(ball.x, ball.y), ball.r)
}

function createInput() {
    let input = new Input();
    SignalManager.registerObject(input);
    objects.push(input);
    this.addEventListener('keypress', this.keypress);
}

function createPlayer() {
    let position = {x: 70, y: 700};
    let dimensions = {w: 140, h: 30};
    let color = 'black';
    let player = new Player(position, dimensions, color);
    SignalManager.registerObject(player);
    objects.push(player);
}

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function keypress(event) {
    SignalManager.input.keypress(event);
}
















