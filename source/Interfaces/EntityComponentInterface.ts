import { Entity } from "../Features/Entity";

export interface EntityComponent {
    setParent(parent: Entity): void;
    initialize(): void;
    update(): void;
    destroy(): void;
}