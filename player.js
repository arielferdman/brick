class Player extends Object {

    constructor(position, dimensions) {
        super();
        this.x = position.x;
        this.y = position.y;
        this.w = dimensions.w;
        this.h = dimensions.h;
    }

}

let playerDrawArguments = [30, 700, 140, 30];
let playerDrawArgsNames = {
    x: 0,
    y: 1,
    w: 2,
    h: 3
}
let playerMoveGap = 20;


function drawPlayer(color, drawArguments) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(...drawArguments);
    ctx.stroke();
}

function movePlayer(direction) {
    switch (direction) {
        case KeyboardKeyCodes.left:
            if (playerDrawArguments[playerDrawArgsNames.x] >= canvas.offsetLeft)
                playerDrawArguments[playerDrawArgsNames.x] -= playerMoveGap;
            break;
        case KeyboardKeyCodes.right:
            if (playerDrawArguments[playerDrawArgsNames.x] +
                playerDrawArguments[playerDrawArgsNames.w] +
                playerMoveGap <= canvas.offsetWidth)
                playerDrawArguments[playerDrawArgsNames.x] += playerMoveGap;
            break;
    }
}