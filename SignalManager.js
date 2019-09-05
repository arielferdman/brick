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

SignalManager.signalTypes = {
    playerMoveLeft: 0,
    playerMoveRight: 1,
};

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
    switch (signal.signal) {
        case SignalManager.signalTypes.playerMoveLeft:
            SignalManager.player.moveLeft();
            break;
        case SignalManager.signalTypes.playerMoveRight:
            SignalManager.player.moveRight();
            break;
    }
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

SignalManager.signalLimitationsRules.push({signal: SignalManager.signalTypes.playerMoveRight, count: 1});
SignalManager.signalLimitationsRules.push({signal: SignalManager.signalTypes.playerMoveLeft, count: 1});
























