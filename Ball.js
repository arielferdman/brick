class Ball extends GameObject {
    constructor(x,y,r,as,ae,color) {
        super();
        this.x = x;
        this.y = x;
        this.r = r;
        this.as = as;
        this.ae = ae;
        this.color = color;
        this.ballVelocity = {x: 0, y: 0};
        this.drawArguments = [this.x, this.y, this.r, this.as, this.ae];
    }

    update(lastStepTime) {
        super.update(lastStepTime);
        this.applyGravity();
        this.move();
        this.drawArguments = [this.x, this.y, this.r, this.as, this.ae];
    }

    draw(color) {
        super.draw();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(...this.drawArguments);
        ctx.stroke();
    }

    applyGravity() {
        this.ballVelocity.y += 0.2;
    }

    move() {
        this.x += Math.floor(this.ballVelocity.x);
        this.y += Math.floor(this.ballVelocity.y);
    }
}