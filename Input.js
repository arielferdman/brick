class Input extends GameObject {
    constructor() {
        super();
        this.name = SignalManager.objectNames.input;
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
                this.dispatchSignal(new Signal(SignalManager.destinations.player, SignalManager.signals.playerMoveLeft));
                break;
            case this.KeyboardKeyCodes.right:
                this.dispatchSignal(new Signal(SignalManager.destinations.player, SignalManager.signals.playerMoveRight));
                break;
        }
    }
}