class CollisionDetector {
}

CollisionDetector.ballCenterPoint = null;
CollisionDetector.ballRadi = null;
CollisionDetector.playerTopLinePoints = null;
CollisionDetector.canvasBorders = null;

CollisionDetector.updatePlayerTopLine = (pointA, pointB) => {
  CollisionDetector.playerTopLine = {
    'pointA': pointA,
    'pointB': pointB,
  };
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

CollisionDetector.Collision = (line, ballCenter) => {
   let ballLineDistance = CollisionDetector.calculateHypotenuse(line, ballCenter) *
                          Math.sin(
                            CollisionDetector.calculateInnerTriangleAngle(line, ballCenter)
                          );
   if (CollisionDetector.ballRadi >= ballLineDistance)
       return true;
   else
       return false;
};









