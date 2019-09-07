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

    return lineAngle - ballCenterLineStartAngle;
};

CollisionDetector.calculateHypotenuse = (line, ballCenter) => {
    return CollisionDetector.DistanceBetweenTwoPoints(line.pointA, ballCenter);
};

CollisionDetector.DistanceBetweenTwoPoints = (pointA, pointB) => {
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

CollisionDetector.Collision = (line, ballCenter) => {
    if (gameElapsedTime >= 1650)
        var s = '';
    let hypothenuse = CollisionDetector.calculateHypotenuse(line, ballCenter);
    let innerTriangleAngle = CollisionDetector.calculateInnerTriangleAngle(line, ballCenter);
    if (innerTriangleAngle === 0)
        return new Collision(false, null);
    let ballLineDistance = hypothenuse * Math.sin(innerTriangleAngle);
    if (CollisionDetector.ballRadi >= ballLineDistance)
        return new Collision(true, CollisionDetector.getCollisionAxis(line, ballCenter));
    else
        return new Collision(false, null);
};









