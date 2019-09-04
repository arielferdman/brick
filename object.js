class Object {

    constructor() {
        this.name = null;
        this.signals = [];
    }

    update(lastStepTime) {

    }

    draw() {

    }

    receiveSignal(signal) {
        this.signals.push(signal);
    }

}