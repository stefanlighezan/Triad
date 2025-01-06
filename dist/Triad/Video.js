export class Video {
    constructor(_duration, _paused, _fps) {
        this.duration = _duration;
        this.paused = _paused;
        this.fps = _fps;
        this.currentFrame = 0;
        this.totalFrames = this.duration * this.fps;
    }
    pause() {
        this.paused = true;
    }
    unpause() {
        this.paused = false;
    }
}
