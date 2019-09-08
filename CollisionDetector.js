class CollisionDetector {

}

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
        CollisionDetector.ballCenterPoint);
};

CollisionDetector.findAndHandleBallCanvasEdgesCollision = () => {
    let stop;
    if (gameElapsedTime > 3500)
        stop = '';
    CollisionDetector.canvasBorders.forEach((canvasBorderLine) => {
       CollisionDetector.handleCollision(
           canvasBorderLine,
           CollisionDetector.ballCenterPoint);
    });
};

CollisionDetector.handleCollision = (line, ballCenterPoint) => {
    let collision = CollisionDetector.Collision(line, ballCenterPoint);
    if (collision.isCollision === true) {
        if (collision.collisionAxis === Collision.axes.xFromRight || 
            collision.collisionAxis === Collision.axes.xFromLeft)
            CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallXAxis));
        else
            CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallYAxis));
    }
};

CollisionDetector.dispatchSignal = (signal) => {
    SignalManager.signals.push(signal);
};

CollisionDetector.ballCenterPoint = null;
CollisionDetector.ballRadi = null;
CollisionDetector.playerTopLinePoints = null;
CollisionDetector.canvasBorders = [];

CollisionDetector.updatePlayerTopLine = (line) => {
  CollisionDetector.playerTopLine = line;
};

CollisionDetector.updateBallCenterPoint = (ballCenterPoint) => {
  CollisionDetector.ballCenterPoint = ballCenterPoint;
};

CollisionDetector.registerBall = (ballCenterPoint, ballRadi) => {
  CollisionDetector.ballCenterPoint = ballCenterPoint;
  CollisionDetector.ballRadi = ballRadi;
};

CollisionDetector.calculateSlopeAngleWithTwoPoints = (pointA, pointB) => {
    let deltaX = pointA.x - pointB.x;
    if (deltaX === 0)
        return Infinity;
    let slope = (pointA.y - pointB.y) / (deltaX);
    let angle = Math.atan(slope);
    return angle;
};

CollisionDetector.calculateLineSlope = (line) => {
    let deltaX = line.pointB.x - line.pointA.x;
  if (deltaX !== 0)
      return (line.pointB.y - line.pointA.y) / (deltaX);
};

CollisionDetector.calculateInnerTriangleAngle = (line, ballCenter) => {
    let lineAngle = CollisionDetector.calculateSlopeAngleWithTwoPoints(line.pointA, line.pointB);
    let ballCenterLineStartAngle = CollisionDetector.calculateSlopeAngleWithTwoPoints(line.pointA, ballCenter);

    return Math.abs(lineAngle - ballCenterLineStartAngle);
};

CollisionDetector.calculateHypotenuse = (line, ballCenter) => {
    return CollisionDetector.distanceBetweenTwoPoints(line.pointA, ballCenter);
};

CollisionDetector.distanceBetweenTwoPoints = (pointA, pointB) => {
    return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
};

CollisionDetector.getCollisionAxis = (line, ballCenter) => {
    if (line.pointB.x - line.pointA.x === 0) {
        if (ballCenter.x > line.pointA.x)
            return Collision.axes.xFromLeft;
        return Collision.axes.xFromRight;
    }

    let slope = CollisionDetector.calculateLineSlope(line);
    if (-1 < slope && slope < 1) {
        if (ballCenter.y > line.pointA.y)
            return Collision.axes.yFromBot;
        return Collision.axes.yFromTop;
    }
    else {
        if (ballCenter.x > line.pointA.x)
            return Collision.axes.xFromLeft;
        return Collision.axes.xFromRight;
    }
};

CollisionDetector.isLineHorizontalAndAboveTheBall = (line, ballCenter) => {
    if (line.pointA.y === line.pointB.y && ballCenter.y < line.pointA.y)
        return true;
    return false;
};

CollisionDetector.isBallXWithinLineSegmentProjection = (line, ballCenter) => {
    if (line.pointA.x <= ballCenter.x && ballCenter.x <= line.pointB.x)
        return true;
    return false;
};

CollisionDetector.checkCollisionWhenBallWithinLineProjection = (line, ballCenter) => {
    let hypotenuse = CollisionDetector.calculateHypotenuse(line, ballCenter);
    let innerTriangleAngle = CollisionDetector.calculateInnerTriangleAngle(line, ballCenter);
    if (innerTriangleAngle === 0)
        return new Collision(false);
    let ballLineDistance = hypotenuse * Math.sin(innerTriangleAngle);
    if (CollisionDetector.ballRadi >= ballLineDistance) {
        let CollisionAxis = CollisionDetector.getCollisionAxis(line, ballCenter);
        CollisionDetector.alignBallFromCollision(ballLineDistance, CollisionAxis);
        return new Collision(true, CollisionAxis, line.belongsTo);
    }
    else
        return new Collision(false);
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

CollisionDetector.findClosestLinePointXToBallX = (line, ballCenter) => {
    if (line.pointA.x - ballCenter.x > line.pointB.x - ballCenter.x)
        return line.pointB;
    return line.pointA;
};

CollisionDetector.returnCollisionObject = (isCollision, line = null, ballCenter = null) => {
    if (isCollision)
        return new Collision(true, CollisionDetector.getCollisionAxis(line, ballCenter), line.belongsTo);
    return new Collision(false);
};

CollisionDetector.checkCollisionOutSideOfLineProjection = (line, ballCenter) => {
  let distanceOfBallCenterFromClosestLineEdge = CollisionDetector.distanceBetweenTwoPoints(
      CollisionDetector.findClosestLinePointXToBallX(line, ballCenter),
      ballCenter
  );
  if (distanceOfBallCenterFromClosestLineEdge < CollisionDetector.ballRadi)
      return CollisionDetector.returnCollisionObject(true, line, ballCenter);
  return CollisionDetector.returnCollisionObject(false);
};

CollisionDetector.Collision = (line, ballCenter) => {
    if (CollisionDetector.isBallXWithinLineSegmentProjection(line, ballCenter))
        return CollisionDetector.checkCollisionWhenBallWithinLineProjection(line, ballCenter);
    return CollisionDetector.checkCollisionOutSideOfLineProjection(line, ballCenter);
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









