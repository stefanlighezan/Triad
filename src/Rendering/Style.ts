export abstract class Style {
    attribute: StyleProperties;
    value: any;
    constructor(_attribute: StyleProperties, _value: any) {
        this.attribute = _attribute;
        this.value = _value;
    }
}

export class BorderColor extends Style {}

export class FillColor extends Style {}

export class Opacity extends Style {}

export class zIndex extends Style {}

export class rotX extends Style {}

export class rotY extends Style {}

export class rotZ extends Style {}

export enum StyleProperties {
    borderColor,
    fillColor,
    opacity,
    zIndex,
    rotX,
    rotY,
    rotZ,
}
