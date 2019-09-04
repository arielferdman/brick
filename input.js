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
        document.addEventListener('keypress', keypress);
        document.addEventListener('keyup', keyRelease);
    }

    update() {

    }

    draw() {

    }

    receiveSignal(signalData) {

    }

    keypress(event) {
        this.eventData['keyCode'] = event.code;
    }

    keyRelease() {
        currentKeyPress = '';
    }
}