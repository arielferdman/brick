class Collision {
    constructor(isCollision, collisionAxis = null, collisionObject = null) {
        this.isCollision = isCollision;
        this.collisionAxis = collisionAxis;
        this.collisionObject = collisionObject;
    }
}

Collision.axes = {
    switchX: 0,
    switchY: 1,
    switchBoth: 2,
};

Collision.objects = {
  playerTopLine: 0,
  canvasBotLine: 1,
  canvasLeftLine: 2,
  canvasTopLine: 3,
  canvasRightLine: 4,
};