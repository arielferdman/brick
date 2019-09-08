class CollisionDetector {

}

CollisionDetector.update = () => {
  CollisionDetector.findAndHandleCollisions();
};

CollisionDetector.findAndHandleCollisions = () => {
  CollisionDetector.findAndHandleBallPlayerCollision();
};

CollisionDetector.findAndHandleBallPlayerCollision = () => {
    let collision = CollisionDetector.Collision(CollisionDetector.playerTopLine, CollisionDetector.ballCenterPoint);
    if (collision.isCollision === true)
        if (collision.collisionAxis === Collision.axes.x)
            CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallXAxis));
        else
            CollisionDetector.dispatchSignal(new Signal(SignalManager.signalTypes.switchBallYAxis));

};

CollisionDetector.dispatchSignal = (signal) => {
    SignalManager.signals.push(signal);
};

CollisionDetector.ballCenterPoint = null;
CollisionDetector.ballRadi = null;
CollisionDetector.playerTopLinePoints = null;
CollisionDetector.canvasBorders = null;

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

CollisionDetector.getCollisionAxis = (line) => {
    if (line.pointB.x - line.pointA.x === 0)
        return Collision.axes.x;
    let slope = CollisionDetector.calculateLineSlope(line);
    if (-1 < slope < 1)
        return Collision.axes.x;
    else
        return Collision.axes.y;
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
        return new Collision(false, null);
    let ballLineDistance = hypotenuse * Math.sin(innerTriangleAngle);
    if (CollisionDetector.ballRadi >= ballLineDistance) {
        CollisionDetector.alignBallFromCollision(ballLineDistance);
        return new Collision(true, CollisionDetector.getCollisionAxis(line, ballCenter));
    }
    else
        return new Collision(false, null);
};

CollisionDetector.alignBallFromCollision = (ballLineDistance) => {
    let test = ballLineDistance - 1 - CollisionDetector.ballRadi;
    CollisionDetector.dispatchSignal(
        new Signal(SignalManager.signalTypes.alignBall,
            {
                x: 0,
                y: (ballLineDistance - 1 - CollisionDetector.ballRadi),
            }));
};

CollisionDetector.findClosestLinePointXToBallX = (line, ballCenter) => {
    if (line.pointA.x - ballCenter.x > line.pointB.x - ballCenter.x)
        return line.pointB;
    return line.pointA;
};

CollisionDetector.returnCollisionObject = (isCollision, line = null, ballCenter = null) => {
    if (isCollision)
        return new Collision(true, CollisionDetector.getCollisionAxis(line, ballCenter));
    return new Collision(false, null);
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
    if (gameElapsedTime >= 1650)
        var s = '';
    if (CollisionDetector.isBallXWithinLineSegmentProjection(line, ballCenter))
        return CollisionDetector.checkCollisionWhenBallWithinLineProjection(line, ballCenter);
    return CollisionDetector.checkCollisionOutSideOfLineProjection(line, ballCenter);
};









