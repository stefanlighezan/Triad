export abstract class Animation {
    start: number
    duration: number;
    animationType: number;
    other: any;

    constructor(_start: number, _duration: number, _animationType: number, _other: any) {
        this.start = _start
        this.duration = _duration;
        this.animationType = _animationType;
        this.other = _other
    }

    applyAnimation(currentFrame: number) {
        // If the animation hasn't started yet, do nothing
        if (currentFrame < this.start) return 0;

        // If the animation is finished, return the final value
        const endFrame = this.start + this.duration;
        if (currentFrame - 1 >= endFrame) return 2;

        // Otherwise, return the progress of the animation
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
