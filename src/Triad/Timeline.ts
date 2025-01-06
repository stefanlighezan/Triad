export class Timeline {
    timeline: Object;
    currentFrame: number;
    totalFrames: number;

    constructor(
        _timelineObject: number,
        _currentFrame: number,
        _totalFrames: number
    ) {
        this.timeline = _timelineObject;
        this.currentFrame = _currentFrame;
        this.totalFrames = _totalFrames;
    }

    updateCurrentFrame(positionPercent: number) {
        this.currentFrame = Math.round(positionPercent * this.totalFrames);
    }
}
