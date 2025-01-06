export class Timeline {
    constructor(_timelineObject, _currentFrame, _totalFrames) {
        this.timeline = _timelineObject;
        this.currentFrame = _currentFrame;
        this.totalFrames = _totalFrames;
    }
    updateCurrentFrame(positionPercent) {
        this.currentFrame = Math.round(positionPercent * this.totalFrames);
    }
}
