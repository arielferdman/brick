class CollisionDetector {

}

CollisionDetector.ball = null;
CollisionDetector.playerTopLinePoints = null;
CollisionDetector.canvasBorders = [];

CollisionDetector.init = () => {
    CollisionDetector.registerCanvasLines();
};

CollisionDetector.update = () => {
  CollisionDetector.findAndHandleCollisions();
};

CollisionDetector.findAndHandleCollisions = () => {
  CollisionDetector.findAndHandleBallPlayerCollision();
  CollisionDetector.findAndHandleBallCanvasEdgesCollision();
};

CollisionDetector.findAndHandleBallPlayerCollision = () => {
    CollisionDetector.handleCollision(
        CollisionDetector.playerTopLine,
        CollisionDetector.ball);
};

CollisionDetector.findAndHandleBallCanvasEdgesCollision = () => {
    CollisionDetector.canvasBorders.forEach((canvasBorderLine) => {
       CollisionDetector.handleCollision(
           canvasBorderLine,
           CollisionDetector.ball);
    });
};

CollisionDetector.handleCollision = (line, ball) => {
    let collision = CollisionDetector.isCollision(line, ball);
    if (collision.isCollision) {
        collision.collisionObject = line.belongsTo;
        let collisionAxes = CollisionDetector.getCollisionAxes(line);
        switch (collisionAxes) {
            case Collision.axes.switchX:
                collision.collisionAxis = collisionAxes;
                CollisionDetector.alignBallFromCollision(
                    line,
                    ball,
                    collision.collisionDistance,
                    collision.collisionAxis
                );
                CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallXAxis));
                break;
            case Collision.axes.switchY:
                collision.collisionAxis = collisionAxes;
                CollisionDetector.alignBallFromCollision(
                    line,
                    ball,
                    collision.collisionDistance,
                    collision.collisionAxis
                );
                CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallYAxis));
                break;
            case Collision.axes.switchBoth:
                collision.collisionAxis = collisionAxes;
                CollisionDetector.alignBallFromCollision(
                    line,
                    ball,
                    collision.collisionDistance,
                    collision.collisionAxis
                );
                CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallXAxis));
                break;
        }
    }
};

CollisionDetector.dispatchSignal = (signal) => {
    SignalManager.signals.push(signal);
};

CollisionDetector.updatePlayerTopLine = (line) => {
  CollisionDetector.playerTopLine = line;
};

CollisionDetector.updateBallCenterPoint = (ballCenterPoint) => {
  CollisionDetector.ballCenterPoint = ballCenterPoint;
};

CollisionDetector.registerBall = (ball) => {
  CollisionDetector.ball = ball;
};

CollisionDetector.getCollisionAxes = (line) => {
    let slope = CollisionDetector.getSlope(line);
    if (slope === Infinity)
        return Collision.axes.switchX;
    if (slope === 0)
        return Collision.axes.switchY;
    if (-1 < slope && slope < 1) {
        return Collision.axes.switchBoth;
    }
    else {
        return Collision.axes.switchY;
    }
};

CollisionDetector.getSlope = (line) => {
    let deltaX = line.pointA.x - line.pointB.x;
    if (deltaX === 0)
        return Infinity;
    let deltaY = line.pointA.y - line.pointB.y;
  let slope = deltaY / deltaX;

  return slope;
};

CollisionDetector.alignBallFromCollision = (line, ball, ballLineDistance, collisionAxis) => {
    let alignDistance = Math.abs(ballLineDistance - 1 - CollisionDetector.ball.r);
    let x = 0;
    let y = 0;

    if (collisionAxis === Collision.axes.switchX ||
        collisionAxis === Collision.axes.switchBoth) {
        if (ball.xDirection() === Ball.directions.left)
            x = alignDistance;
        else
            x = -1 * alignDistance;
    }

    if (collisionAxis === Collision.axes.switchY ||
        collisionAxis === Collision.axes.switchBoth) {
        if (ball.yDirection() === Ball.directions.down)
            y = -1 * alignDistance;
        else
            y = alignDistance;
    }
    CollisionDetector.dispatchSignal(
        new Signal(SignalManager.signalTypes.alignBall,
            {
                x: x,
                y: y,
            }));
};

CollisionDetector.returnCollisionObject = (isCollision, line = null, ball = null) => {
    if (isCollision)
        return new Collision(true, CollisionDetector.getCollisionAxes(line), line.belongsTo);
    return new Collision(false);
};

CollisionDetector.registerCanvasLines = () => {
    let bottomLine = new Line(
        new Point(0, canvas.height),
        new Point(canvas.width, canvas.height),
        Collision.objects.canvasBotLine);

    let leftLine = new Line(
        new Point(0, 0),
        new Point(0 ,canvas.height),
        Collision.objects.canvasLeftLine);

    let topLine = new Line(
        new Point(0, 0),
        new Point(canvas.width, 0),
        Collision.objects.canvasTopLine);

    let rightLine = new Line(
        new Point(canvas.width, 0),
        new Point(canvas.width, canvas.height),
        Collision.objects.canvasRightLine);

    CollisionDetector.canvasBorders.push(bottomLine);
    CollisionDetector.canvasBorders.push(leftLine);
    CollisionDetector.canvasBorders.push(topLine);
    CollisionDetector.canvasBorders.push(rightLine);
};

CollisionDetector.isCollision = (line, ball) => {

    if (CollisionDetector.isPointInsideCircle(line.pointA, ball) ||
        CollisionDetector.isPointInsideCircle(line.pointB, ball))
        return true;

    let lineLength = CollisionDetector.distance(line.pointA, line.pointB);

    let dotLineCircle = (((ball.x - line.pointA.x) * (line.pointB.x - line.pointA.x)) +
        ((ball.y - line.pointA.y) * (line.pointB.y - line.pointA.y))) /
        Math.pow(lineLength, 2);


    let closestX = line.pointA.x + (dotLineCircle * (line.pointB.x - line.pointA.x));
    let closestY = line.pointA.y + (dotLineCircle * (line.pointB.y - line.pointA.y));

    if (!CollisionDetector.isPointOnLineSegment({x: closestX, y: closestY}, line))
        return false;

    let distanceOfCircleCenterToClosestPointOnLine =
        CollisionDetector.distance({x: ball.x, y: ball.y}, {x: closestX, y: closestY});

    if (distanceOfCircleCenterToClosestPointOnLine <= ball.r)
        return new Collision(true, null,
                          null, distanceOfCircleCenterToClosestPointOnLine);
    else
        return new Collision(false);
};

CollisionDetector.isPointInsideCircle = (point, ball) => {
    let distanceOfPointFromCircleCenter = CollisionDetector.distance(point, {x: ball.x, y: ball.y});
    if (distanceOfPointFromCircleCenter <= ball.r)
        return true;
    return false;
};

CollisionDetector.distance = (pointA, pointB) => {
    let distance = Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
    return distance;
};

CollisionDetector.isPointOnLineSegment = (point, line) => {
    if (point.x >= line.pointA.x && point.x <= line.pointB.x &&
        point.y >= line.pointA.y && point.y <= line.pointB.y)
        return true;
    return false;
};








