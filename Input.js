class Input extends GameObject {
    constructor() {
        super();
        this.KeyboardKeyCodes = {
            left: 'Numpad4',
            up: 'Numpad8',
            right: 'Numpad6',
            down: 'Numpad2'
        };
    }

    keypress(event) {
        switch (event.code) {
            case this.KeyboardKeyCodes.left:
                this.dispatchSignal(new Signal(SignalManager.signalTypes.playerMoveLeft));
                break;
            case this.KeyboardKeyCodes.right:
                this.dispatchSignal(new Signal(SignalManager.signalTypes.playerMoveRight));
                break;
        }
    }
}