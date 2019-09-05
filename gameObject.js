class GameObject {

    constructor() {
        this.name = Signal.objectNames.object;
        this.signals = new Que();
        this.maxProcessTimePerFrameInMiliSeconds = 8;
        this.signalLimitations = [];
        this.signalLimitationsRules = [];
        this.signalLimitationsCount = [];
    }

    update(lastStepTime) {
        this.processSignals();
    }

    draw() {

    }

    receiveSignal(signal) {
        this.signals.push(signal);
    }

    dispatchSignal(signal) {
        signals.push(signal);
    };

    processSignals() {
        let startTime = Date.now();
        let currentTime = Date.now();
        while ((currentTime - startTime) < this.maxProcessTimePerFrameInMiliSeconds) {
            if (this.signals.empty())
                return;
            this.processSignal(this.signals.pop());
        }
    }

    processSignalLimitations(signal) {
        if (this.signalLimitations.contains(signal))
            return false;
        this.signalLimitationsRules.forEach((limitationRule) => {
            if (limitationRule.signal === signal)
                this.signalLimitationsCount.forEach((limitationCount) => {
                   if (limitationCount.signal === signal) {
                       if (limitationCount.count === limitationRule.count - 1) {
                           this.signalLimitations.push(signal);
                       }
                   }
                });
        });
    }

    processSignal(signal) {
        if (!this.processSignalLimitations(signal))
            return;
    }

    resetSignalLimitation(signals) {
        signals.forEach((signal) => {
            let tempSignalLimitations = [];
            this.signalLimitations.forEach((signalLimitation) => {
                if (signalLimitation.signal !== signal)
                    tempSignalLimitations.push(signal);
            });
            this.signalLimitations = tempSignalLimitations;
            this.signalLimitationsCount.forEach((limitationCount) => {
                if (limitationCount.signal === signal)
                    limitationCount.count === 0;
            })
        });
    }
}




