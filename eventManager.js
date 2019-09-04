class EventManager extends Object {
    constructor() {
        super();
        this.name = 'eventManager';
        this.eventData = null;
        this.player = null;
        this.input = null;
        this.signals = [];
    }

    update() {
        this.processSignals();
    }

    processSignals() {
        this.signals.forEach((item) => {
            switch (item.name) {
                case 'keypress':
                    this.player.receiveSignal(new Signal());
                    break;
            }
        });
    }

    draw() {

    }

    registerObject(object) {
        switch (object['name']) {
            case 'player':
                this.player = object;
                break;
            case 'input':
                this.input = object;
                break;
        }
    }
}