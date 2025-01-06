import { Objects } from "../Triad/TriadObject";
import { Vector2 } from "../DataTypes/Vector2";

export class Renderable {
    position: Vector2;
    dimensions: Vector2;
    initialDimensions: Vector2
    objectType: number;

    constructor(_position: Vector2, _dimensions: Vector2, _object: number) {
        this.position = _position;
        this.dimensions = _dimensions;
        this.objectType = _object;
        this.initialDimensions = _dimensions;
    }
}
