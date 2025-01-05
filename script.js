import { Timeline } from "./dist/Timeline.js";
import { Video } from "./dist/Video.js";
import { Objects, TriadObject } from "./dist/TriadObject.js";
import { Animation } from "./dist/Animation.js";
import { Renderable } from "./dist/Renderable.js";
import { Vector2 } from "./dist/Vector2.js";
import { Rectangle, Ellipse } from "./dist/Shapes.js";
import { Lifecycle } from "./dist/Lifecycle.js";
import {
    BorderColor,
    FillColor,
    Opacity,
    rotX,
    rotY,
    rotZ,
    StyleProperties,
    zIndex,
} from "./dist/Style.js";

const timelineObject = document.getElementById("currentPosition");
const durationRod = document.getElementById("durationRod");
const addItemButton = document.getElementById("addItem");
const addItemMenu = document.getElementById("itemCatalog");
const objectList = document.getElementById("objectList");
const playback = document.getElementById("playback");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const pauseButtonToggle = document.getElementById("pauseButton");

const setup = { duration: 3, paused: false, fps: 24 };
const video = new Video(setup.duration, setup.paused, setup.fps);
const timeline = new Timeline(
    timelineObject,
    video.currentFrame,
    video.totalFrames
);

let sceneObjects = [];
let selectedObject = null;

let isDraggingObject = false;
let dragOffset = { x: 0, y: 0 };

function instantiateTriadObject(key) {
    let lifecycle = new Lifecycle(0, video.totalFrames);
    let renderable = new Renderable(
        new Vector2(0, 0),
        new Vector2(50, 50),
        key
    );
    let animation = new Animation();
    let styles = [
        new BorderColor(StyleProperties.borderColor, "#ff0000"),
        new FillColor(StyleProperties.fillColor, "#00ff00"),
        new Opacity(StyleProperties.opacity, 0.5),
        new zIndex(StyleProperties.zIndex, 10),
        new rotX(StyleProperties.rotX, 0),
        new rotY(StyleProperties.rotY, 0),
        new rotZ(StyleProperties.rotZ, 0),
    ];
    let triadObject = null;
    switch (Objects[key]) {
        case 0:
            triadObject = new Rectangle(
                lifecycle,
                renderable,
                animation,
                playback,
                styles
            );
            break;
        case 1:
            triadObject = new Ellipse(
                lifecycle,
                renderable,
                animation,
                playback,
                styles
            );
            break;
        case 2:
            break;
        case 3:
            break;
    }
    if (triadObject != null) {
        triadObject.instantiate();
        triadObject.render(video.currentFrame);
        sceneObjects.push(triadObject);
        selectedObject = triadObject;

        triadObject.instance.addEventListener("mousedown", (e) => {
            isDraggingObject = true;
            dragOffset.x = e.clientX - triadObject.renderable.position.x;
            dragOffset.y = e.clientY - triadObject.renderable.position.y;
            selectedObject = triadObject;
            updateSidebar();
            video.pause();
        });

        document.addEventListener("mousemove", (e) => {
            if (isDraggingObject && selectedObject === triadObject) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                triadObject.renderable.position = new Vector2(newX, newY);
                triadObject.render(video.currentFrame);
            }
        });

        document.addEventListener("mouseup", () => {
            if (isDraggingObject) {
                isDraggingObject = false;
                video.unpause();
            }
        });

        triadObject.instance.addEventListener("click", () => {
            selectedObject = triadObject;
            updateSidebar();
        });
        updateSidebar();
    }
}


