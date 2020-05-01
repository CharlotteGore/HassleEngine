import { InputDevice, InputBindings, Actions } from './types';
import { keyCodes, mouseButtonCodes } from './constants';

export class Input<B extends string | number, A extends string | number, T extends string | number> {
    private bindings: InputBindings<B, A, T>
    private status: Actions<B, A, T>;
    private mouseActiveElement: HTMLElement;

    constructor() {
        this.bindings = null;
        this.status = null;
        this.mouseActiveElement = null;
        return this;
    }

    bindActions = (bindings: InputBindings<B, A, T>) => {
        console.log(this);
        this.bindings = bindings;
        this.status = [bindings.gamepad, bindings.mouse, bindings.keys].reduce((status, deviceBindings) => {
            if (deviceBindings.buttons){
                for (const value of Object.values(deviceBindings.buttons)) {
                   status.digital[value] = false;
                }
            }
            if (deviceBindings.axis){
                for (const value of Object.values(bindings.gamepad.axis)) {
                    status.analog[value] = 0;
                }
            }
            if (bindings.gamepad.enabled) {
                status.digital[bindings.gamepad.enabled] = false;
            }
            return status;
        }, {
            digital: {} as Record<B, boolean>,
            analog: {} as Record<A, number>,
            touch: {} as Record<T, Array<[number, number]>>
        });

        return this.status;
    }

    setMouseActiveElement = (element: HTMLElement) => {
        this.mouseActiveElement = element;
    }

    private updateGamepad = () => {

    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (this.bindings.keys && this.bindings.keys.buttons && this.bindings.keys.buttons[keyCodes[e.which]]) {
            this.status.digital[this.bindings.keys.buttons[keyCodes[e.which]]] = true;
        }
    }

    private handleKeyUp = (e: KeyboardEvent) => {
        if (this.bindings.keys && this.bindings.keys.buttons && this.bindings.keys.buttons[keyCodes[e.which]]) {
            this.status.digital[this.bindings.keys.buttons[keyCodes[e.which]]] = false;
        }
    }

    private handleMouseDown = (e: MouseEvent) => {
        if (this.bindings.mouse && this.bindings.mouse.buttons && this.bindings.mouse.buttons[mouseButtonCodes[e.which]]) {
            this.status.digital[this.bindings.mouse.buttons[mouseButtonCodes[e.which]]] = true;
        }
    }

    private handleMouseUp = (e: MouseEvent) => {
        if (this.bindings.mouse && this.bindings.mouse.buttons && this.bindings.mouse.buttons[mouseButtonCodes[e.which]]) {
            this.status.digital[this.bindings.mouse.buttons[mouseButtonCodes[e.which]]] = false;
        }
    }

    private handleMouseCursorActive = (e: MouseEvent) => {
        if (this.bindings.mouse && this.bindings.mouse.enabled) {
            this.status.digital[this.bindings.mouse.enabled] = true;
        }
        this.mouseActiveElement.addEventListener('mousemove', this.handleMouseMove, false);
    }

    private handleMouseCursorInactive = (e: MouseEvent) => {
        if (this.bindings.mouse && this.bindings.mouse.enabled) {
            this.status.digital[this.bindings.mouse.enabled] = false;
        }
        this.mouseActiveElement.removeEventListener('mousemove', this.handleMouseMove, false);
        
    }

    private handleMouseMove = (e: MouseEvent) => {
        if (this.bindings.mouse && this.bindings.mouse.axis) {
            const x = ((   (e.clientX - (e.target as HTMLElement).offsetLeft) / (e.target as HTMLElement).clientWidth) * 2) - 1;
            const y = ((1 -(e.clientY - (e.target as HTMLElement).offsetTop) / (e.target as HTMLElement).clientWidth) * 2) - 1;
            if (this.bindings.mouse.axis.X) {
                this.status.analog[this.bindings.mouse.axis.X] = x;
            }
            if (this.bindings.mouse.axis.Y) {
                this.status.analog[this.bindings.mouse.axis.Y] = y;
            }
        }
    }

    private handleMouseWheel = (e: MouseWheelEvent) => {

    }

    private handleGamepadConnected = (e: GamepadEvent) => {
        
    }

    private handleGamepadDisconnected = (e: GamepadEvent) => {

    }

    initialize = () => {
        if (!this.bindings || !this.status) {
            throw new Error('Input cannot be initialized without Input Bindings');
        }
        window.addEventListener('keydown', this.handleKeyDown, false);
        window.addEventListener('keyup', this.handleKeyUp, false);
        window.addEventListener('mousedown', this.handleMouseDown, false);
        window.addEventListener('mouseup', this.handleMouseUp, false);
        window.addEventListener('wheel', this.handleMouseWheel, false);
        window.addEventListener('gamepadconnected', this.handleGamepadConnected, false)
        window.addEventListener('gamepaddisconnected', this.handleGamepadDisconnected, false)
        if (this.mouseActiveElement) {
            this.mouseActiveElement.addEventListener('mouseover', this.handleMouseCursorActive, false);
            this.mouseActiveElement.addEventListener('mouseout', this.handleMouseCursorInactive, false);
        }
    }

    update = () => {
        // do something here.. 
        return this.status;
    }

    destroy = () => {
        window.removeEventListener('keydown', this.handleKeyDown, false);
        window.removeEventListener('keyup', this.handleKeyUp, false);
        window.removeEventListener('mousedown', this.handleMouseDown, false);
        window.removeEventListener('mouseup', this.handleMouseUp, false);
        window.removeEventListener('wheel', this.handleMouseWheel, false);
        window.removeEventListener('gamepadconnected', this.handleGamepadConnected, false)
        window.removeEventListener('gamepaddisconnected', this.handleGamepadDisconnected, false)
        if (this.mouseActiveElement) {
            this.mouseActiveElement.removeEventListener('mouseover', this.handleMouseCursorActive, false);
            this.mouseActiveElement.removeEventListener('mouseout', this.handleMouseCursorInactive, false);
        }
    }
}