import { Transform } from "./Transform";
import { EntityComponent } from "../Interfaces/EntityComponentInterface";
import { Mat4 } from "glMatrix/types";

export class Entity {
    #transform: Transform;
    #static: boolean;
    #components: Array<EntityComponent>;
    #parent: Entity | null;
    #children: Array<Entity>;

    constructor () {
        this.#transform = new Transform();
        this.#static = false;
        this.#components = [];
        this.#parent = null;
    }
    set parent(parent: Entity) {
        this.#parent = parent;
    }

    get worldMatrix(): Mat4 {
        return this.#transform.worldMatrix;
    }

    registerComponent(component: EntityComponent) {
        this.#components.push(component);
        component.setParent(this);
    }

    intialize() {
        for (const component of this.#components) {
            component.initialize();
        }
    }

    update() {
        for (const component of this.#components) {
            component.update();
        }

        this.#transform.updateWorldMatrix(this.#parent !== null ? this.#parent.worldMatrix : null);
        
        for (const child of this.#children) {
            child.update();
        }
    }

    destroy() {
        for (const component of this.#components) {
            component.destroy();
        }

        for (const child of this.#children) {
            child.destroy();
        }
    }
}