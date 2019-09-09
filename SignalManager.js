class SignalManager {

}

SignalManager.player = null;

SignalManager.ball = null;

SignalManager.input = null;

SignalManager.signals = new Que();

SignalManager.maxProcessTimePerFrameInMiliSeconds = 8;

SignalManager.signalLimitations = [];

SignalManager.signalLimitationsRules = [];

SignalManager.signalLimitationsCount = [];

SignalManager.objectNames = {
    player: 'Player',
    ball: 'Ball',
    input: 'Input',
};

SignalManager.update = (lastStepTime) => {
    SignalManager.processSignals();
    SignalManager.resetSignalLimitation([
        SignalManager.signalTypes.playerMoveRight,
        SignalManager.signalTypes.playerMoveLeft,
    ])
    // console.log(SignalManager.signals.length);
};

SignalManager.registerObject = (object) => {
    switch (object.constructor.name) {
        case SignalManager.objectNames.player:
            SignalManager.player = object;
            break;
        case SignalManager.objectNames.ball:
            SignalManager.ball = object;
            break;
        case SignalManager.objectNames.input:
            SignalManager.input = object;
            break;

    }
};

SignalManager.processSignal = (signal) => {
    if (!SignalManager.processSignalLimitations(signal))
        return;

    SignalManager.signalHandlers[signal.signal](signal);
};

SignalManager.movePlayerLeft = (signal = null) => {
    SignalManager.player.moveLeft();
};

SignalManager.movePlayerRight = (signal = null) => {
    SignalManager.player.moveRight();
};

SignalManager.updateBallCenterPoint = (signal) => {
    CollisionDetector.updateBallCenterPoint(signal.signalData);
};

SignalManager.updatePlayerTopLine = (signal) => {
    CollisionDetector.updatePlayerTopLine(signal.signalData);
};

SignalManager.switchBallXAxis = (signal = null) => {
    SignalManager.ball.switchXAxis();
};

SignalManager.switchBallYAxis = (signal = null) => {
    SignalManager.ball.switchYAxis();
};

SignalManager.switchBallBothAxes = (signal = null) => {
    SignalManager.ball.switchBothAxes();

};

SignalManager.alignBall = (signal) => {
  SignalManager.ball.align(signal.signalData.x, signal.signalData.y);
};

SignalManager.processSignals = () => {
    let startTime = Date.now();
    let currentTime = Date.now();
    while ((currentTime - startTime) < SignalManager.maxProcessTimePerFrameInMiliSeconds) {
        if (SignalManager.signals.empty())
            return;
        SignalManager.processSignal(SignalManager.signals.pop());
    }
};

SignalManager.processSignalLimitations = (signal) => {
    if (SignalManager.signalLimitations.includes(signal))
        return false;
    SignalManager.signalLimitationsRules.forEach((limitationRule) => {
        if (limitationRule.signal === signal)
            SignalManager.signalLimitationsCount.forEach((limitationCount) => {
                if (limitationCount.signal === signal) {
                    if (limitationCount.count === limitationRule.count - 1) {
                        SignalManager.signalLimitations.push(signal);
                    }
                }
            });
    });
    return true;
}

SignalManager.resetSignalLimitation = (signals) => {
    signals.forEach((signal) => {
        let tempSignalLimitations = [];
        SignalManager.signalLimitations.forEach((signalLimitation) => {
            if (signalLimitation.signal !== signal)
                tempSignalLimitations.push(signal);
        });
        SignalManager.signalLimitations = tempSignalLimitations;
        SignalManager.signalLimitationsCount.forEach((limitationCount) => {
            if (limitationCount.signal === signal)
                limitationCount.count === 0;
        })
    });
}

SignalManager.signalTypes = {
    playerMoveLeft: 0,
    playerMoveRight: 1,
    updateBallCenterPoint: 2,
    updatePlayerTopLine: 3,
    switchBallXAxis: 4,
    switchBallYAxis: 5,
    switchBallBothAxes: 6,
    alignBall: 7,
};

// find a better way to do this maybe?
SignalManager.signalHandlers = {
    0: SignalManager.movePlayerLeft,
    1: SignalManager.movePlayerRight,
    2: SignalManager.updateBallCenterPoint,
    3: SignalManager.updatePlayerTopLine,
    4: SignalManager.switchBallXAxis,
    5: SignalManager.switchBallYAxis,
    6: SignalManager.switchBallBothAxes,
    7: SignalManager.alignBall,
};

SignalManager.signalLimitationsRules.push({signal: SignalManager.signalTypes.playerMoveRight, count: 1});
SignalManager.signalLimitationsRules.push({signal: SignalManager.signalTypes.playerMoveLeft, count: 1});






