function updateSidebar() {
    if (!selectedObject) return;

    const sidebarToggleClone = sidebar.querySelector("#sidebarToggle");
    sidebar.innerHTML = "<h3>Object Properties</h3>";
    sidebar.appendChild(sidebarToggleClone);

    const startInput = document.createElement("input");
    startInput.type = "number";
    startInput.value = selectedObject.lifespan.start;
    startInput.addEventListener("input", (e) => {
        selectedObject.lifespan.start = parseInt(e.target.value, 10);
        selectedObject.render(video.currentFrame);
    });
    sidebar.appendChild(startInput);

    const endInput = document.createElement("input");
    endInput.type = "number";
    endInput.value = selectedObject.lifespan.end;
    endInput.addEventListener("input", (e) => {
        selectedObject.lifespan.end = parseInt(e.target.value, 10);
        selectedObject.render(video.currentFrame);
    });
    sidebar.appendChild(endInput);

    const positionInputs = ["x", "y"].map((axis) => {
        const input = document.createElement("input");
        input.type = "number";
        input.value = selectedObject.renderable.position[axis];
        input.addEventListener("input", (e) => {
            selectedObject.renderable.position[axis] = parseInt(
                e.target.value,
                10
            );
            selectedObject.render(video.currentFrame);
        });
        return input;
    });
    positionInputs.forEach((input) => sidebar.appendChild(input));

    const dimensionInputs = ["x", "y"].map((axis) => {
        const input = document.createElement("input");
        input.type = "number";
        input.value = selectedObject.renderable.dimensions[axis];
        input.addEventListener("input", (e) => {
            selectedObject.renderable.dimensions[axis] = parseInt(
                e.target.value,
                10
            );
            selectedObject.render(video.currentFrame);
        });
        return input;
    });
    dimensionInputs.forEach((input) => sidebar.appendChild(input));

    selectedObject.style.forEach((style) => {
        const container = document.createElement("div");
        container.classList.add("style-container");
        let input;

        switch (style.attribute) {
            case StyleProperties.borderColor:
            case StyleProperties.fillColor:
                input = document.createElement("input");
                input.type = "color";
                input.value = style.value;
                input.addEventListener("input", (e) => {
                    style.value = e.target.value;
                    selectedObject.render(video.currentFrame);
                });
                break;

            case StyleProperties.opacity:
                input = document.createElement("input");
                input.type = "range";
                input.min = "0";
                input.max = "1";
                input.step = "0.01";
                input.value = style.value;
                input.addEventListener("input", (e) => {
                    style.value = parseFloat(e.target.value);
                    selectedObject.render(video.currentFrame);
                });
                break;

            case StyleProperties.zIndex:
                input = document.createElement("input");
                input.type = "range";
                input.min = "0";
                input.max = "10";
                input.step = "1";
                input.value = style.value;
                input.addEventListener("input", (e) => {
                    style.value = parseInt(e.target.value, 10);
                    selectedObject.render(video.currentFrame);
                });
                break;
                case StyleProperties.zIndex:
                    input = document.createElement("input");
                    input.type = "range";
                    input.min = "0";
                    input.max = "10";
                    input.step = "1";
                    input.value = style.value;
                    input.addEventListener("input", (e) => {
                        style.value = parseInt(e.target.value, 10);
                        selectedObject.render(video.currentFrame);
                    });
                    break;
                    case StyleProperties.zIndex:
                        input = document.createElement("input");
                        input.type = "range";
                        input.min = "0";
                        input.max = "10";
                        input.step = "1";
                        input.value = style.value;
                        input.addEventListener("input", (e) => {
                            style.value = parseInt(e.target.value, 10);
                            selectedObject.render(video.currentFrame);
                        });
                        break;
                    case StyleProperties.rotX:
                        input = document.createElement("input");
                        input.type = "range";
                        input.min = "0";
                        input.max = "360";
                        input.step = "1";
                        input.value = style.value;
                        input.addEventListener("input", (e) => {
                            style.value = parseInt(e.target.value, 10);
                            selectedObject.render(video.currentFrame);
                        });
                        break;
                    case StyleProperties.rotY:
                        input = document.createElement("input");
                        input.type = "range";
                        input.min = "0";
                        input.max = "360";
                        input.step = "1";
                        input.value = style.value;
                        input.addEventListener("input", (e) => {
                            style.value = parseInt(e.target.value, 10);
                            selectedObject.render(video.currentFrame);
                        });
                        break;
                    case StyleProperties.rotZ:
                        input = document.createElement("input");
                        input.type = "range";
                        input.min = "0";
                        input.max = "360";
                        input.step = "1";
                        input.value = style.value;
                        input.addEventListener("input", (e) => {
                            style.value = parseInt(e.target.value, 10);
                            selectedObject.render(video.currentFrame);
                        });
                        break;

            default:
                break;
        }

        if (input) container.appendChild(input);
        sidebar.appendChild(container);
    });
}

