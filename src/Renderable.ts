import { Objects } from "./TriadObject";
import { Vector2 } from "./Vector2";

export class Renderable {
    position: Vector2;
    dimensions: Vector2;
    objectType: number;

    constructor(_position: Vector2, _dimensions: Vector2, _object: number) {
        this.position = _position;
        this.dimensions = _dimensions;
        this.objectType = _object;
    }
}
