export abstract class Animation {
    start: number;
    duration: number;
    animationType: number;
    other: any;

    constructor(
        _start: number,
        _duration: number,
        _animationType: number,
        _other: any
    ) {
        this.start = _start;
        this.duration = _duration;
        this.animationType = _animationType;
        this.other = _other;
    }

    applyAnimation(currentFrame: number) {
        if (currentFrame <= this.start) return -1;

        const endFrame = this.start + this.duration;

        if (currentFrame === endFrame) return 1;

        if (currentFrame > endFrame) return 2;

        const progress = (currentFrame - this.start) / this.duration;
        return progress;
    }
}

export enum AnimationType {
    fadeIn,
    fadeOut,
    scale,
    shrink,
    rotX,
    rotY,
    rotZ,
    lerp,
}
