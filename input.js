class Input extends GameObject {
    constructor() {
        super();
        this.name = Signal.objectNames.input;
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
                this.dispatchSignal(new Signal(Signal.destinations.player, Signal.signals.playerMoveLeft));
                break;
            case this.KeyboardKeyCodes.right:
                this.dispatchSignal(new Signal(Signal.destinations.player, Signal.signals.playerMoveRight));
                break;
        }
    }
}