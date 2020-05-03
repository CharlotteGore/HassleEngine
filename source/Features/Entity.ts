import { Transform } from "./Transform/Transform";
import { EntityComponent } from "../Interfaces/EntityComponentInterface";

export class Entity {
    transform: Transform;
    components: Array<EntityComponent>;
    parent: Entity | null;
    children: Array<Entity>;

    constructor () {
        this.transform = new Transform();
        this.components = [];
        this.parent = null;
    }
    /**
     * 
     * sets a parent entity for this entity
     * @param {(Entity|null)} parent parent entity
     */
    setParent = (parent: Entity | null): void => {
        if (this.parent !== null) {
            this.parent.removeChild(this);
        }
        if (parent !== null) {
            parent.addChild(this);
        }
        this.parent = parent;
    }

    protected addChild = (child: Entity): void => {

    }

    protected removeChild = (child: Entity): void => {

    }

    updateWorldMatricies = () => {

    }

    registerComponent(component: EntityComponent) {
        this.components.push(component);
        component.setParent(this);
    }

    intialize() {
        for (const component of this.components) {
            component.initialize();
        }
    }

    update() {
        for (const component of this.components) {
            component.update();
        }

        this.transform.updateWorldMatrix(this.parent ? this.parent.transform : null);
        
        for (const child of this.children) {
            child.update();
        }
    }

    destroy() {
        for (const component of this.components) {
            component.destroy();
        }

        for (const child of this.children) {
            child.destroy();
        }
    }
}