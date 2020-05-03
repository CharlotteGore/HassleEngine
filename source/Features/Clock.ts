export class Clock {
    #frameTime: number;
    #frameDelta: number;
    #lastFrameTime: number;
    #firstFrameTime: number;
    #performance: Performance;
    initialize() {
        this.#performance = new Performance();
        this.#firstFrameTime = this.#performance.now();
        this.#lastFrameTime = this.#firstFrameTime;
        this.#frameDelta = 0;
    }
    update() {
        this.#frameTime = this.#performance.now();
        this.#frameDelta = this.#frameTime - this.#lastFrameTime;
    }
    get now () {
        return this.#frameTime;
    }
    get delta () {
        return this.#frameDelta;
    }

    get totalTime () {
        return this.#frameTime - this.#firstFrameTime;
    }
    destroy() {
        
    }
}