setInterval(() => {
    if (video.currentFrame < video.totalFrames) {
        if (!video.paused) {
            sceneObjects.forEach((object) => {
                object.render(video.currentFrame);
            });
            timelineObject.style.left = `${
                5 + (video.currentFrame / video.totalFrames) * 85
            }%`;
            video.currentFrame++;
        }
    }
}, 1000 / video.fps);

let isDragging = false;

timelineObject.addEventListener("mousedown", (e) => {
    isDragging = true;
    video.pause();
});

addItemButton.addEventListener("click", () => {
    addItemMenu.style.display = `${
        addItemMenu.style.display == "none" ? "block" : "none"
    }`;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const rect = durationRod.getBoundingClientRect();
        let positionPercent = (e.clientX - rect.left) / rect.width;
        positionPercent = Math.min(Math.max(positionPercent, 0.05), 0.9);
        timelineObject.style.left = `${positionPercent * 100}%`;
        timeline.updateCurrentFrame((positionPercent - 0.05) / 0.85);
        video.currentFrame = timeline.currentFrame;
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        video.unpause();
    }
});

const objectNames = Object.keys(Objects).filter((key) => isNaN(Number(key)));
objectNames.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
        instantiateTriadObject(name);
    });
    objectList.appendChild(li);
});

function filterObjects(query) {
    const filteredNames = objectNames
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
        .sort(
            (a, b) =>
                a.toLowerCase().indexOf(query.toLowerCase()) -
                b.toLowerCase().indexOf(query.toLowerCase())
        );
    objectList.innerHTML = "";
    filteredNames.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        li.addEventListener("click", () => {
            instantiateTriadObject(name);
        });
        objectList.appendChild(li);
    });
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
    const query = e.target.value;
    filterObjects(query);
});

window.addEventListener("resize", () => {
    sceneObjects.forEach((object) => {
        object.render(video.currentFrame);
    });
});

sidebarToggle.addEventListener("click", () => {
    const isCollapsed = sidebar.classList.toggle("collapsed");
    sidebarToggle.textContent = isCollapsed ? "⮞" : "⮜";
});

pauseButtonToggle.addEventListener("click", () => {
    video.paused = !video.paused;
    if (video.paused) {
        pauseButtonToggle.textContent = "⏸️";
    } else {
        pauseButtonToggle.textContent = "▶️";
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        video.paused = !video.paused;
        pauseButtonToggle.textContent = video.paused ? "▶️" : "⏸️";
    }
    if (e.code === "ArrowLeft") {
        video.paused = true;
        video.currentFrame = Math.max(0, video.currentFrame - 1);
        sceneObjects.forEach((object) => object.render(video.currentFrame));
        timelineObject.style.left = `${
            5 + (video.currentFrame / video.totalFrames) * 85
        }%`;
    }
    if (e.code === "ArrowRight") {
        video.paused = true;
        video.currentFrame = Math.min(
            video.totalFrames - 1,
            video.currentFrame + 1
        );
        sceneObjects.forEach((object) => object.render(video.currentFrame));
        timelineObject.style.left = `${
            5 + (video.currentFrame / video.totalFrames) * 85
        }%`;
    }
});
