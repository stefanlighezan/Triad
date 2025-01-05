import { ClearError, NullExceptionError } from "./Error";
import { Error } from "./Error";
import { StyleProperties } from "./Style";
import { TriadObject } from "./TriadObject";
import { Vector2 } from "./Vector2";

export class Rectangle extends TriadObject {
    instantiate(): Error {
        let rect = this.renderTo.ownerDocument.createElement("div");
        rect.classList.add("rectangle");

        // Set dimensions
        rect.style.width = `${this.renderable.dimensions.x}px`;
        rect.style.height = `${this.renderable.dimensions.y}px`;

        // Calculate playback center
        const playbackRect = this.renderTo.getBoundingClientRect();
        const centerX = playbackRect.width / 2;
        const centerY = playbackRect.height / 2;

        // Position at (0,0) relative to playback center
        rect.style.left = `${centerX + this.renderable.position.x}px`;
        rect.style.top = `${centerY + this.renderable.position.y}px`;

        this.renderTo.appendChild(rect);
        this.instance = rect;

        return new ClearError("Rendered Successfully", 200);
    }

    render(currentFrame: number): Error {
        if (currentFrame === undefined || currentFrame === null) {
            console.error(
                "currentFrame is undefined or null when calling render."
            );
            return new NullExceptionError(
                "currentFrame is undefined or null.",
                400
            );
        }

        if (this.instance != null) {
            if (!this.isVisible(currentFrame)) {
                this.instance.style.display = "none";
            } else {
                this.instance.style.display = "block";
                this.instance.style.width = `${this.renderable.dimensions.x}px`;
                this.instance.style.height = `${this.renderable.dimensions.y}px`;

                // Calculate playback center
                const playbackRect = this.renderTo.getBoundingClientRect();
                const centerX = playbackRect.width / 2;
                const centerY = playbackRect.height / 2;

                // Position at (0, 0) relative to playback center
                this.instance.style.left = `${
                    centerX + this.renderable.position.x
                }px`;
                this.instance.style.top = `${
                    centerY + this.renderable.position.y
                }px`;

                this.style.forEach((style) => {
                    switch (style.attribute) {
                        case StyleProperties.borderColor:
                            this.instance!!.style.borderColor = `${style.value}`;
                            break;
                        case StyleProperties.fillColor:
                            this.instance!!.style.backgroundColor = `${style.value}`;
                            break;
                        case StyleProperties.opacity:
                            this.instance!!.style.opacity = `${style.value}`;
                            break;
                        case StyleProperties.zIndex:
                            this.instance!!.style.zIndex = `${style.value}`;
                            break;
                    }
                });

                return new ClearError("Rendered Successfully", 200);
            }
        }

        return new NullExceptionError("Instance not created or visible.", 200);
    }
}
