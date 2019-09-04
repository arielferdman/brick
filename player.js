class Player extends Object {

    constructor(position, dimensions, color) {
        super();
        this.x = position.x;
        this.y = position.y;
        this.w = dimensions.w;
        this.h = dimensions.h;
        this.color = color;
        this.moveGap = 20;
    }

    update() {
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

    receiveSignal(signalData) {

    }
}



function movePlayer(direction) {
    switch (direction) {
        case KeyboardKeyCodes.left:

            break;
        case KeyboardKeyCodes.right:

            break;
    }
}