import { Transform } from "./Transform"
import * as mat4 from "glMatrix/mat4";
import * as vec3 from "glMatrix/vec3";
import * as quat from "glMatrix/quat";

describe('Transform', () => {

    it('has a standard identity matrix when initialized', () => {
        let transform = new Transform();
        expect(transform.getLocalMatrix()).toEqual(mat4.create());
    })

    it('can be overloaded to take initial params', () => {
        const pos = vec3.fromValues(20, 10, 1);
        const scale = vec3.fromValues(10.5, 5.5, 0.5);
        const rot = quat.create();
        const transform = new Transform(rot, pos, scale);
        let matrix = transform.getLocalMatrix();

        // validate the data in the matrix is what we expect.
        let resultRot = quat.create();
        let resultPos = vec3.create();
        let resultSca = vec3.create();

        expect(mat4.getRotation(resultRot, matrix)).toEqual(quat.fromValues(0, 0, 0, 1));
        expect(mat4.getScaling(resultSca, matrix)).toEqual(vec3.fromValues(10.5, 5.5, 0.5));
        expect(mat4.getTranslation(resultPos, matrix)).toEqual(vec3.fromValues(20, 10, 1));
    });

    it('individual getters report correct values', () => {
        const pos = vec3.fromValues(20, 10, 1);
        const scale = vec3.fromValues(10.5, 5.5, 0.5);
        const rot = quat.create();
        const transform = new Transform(rot, pos, scale);

        expect(transform.getTranslation()).toEqual(vec3.fromValues(20, 10, 1));
        expect(transform.getScaling()).toEqual(vec3.fromValues(10.5, 5.5, 0.5));
        expect(transform.getRotation()).toEqual(quat.fromValues(0,0,0,1));
    });

    it('has a setter for position that updates local matrix', () => {
        const transform = new Transform();
        const pos = vec3.fromValues(20, 10, -1);
        transform.setTranslation(pos);
        const matrix = transform.getLocalMatrix();

        expect(mat4.getTranslation(vec3.create(), matrix)).toEqual(pos);
    });

    it('has a setter for scale that updates local matrix', () => {
        const transform = new Transform();
        const scale = vec3.fromValues(10.5, 5.5, 0.5);
        transform.setScaling(scale);
        const matrix = transform.getLocalMatrix();

        expect(mat4.getScaling(vec3.create(), matrix)).toEqual(scale);
    });

    it('has a setter for rotation that updates local matrix', () => {
        const transform = new Transform();
        // 90 degrees clockwise on the z axis, taken from https://www.andre-gaschler.com/rotationconverter/
        const rotation = quat.fromValues(0, 0, 0.7071068, 0.7071068);

        transform.setRotation(rotation);
        const matrix = transform.getLocalMatrix();

        expect(mat4.getRotation(quat.create(), matrix)).toBeEqualish(rotation);
    });

    it('generates the correct worldMatrix without a parent transform', () => {

        const translation = vec3.fromValues(20, 10, 1);
        const scale = vec3.fromValues(0.5, 0.5, 0.5);
        const rotation = quat.fromValues(0, 0, -0.7071068, 0.7071068);
        const transform = new Transform(rotation, translation, scale);
  
        const worldMatrix = transform.updateWorldMatrix(null);

        // sometimes you can get things like 0 vs -0, so using a fuzzy checker here.
        expect(transform.getWorldMatrix()).toBeEqualish(transform.getLocalMatrix());
    })

    it('throws on updateWorldMatrix if the parent hasnt computed its own worldMatrix', () => {
        const parentTranslation = vec3.fromValues(200, 100, 10);
        const parentScale = vec3.fromValues(2, 2, 2);
        const parentRotation = quat.fromValues(0, 0, 0.7071068, 0.7071068);
        const parentTransform = new Transform(parentRotation, parentTranslation, parentScale);

        const childTranslation = vec3.fromValues(20, 10, 1);
        const childScale = vec3.fromValues(0.5, 0.5, 0.5);
        const childRotation = quat.fromValues(0, 0, -0.7071068, 0.7071068);
        const childTransform = new Transform(childRotation, childTranslation, childScale);
  
        expect(() => {
            childTransform.updateWorldMatrix(parentTransform);
        }).toThrowError();
               
    })

    it('returns the correct worldMatrix when using a parent with a worldMatrix', () => {
        const parentTranslation = vec3.fromValues(200, 100, 10);
        const parentScale = vec3.fromValues(2, 2, 2);
        const parentRotation = quat.fromValues(0, 0, 0.7071068, 0.7071068);
        const parentTransform = new Transform(parentRotation, parentTranslation, parentScale);
        // generate a worldMatrix for the parent
        parentTransform.updateWorldMatrix(null);

        const childTranslation = vec3.fromValues(20, 10, 1);
        const childScale = vec3.fromValues(0.5, 0.5, 0.5);
        const childRotation = quat.fromValues(0, 0, -0.7071068, 0.7071068);
        const childTransform = new Transform(childRotation, childTranslation, childScale);
        /*
            Okay I validated this worldMatrix functionality against a Known Good
            implementation: Three.js. The worldMatrix generated
            by updateWorldMatrix should (just about) match that 
            generated by Three's worldMatrix for the 'c' object here. There
            are microscopic precision differences because gl-matrix uses Float32Arrays 
            has the native type while Three.js uses the 64 bit Number type in javascript.

            var three = require("three")
            var o = new three.Object3D();
            o.rotation.set(0,0,1.5707963)
            o.position.set(200, 100, 10);
            o.scale.set(2, 2, 2);
            o.updateMatrix();
            var c = new three.Object3D();
            c.position.set(20, 10, 1);
            c.rotation.set(0,0,-1.5707963)
            c.scale.set(0.5, 0.5, 0.5);
            c.updateMatrix();
            o.add(c);
            o.updateWorldMatrix(false, true);
            console.log(c.matrixWorld);
        */
       expect(childTransform.updateWorldMatrix(parentTransform)).toBeEqualish(mat4.fromValues(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            179.99999,140,12,1
        ));
               
    })
})