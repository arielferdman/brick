class EventManager extends Object {
    constructor() {
        super();
        this.eventData = null;
        this.player = null;
        this.input = null;
    }

    update() {

    }

    draw() {

    }

    receiveSignal() {

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