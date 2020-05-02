import { 
    create as createMat4, 
    translate,
    scale, 
    multiply as mul,
    fromRotationTranslationScale, 
    rotate 
} from "glMatrix/mat4";
import { create as createVec3, clone as cloneVec3, fromValues as fromValuesVec3 } from "glMatrix/vec3";
import { create as createQuat, clone as cloneQuat } from "glMatrix/quat";

import { Mat4, Vec3, Quat } from "glMatrix/types";

const IDENTITY_MATRIX = createMat4();

export class Transform {
    private localMatrix: Mat4;
    private worldMatrix: Mat4;

    private position: Vec3;
    private scaling: Vec3;
    private rotation: Quat;
    
    constructor (rotation?: Readonly<Quat>, translation?: Readonly<Vec3>, scale?: Readonly<Vec3>) {
        this.localMatrix = createMat4();
        this.worldMatrix = createMat4();
        this.position = translation ? cloneVec3(translation) : createVec3();
        this.scaling = scale ? cloneVec3(scale) : fromValuesVec3(1, 1, 1);
        this.rotation = rotation ? cloneQuat(rotation) : createQuat();
        this.updateLocalMatrix();
    }

    /**
     * Updates the local matrix
     */
    private updateLocalMatrix = (): void => {;
        fromRotationTranslationScale(this.localMatrix, this.rotation, this.position, this.scaling);
    }

    /**
     * Get the world matrix
     * 
     * @returns {Mat4} the current world matrix
     */
    getWorldMatrix = (): Mat4 => {
        return this.worldMatrix;
    }

    /**
     * Get the local matrix
     * 
     * @returns {Mat4} the current world matrix
     */
    getLocalMatrix = (): Mat4 => {
        return this.localMatrix;
    }
    
    /**
     * Sets a new rotation, translation and scale
     *
     * @param {Readonly<Quat>} rotation the new rotation
     * @param {Readonly<Vec3>} translation the new position
     * @param {Readonly<Vec3>} scale the new scale
     */
    setRotationTranslationScale = (rotation: Readonly<Quat>, translation: Readonly<Vec3>, scale: Readonly<Vec3>) => {
        this.position = cloneVec3(translation);
        this.scaling = cloneVec3(translation);
        this.rotation = cloneQuat(rotation);
        this.updateLocalMatrix();
    }

    /**
     * Gets the current position
     *
     * @returns {Vec3} the current position
     */
    getTranslation = (): Vec3 => {
        return this.position;
    }

    /**
     * Sets a new position
     *
     * @param {Readonly<Vec3>} position the new position
     */
    setTranslation = (position: Readonly<Vec3>): void => {
        this.position = cloneVec3(position);
        this.updateLocalMatrix();
    }

    /**
     * Gets the current scaling
     *
     * @returns {Vec3} the current scaling
     */
    getScaling = (): Vec3 => {
        return this.scaling;
    }

    /**
     * Sets a new scaling
     *
     * @param {Readonly<Vec3>} scaling the new scaling
     */
    setScaling = (scaling: Readonly<Vec3>) => {
        this.scaling = cloneVec3(scaling);
        this.updateLocalMatrix();
    }

    /**
     * Gets the current rotation
     *
     * @returns {Quat} the current rotation
     */
    getRotation = (): Quat => {
        return this.rotation;
    }

    /**
     * Sets a new rotation
     *
     * @param {Readonly<Quat>} rotation the new rotation
     */
    setRotation(rotation: Readonly<Quat>) {
        this.rotation = cloneQuat(rotation);
        this.updateLocalMatrix();
    }

    /**
     * Applies addition translation onto existing translation
     *
     * @param {Readonly<Vec3>} translation 
     */
    translate(translation: Readonly<Vec3>) {
        translate(this.localMatrix, this.localMatrix, translation);
    }

    /**
     * Applies additional scaling onto existing scaling.
     *
     * @param {Readonly<Vec3>} scaling vec3 to scale each axis.
     */
    scale(scaling: Readonly<Vec3>): void {
        scale(this.localMatrix, this.localMatrix, scaling);
    }

    /**
     * Applies addition rotation to the existing rotation
     *
     * @param {Readonly<Vec3>} axis the axis to rotate along
     * @param {number} radians the number of radians to rotate by
     */
    rotate(axis: Readonly<Vec3>, radians: number, ): void {
        rotate(this.localMatrix, this.localMatrix, radians, axis);
    }

    /**
     * Generates the current worldMatrix
     *
     * @param {Readonly<Mat4>} parentWorldMatrix the parent worldMatrix that the local matrix is relative to
     * @returns {Mat4} the new world matrix for this transform
     */ 
    updateWorldMatrix(parentWorldMatrix: Readonly<Mat4>): Mat4 {
        return mul(this.worldMatrix, parentWorldMatrix, this.localMatrix);
    }
}