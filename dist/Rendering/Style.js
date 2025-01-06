export class Style {
    constructor(_attribute, _value) {
        this.attribute = _attribute;
        this.value = _value;
    }
}
export class BorderColor extends Style {
}
export class FillColor extends Style {
}
export class Opacity extends Style {
}
export class zIndex extends Style {
}
export class rotX extends Style {
}
export class rotY extends Style {
}
export class rotZ extends Style {
}
export var StyleProperties;
(function (StyleProperties) {
    StyleProperties[StyleProperties["borderColor"] = 0] = "borderColor";
    StyleProperties[StyleProperties["fillColor"] = 1] = "fillColor";
    StyleProperties[StyleProperties["opacity"] = 2] = "opacity";
    StyleProperties[StyleProperties["zIndex"] = 3] = "zIndex";
    StyleProperties[StyleProperties["rotX"] = 4] = "rotX";
    StyleProperties[StyleProperties["rotY"] = 5] = "rotY";
    StyleProperties[StyleProperties["rotZ"] = 6] = "rotZ";
})(StyleProperties || (StyleProperties = {}));
