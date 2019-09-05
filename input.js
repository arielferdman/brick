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
        switch (event.code) {
            case this.KeyboardKeyCodes.left:
                this.dispatchSignal(new Signal(Signal.destinations.player, Signal.signals.playerMoveLeft));
                break;
            case this.KeyboardKeyCodes.right:
                this.dispatchSignal(new Signal(Signal.destinations.player, Signal.signals.playerMoveRight));
                break;
        }
    }

    keyRelease() {
        this.currentKeyPress = '';
    }
}