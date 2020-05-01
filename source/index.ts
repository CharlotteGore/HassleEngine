import { InputBindings, GamepadButtons, MouseButtons, MouseAxis, Keys, GamepadAxis } from './Classes/Input/types';
import { Input } from './Classes/Input/Input';

// Okay this isn't the read index.ts, this is just me messing with the Input manager class.
// The idea is that you create some ButtonActions (booleans, or 'digital' switches) and AxisActiions
// (like thumbpads, trigger switches etc, mouse position).

// Next, you make an InputBindings object where you link specific gamepad/mouse/keyboard buttons to 
// these actions you've generated. This way, in your game code, you bind to specific actions and not
// buttons, making it easier to rebind these controls later on, and just keeping the code a little 
// cleaner.

// the status of all bound actions is available from Input->update() and is type safe, so that's nice.

// still to do: wire up gamepad controls and also touch controls. I think with touch all I'm going 
// to do is make it so touch events can be passed through, but no real experience of using these
// so it's a bit of a mystery how this could work. 

// also still to do: it's psosible to bind to gamepad.enabled, mouse.enabled. This should always
// point to the last input type that the user used, so if they start using a gamepad, or keys, 
// or touch, it's possible for a game to adapt the UI to suit. 

// Also still to do: Show example of bindings from JSON. Typescript ones are probably not the typical
// use case here, and you'd expect these to be made in some sort of UI or at the very worst in a config file. 
// Could do with looking into JSON schemas for this.


export enum ButtonActions {
    Interact = 'Interact',
    Cancel = 'Cancel',
    Pause = 'Pause',
    Exit = 'Exit',
    SelectNext = 'SelectNext',
    SelectPrev = 'SelectPrev',
    OpenInventory = 'OpenInventory',
    MoveLeft = 'MoveLeft',
    MoveRight = 'MoveRight',
    MoveUp = 'MoveUp',
    MoveDown = 'MoveDown',
    MoveToSelected = 'MoveToSelected',
    MouseActive = 'MouseActive',
    GamepadActive = 'GamepadActive',
    KeyboardActive = 'KeyboardActive',
    TouchActive = 'TouchActive',
} 

export enum AxisActions {
    MoveHorizontal = 'MoveHorizontal',
    MoveVertical = 'MoveVertical', 
    MouseX = 'MouseX',
    MouseY = 'MouseY',
    Select = 'Select',
}

export enum TouchActions {
    Touch = 'Touch',
}

const bindings: InputBindings<ButtonActions, AxisActions, TouchActions> = {
    gamepad: {
        buttons: {
            [GamepadButtons.A]: ButtonActions.Interact,
            [GamepadButtons.B]: ButtonActions.OpenInventory,
            [GamepadButtons.Y]: ButtonActions.Cancel,
            [GamepadButtons.X]: ButtonActions.MoveToSelected,
            [GamepadButtons.Back]: ButtonActions.Exit,
            [GamepadButtons.Start]: ButtonActions.Pause,
            [GamepadButtons.R1]: ButtonActions.SelectNext,
            [GamepadButtons.L1]: ButtonActions.SelectPrev,
        },
        axis: {
            [GamepadAxis.LX]: AxisActions.MoveHorizontal,
            [GamepadAxis.LY]: AxisActions.MoveVertical,
            [GamepadAxis.RX]: AxisActions.MouseX,
            [GamepadAxis.RY]: AxisActions.MouseY,
        },
        enabled: ButtonActions.GamepadActive,
    },
    mouse: {
        buttons: {
            [MouseButtons.Left]: ButtonActions.Interact,
            [MouseButtons.Right]: ButtonActions.OpenInventory,
            [MouseButtons.Middle]: ButtonActions.SelectNext,
        },
        axis: {
            [MouseAxis.X]: AxisActions.MouseX,
            [MouseAxis.Y]: AxisActions.MouseY,
            [MouseAxis.Wheel]: AxisActions.Select,
        },
        enabled: ButtonActions.MouseActive,
    },
    keys: {
        buttons: {
            [Keys.Escape]: ButtonActions.Exit,
            [Keys.Space]: ButtonActions.Pause,
            [Keys.Right]: ButtonActions.MoveRight,
            [Keys.Left]: ButtonActions.MoveLeft,
            [Keys.Up]: ButtonActions.MoveUp,
            [Keys.Down]: ButtonActions.MoveDown,
            [Keys.Shift]: ButtonActions.OpenInventory,
            [Keys.PageUp]: ButtonActions.SelectPrev,
            [Keys.PageDown]: ButtonActions.SelectNext,
            [Keys.Enter]: ButtonActions.MoveToSelected,
        },
        axis: null,
        enabled: ButtonActions.KeyboardActive,
    },
    touch: TouchActions.Touch,
}


const inputManager = new Input<ButtonActions, AxisActions, TouchActions>();
inputManager.bindActions(bindings);

declare global {
    interface Window { inputManager: any; }
}

window.inputManager = inputManager;

