class Collision {
    constructor(isCollision, collisionAxis) {
        this.isCollision = isCollision;
        this.collisionAxis = collisionAxis;
    }
}

Collision.axes = {
    x: 0,
    y: 1,
};