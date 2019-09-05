class GameObject {

    constructor() {

    }

    update(lastStepTime) {

    }

    draw() {

    }

    dispatchSignal(signal) {
        SignalManager.signals.push(signal);
    };

}




