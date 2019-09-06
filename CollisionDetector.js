class CollisionDetector {
}

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
    return Math.atan((pointA.y - pointB.y) / (pointA.x - pointB.x));
};

CollisionDetector.calculateInnerTriangleAngle = (line, ballCenter) => {
    let lineAngle = CollisionDetector.calculateSlopeAngleWithTwoPoints(line.pointA, ballCenter);
    let ballCenterLineStartAngle = CollisionDetector.calculateSlopeAngleWithTwoPoints(line.pointA, ballCenter);

    return lineAngle - ballCenterLineStartAngle;
};

CollisionDetector.calculateHypotenuse = (line, ballCenter) => {
    return CollisionDetector.DistanceBetweenTwoPoints(line.pointA, ballCenter);
};

CollisionDetector.DistanceBetweenTwoPoints = (line) => {
    return Math.sqrt(Math.pow(line.pointB.x - line.pointA.x, 2) + Math.pow(line.pointB.y - line.pointA.y, 2));
};

CollisionDetector.getCollisionAxis = (line, ballCenter) => {

};

CollisionDetector.Collision = (line, ballCenter) => {
   let ballLineDistance = CollisionDetector.calculateHypotenuse(line, ballCenter) *
                          Math.sin(
                            CollisionDetector.calculateInnerTriangleAngle(line, ballCenter)
                          );
   if (CollisionDetector.ballRadi >= ballLineDistance)
       return new Collision(true, CollisionDetector.getCollisionAxis(line, ballCenter));
   else
       return new Collision(false, null);
};









