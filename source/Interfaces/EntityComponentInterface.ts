import { Entity } from "../Classes/Entity";

export interface EntityComponent {
    setParent(parent: Entity): void;
    initialize(): void;
    update(): void;
    destroy(): void;
}