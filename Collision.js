class Collision {
    constructor(isCollision, collisionAxis = null, collisionObject = null) {
        this.isCollision = isCollision;
        this.collisionAxis = collisionAxis;
        this.collisionObject = collisionObject;
    }
}

Collision.axes = {
    xFromLeft: 0,
    xFromRight: 1,
    yFromTop: 2,
    yFromBot: 3,
};

Collision.objects = {
  playerTopLine: 0,
  canvasBotLine: 1,
  canvasLeftLine: 2,
  canvasTopLine: 3,
  canvasRightLine: 4,
};