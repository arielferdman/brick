class Signal extends Object {
    constructor(destination, signal) {
        super();
        this.destination = destination;
        this.signal = signal;
        this.player = null;
    }

    registerObject(object) {
        switch (object.name) {
            case Signal.objectNames.player:
                this.player = object;
                break;
        }
    }

    update() {
        processSignals();
    }

    processSignal(signal) {
        if (!this.processSignalLimitations(signal))
            return;
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
};

Signal.objectNames = {
    object: 0,
    player: 1,
}