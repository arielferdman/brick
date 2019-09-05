class GameObject {

    constructor() {
        this.name = SignalManager.objectNames.object;

    }

    update(lastStepTime) {

    }

    draw() {

    }

    dispatchSignal(signal) {
        SignalManager.signals.push(signal);
    };

}




