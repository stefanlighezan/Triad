export class TriadObject {
    constructor(_lifespan, _renderable, _animation, _renderTo, _style) {
        this.lifespan = _lifespan;
        this.renderable = _renderable;
        this.animation = _animation;
        this.renderTo = _renderTo;
        this.instance = null;
        this.style = _style;
    }
    isVisible(currentFrame) {
        return (currentFrame >= this.lifespan.start &&
            currentFrame - 1  <= this.lifespan.end);
    }
}
export var Objects;
(function (Objects) {
    Objects[Objects["rectangle"] = 0] = "rectangle";
    Objects[Objects["ellipse"] = 1] = "ellipse";
    Objects[Objects["line"] = 2] = "line";
    Objects[Objects["polygon"] = 3] = "polygon";
})(Objects || (Objects = {}));
