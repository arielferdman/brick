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
    let stop;
    if (gameElapsedTime > 1500)
        stop = '';
    CollisionDetector.canvasBorders.forEach((canvasBorderLine) => {
       CollisionDetector.handleCollision(
           canvasBorderLine,
           CollisionDetector.ballCenterPoint);
    });
};

CollisionDetector.handleCollision = (line, ball) => {
    let isCollision = CollisionDetector.isCollision(line, ball);
    if (isCollision) {
        let collisionAxes = CollisionDetector.getCollisionAxes(line);
        switch (collisionAxes) {
            case Collision.axes.switchX:
                CollisionDetector.dispatchSignal(SignalManager.signalTypes.switchBallXAxis);
                break;
            case Collision.axes.switchY:
                CollisionDetector.dispatchSignal(SignalManager.signalTypes.switchBallXAxis);
                break;
            case Collision.axes.switchBoth:
                CollisionDetector.dispatchSignal(SignalManager.signalTypes.switchBallXAxis);
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

CollisionDetector.alignBallFromCollision = (ballLineDistance, CollisionAxis) => {
    let alignDistance = ballLineDistance - 1 - CollisionDetector.ballRadi;
    let x = 0;
    let y = 0;
    if (CollisionAxis === Collision.axes.xFromLeft)
        x = alignDistance;
    else if (CollisionAxis === Collision.axes.xFromRight)
        x = -1 * alignDistance;
    else if  (CollisionAxis === Collision.axes.yFromTop)
        y = alignDistance;
    else if (CollisionAxis === Collision.axes.yFromBot)
        y = -1 * alignDistance;
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
        new Point(0, canvas.height),
        new Point(0 ,0),
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

    let dotLineCircle = (((ball.center.x - line.pointA.x) * (line.pointB.x - line.pointA.x)) +
        ((ball.center.y - line.pointA.y) * (line.pointB.y - line.pointA.y))) /
        Math.pow(lineLength, 2);


    let closestX = line.pointA.x + (dotLineCircle * (line.pointB.x - line.pointA.x));
    let closestY = line.pointA.y + (dotLineCircle * (line.pointB.y - line.pointA.y));

    if (!CollisionDetector.isPointOnLineSegment({x: closestX, y: closestY}, line))
        return false;

    let distanceOfCircleCenterToClosestPointOnLine =
        CollisionDetector.distance(ball.center, {x: closestX, y: closestY});

    if (distanceOfCircleCenterToClosestPointOnLine <= ball.radi)
        return true;
    else
        return false;
};

CollisionDetector.isPointInsideCircle = (point, ball) => {
    let distanceOfPointFromCircleCenter = CollisionDetector.distance(point, ball.center);
    if (distanceOfPointFromCircleCenter <= ball.radi)
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








