class Ball extends GameObject {
    constructor(x, y, r, as, ae, color) {
        super();
        this.x = x;
        this.y = y;
        this.r = r;
        this.as = as;
        this.ae = ae;
        this.color = color;
        this.ballVelocity = {x: 3, y: 6};
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

    switchBothAxes() {
        this.switchXAxis();
        this.switchYAxis();
    };

    align(x, y) {
        this.x += x;
        this.y += y;
    }

    xDirection() {
        if (this.ballVelocity.x > 0)
            return Ball.directions.right;
        else
            return Ball.directions.left;
    }

    yDirection() {
        if (this.ballVelocity.y > 0)
            return Ball.directions.down;
        else
            return Ball.directions.up;
    }
}

Ball.directions = {
  right: 0,
  left: 1,
  up: 2,
  down: 3,
};
























