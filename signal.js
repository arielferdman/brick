class Signal extends GameObject {
    constructor(destination, signal) {
        super();
        this.destination = destination;
        this.signal = signal;
        this.player = null;
        this.ball = null;
        this.input = null;
    }

    registerObject(object) {
        switch (object.name) {
            case Signal.objectNames.player:
                this.player = object;
                break;
            case Signal.objectNames.ball:
                this.ball = object;
                break;
            case Signal.objectNames.input:
                this.input = object;
                break;

        }
    }

    update(lastStepTime) {
        super.update(lastStepTime);
    }

    processSignal(signal) {
        super.processSignal(signal);
        switch (signal.destination) {
            case Signal.destinations.player:
                this.player.receiveSignal(signal);
                break;
        }
    }
}

Signal.signals = {
    playerMoveLeft: 0,
    playerMoveRight: 1,
};

Signal.destinations = {
    player: this.player,
    ball: this.ball,
    input: this.input,
};

Signal.objectNames = {
    object: 0,
    player: 1,
    ball: 2,
    input: 3,
}