import { create as createMat4, translate, getTranslation, mul as mulMat4 } from "glMatrix/mat4";
import { create as createVec3 } from "glMatrix/vec3";
import { Mat4, Vec3 } from "glMatrix/types";

const IDENTITY_MATRIX = createMat4();

export class Transform {
    localMatrix: Mat4;
    worldMatrix: Mat4; 
    
    constructor () {
        this.localMatrix = createMat4();
        this.worldMatrix = createMat4();
    }
    set position(position: Readonly<Vec3>) {
        translate(this.localMatrix, IDENTITY_MATRIX, position);
    }
    get position() {
        const position = createVec3();
        return getTranslation(position, this.localMatrix);
    }
    updateWorldMatrix(parentWorldMatrix?: Mat4) {
        mulMat4(this.worldMatrix, this.localMatrix, parentWorldMatrix || IDENTITY_MATRIX);
    }
}