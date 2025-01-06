import { ClearError, NullExceptionError } from "../DataTypes/Error.js";
import { StyleProperties } from "./Style.js";
import { TriadObject } from "../Triad/TriadObject.js";
export class Rectangle extends TriadObject {
    instantiate() {
        let rect = this.renderTo.ownerDocument.createElement("div");
        rect.classList.add("rectangle");
        rect.style.width = `${this.renderable.dimensions.x}px`;
        rect.style.height = `${this.renderable.dimensions.y}px`;
        const playbackRect = this.renderTo.getBoundingClientRect();
        const centerX = playbackRect.width / 2;
        const centerY = playbackRect.height / 2;
        rect.style.left = `${centerX + this.renderable.position.x}px`;
        rect.style.top = `${centerY + this.renderable.position.y}px`;
        this.renderTo.appendChild(rect);
        this.instance = rect;
        return new ClearError("Rendered Successfully", 200);
    }
    render(currentFrame) {
        if (currentFrame === undefined || currentFrame === null) {
            console.error("currentFrame is undefined or null when calling render.");
            return new NullExceptionError("currentFrame is undefined or null.", 400);
        }
        if (this.instance != null) {
            if (!this.isVisible(currentFrame)) {
                this.instance.style.display = "none";
            }
            else {
                this.instance.style.display = "block";
                const playbackRect = this.renderTo.getBoundingClientRect();
                const centerX = playbackRect.width / 2;
                const centerY = playbackRect.height / 2;
                this.instance.style.left = `${centerX + this.renderable.position.x}px`;
                this.instance.style.top = `${centerY + this.renderable.position.y}px`;
                this.instance.style.width = `${this.renderable.dimensions.x}px`;
                this.instance.style.height = `${this.renderable.dimensions.y}px`;
                let transformString = "";
                this.style.forEach((style) => {
                    switch (style.attribute) {
                        case StyleProperties.borderColor:
                            this.instance.style.borderColor = `${style.value}`;
                            break;
                        case StyleProperties.fillColor:
                            this.instance.style.backgroundColor = `${style.value}`;
                            break;
                        case StyleProperties.opacity:
                            this.instance.style.opacity = `${style.value}`;
                            break;
                        case StyleProperties.zIndex:
                            this.instance.style.zIndex = `${style.value}`;
                            break;
                        case StyleProperties.rotX:
                            transformString += ` rotateX(${style.value}deg)`;
                            break;
                        case StyleProperties.rotY:
                            transformString += ` rotateY(${style.value}deg)`;
                            break;
                        case StyleProperties.rotZ:
                            transformString += ` rotateZ(${style.value}deg)`;
                            break;
                        default:
                            console.warn(`Unhandled style attribute: ${style.attribute}`);
                            break;
                    }
                });
                this.instance.style.transform = transformString;
                return new ClearError("Rendered Successfully", 200);
            }
        }
        return new NullExceptionError("Instance not created or visible.", 200);
    }
}
export class Ellipse extends TriadObject {
    instantiate() {
        let ellipse = this.renderTo.ownerDocument.createElement("div");
        ellipse.classList.add("ellipse");
        ellipse.style.width = `${this.renderable.dimensions.x}px`;
        ellipse.style.height = `${this.renderable.dimensions.y}px`;
        ellipse.style.borderRadius = "50%";
        const playbackRect = this.renderTo.getBoundingClientRect();
        const centerX = playbackRect.width / 2;
        const centerY = playbackRect.height / 2;
        ellipse.style.left = `${centerX + this.renderable.position.x}px`;
        ellipse.style.top = `${centerY + this.renderable.position.y}px`;
        this.renderTo.appendChild(ellipse);
        this.instance = ellipse;
        return new ClearError("Rendered Successfully", 200);
    }
    render(currentFrame) {
        if (currentFrame === undefined || currentFrame === null) {
            console.error("currentFrame is undefined or null when calling render.");
            return new NullExceptionError("currentFrame is undefined or null.", 400);
        }
        if (this.instance != null) {
            if (!this.isVisible(currentFrame)) {
                this.instance.style.display = "none";
            }
            else {
                this.instance.style.display = "block";
                this.instance.style.width = `${this.renderable.dimensions.x}px`;
                this.instance.style.height = `${this.renderable.dimensions.y}px`;
                const playbackRect = this.renderTo.getBoundingClientRect();
                const centerX = playbackRect.width / 2;
                const centerY = playbackRect.height / 2;
                this.instance.style.left = `${centerX + this.renderable.position.x}px`;
                this.instance.style.top = `${centerY + this.renderable.position.y}px`;
                let transformString = "";
                this.style.forEach((style) => {
                    switch (style.attribute) {
                        case StyleProperties.borderColor:
                            this.instance.style.borderColor = `${style.value}`;
                            break;
                        case StyleProperties.fillColor:
                            this.instance.style.backgroundColor = `${style.value}`;
                            break;
                        case StyleProperties.opacity:
                            this.instance.style.opacity = `${style.value}`;
                            break;
                        case StyleProperties.zIndex:
                            this.instance.style.zIndex = `${style.value}`;
                            break;
                        case StyleProperties.rotX:
                            transformString += ` rotateX(${style.value}deg)`;
                            break;
                        case StyleProperties.rotY:
                            transformString += ` rotateY(${style.value}deg)`;
                            break;
                        case StyleProperties.rotZ:
                            transformString += ` rotateZ(${style.value}deg)`;
                            break;
                        default:
                            console.warn(`Unhandled style attribute: ${style.attribute}`);
                            break;
                    }
                });
                this.instance.style.transform = transformString;
                return new ClearError("Rendered Successfully", 200);
            }
        }
        return new NullExceptionError("Instance not created or visible.", 200);
    }
}
