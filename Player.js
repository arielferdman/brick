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
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.rect(...this.drawArguments);
        ctx.stroke();
    }

    moveRight() {
        if (this.x + this.w + this.moveGap <= canvas.offsetWidth)
            this.x += this.moveGap;
    }

    moveLeft() {
        if (this.x >= canvas.offsetLeft)
            this.x -= this.moveGap;
    }
}

