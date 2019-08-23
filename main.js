let canvas,ctx;

let player = {
    x: 30,
    y: 700,
    w: 140,
    h: 40
}

let playerDrawArguments = [player.x, player.y, player.w, player.h];

window.onload = () => {
        canvas = document.getElementById('GameBoard');
        ctx = canvas.getContext('2d');
};