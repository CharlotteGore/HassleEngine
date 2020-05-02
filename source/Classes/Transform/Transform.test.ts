import { Transform } from "./Transform"
import * as mat4 from "glMatrix/mat4";
import { translate } from "glMatrix/mat2d";

describe('Transform', () => {
    let transform: Transform;
    beforeEach(() => {
        transform = new Transform();
    });

    it('has a standard identity matrix when initialized', () => {
        expect(transform.getLocalMatrix()).toEqual(mat4.create());
    })
})