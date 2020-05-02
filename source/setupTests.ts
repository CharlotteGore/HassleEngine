const EPSILON = 0.00001;

expect.extend({
    toBeEqualish(received: Float32Array, expectation: Float32Array) {

        if (received.length != expectation.length)
            return {
                message: () => `expected ${received} to be equal(ish) to ${expectation}`,
                pass: false,
            } 

        for (let i = 0; i < expectation.length; i++) {
            if (Math.abs(received[i] - expectation[i]) >= EPSILON) {
                return {
                    message: () => `expected ${received} to be equal(ish) to ${expectation}`,
                    pass: false
                } 
            }
        }
        return {
            message: () => `expected ${received} to be equal(ish) to ${expectation}`,
            pass: true,
        } 
    },
    toBeNearly(received: number, expectation: number) {
        if (Math.abs(received - expectation) >= EPSILON) {
            return {
                message: () => `expected ${received} to be nearly ${expectation}`,
                pass: false
            } 
        }
        return {
            message: () => `expected ${received} to be nearly ${expectation}`,
            pass: true,
        } 
    },
});