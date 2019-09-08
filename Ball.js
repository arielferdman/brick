class Ball extends GameObject {
    constructor(x,y,r,as,ae,color) {
        super();
        this.x = x;
        this.y = x;
        this.r = r;
        this.as = as;
        this.ae = ae;
        this.color = color;
        this.ballVelocity = {x: 1, y: 6};
        this.drawArguments = [this.x, this.y, this.r, this.as, this.ae];
    }

    update(lastStepTime) {
        super.update(lastStepTime);
        this.applyGravity();
        this.move();
        this.drawArguments = [this.x, this.y, this.r, this.as, this.ae];
        this.dispatchSignal(new Signal(SignalManager.signalTypes.updateBallCenterPoint, new Point(this.x, this.y)))
    }

    draw() {
        super.draw();
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(...this.drawArguments);
        ctx.stroke();
    }

    applyGravity() {
        // this.ballVelocity.y += 0.2;
    }

    move() {
        this.x += Math.floor(this.ballVelocity.x);
        this.y += Math.floor(this.ballVelocity.y);
    }

    switchXAxis() {
        this.ballVelocity.x *= -1;
    }

    switchYAxis() {
        this.ballVelocity.y *= -1;
    }

    align(x, y) {
        this.x += x;
        this.y += y;
    }
}



























