class Player extends GameObject {
    signalLimitationsRules;

    constructor(position, dimensions, color) {
        super();
        this.x = position.x;
        this.y = position.y;
        this.w = dimensions.w;
        this.h = dimensions.h;
        this.color = color;
        this.moveGap = 20;
        this.drawArguments = [this.x, this.y, this.w, this.h];
    }


    update(lastStepTime) {
        super.update(lastStepTime);
        this.drawArguments = [this.x, this.y, this.w, this.h];
        this.dispatchSignal(new Signal(SignalManager.signalTypes.updatePlayerTopLine, this.getTopLine()));
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.rect(...this.drawArguments);
        ctx.stroke();
    }

    moveRight() {
        this.x += this.moveGap;
        if (this.x + this.w > canvas.width)
            this.x = canvas.width - this.w - 1;
    }

    moveLeft() {
        this.x -= this.moveGap;
        if (this.x < 0)
            this.x = 1;
    }

    getTopLine() {
        return new Line(new Point(this.x, this.y), new Point(this.x + this.w, this.y));
    }
}

