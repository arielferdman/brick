class Input extends Object {
    constructor() {
        super();
        this.name = 'input';
        this.KeyboardKeyCodes = {
            left: 'Numpad4',
            up: 'Numpad8',
            right: 'Numpad6',
            down: 'Numpad2'
        };
        this.currentKeyPress = '';
        document.addEventListener('keypress', this.keypress);
        document.addEventListener('keyup', this.keyRelease);
    }

    receiveSignal(signal) {

    }

    keypress(event) {
        this.eventData['keyCode'] = event.code;
        let signal = new Signal(enums.signals.keypress, event.code);
        eventManager.receiveSignal(signal);
    }

    keyRelease() {
        this.currentKeyPress = '';
    }
}