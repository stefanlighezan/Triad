export class Animation {
    constructor(_start, _duration, _animationType) {
        this.start = _start;
        this.duration = _duration;
        this.animationType = _animationType;
    }
    applyAnimation(currentFrame) {
        if (currentFrame <= this.start)
            return -1;
        const endFrame = this.start + this.duration;
        if (currentFrame === endFrame)
            return 1;
        if (currentFrame > endFrame)
            return 2;
        const progress = (currentFrame - this.start) / this.duration;
        return progress;
    }
}
export var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["fadeIn"] = 0] = "fadeIn";
    AnimationType[AnimationType["fadeOut"] = 1] = "fadeOut";
    AnimationType[AnimationType["scale"] = 2] = "scale";
    AnimationType[AnimationType["rotX"] = 3] = "rotX";
    AnimationType[AnimationType["rotY"] = 4] = "rotY";
    AnimationType[AnimationType["rotZ"] = 5] = "rotZ";
    AnimationType[AnimationType["lerp"] = 6] = "lerp";
})(AnimationType || (AnimationType = {}));
