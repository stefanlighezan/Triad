export class Video {
    duration: number;
    paused: Boolean;
    fps: number;
    currentFrame: number;
    totalFrames: number;

    constructor(_duration: number, _paused: Boolean, _fps: number) {
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
