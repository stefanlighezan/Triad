import { Timeline } from "./dist/Triad/Timeline.js";
import { Video } from "./dist/Triad/Video.js";
import { Objects, TriadObject } from "./dist/Triad/TriadObject.js";
import { Animations } from "./dist/Rendering/Animations.js";
import { Animation, AnimationType } from "./dist/Rendering/Animation.js";
import { Renderable } from "./dist/Rendering/Renderable.js";
import { Vector2 } from "./dist/DataTypes/Vector2.js";
import { Rectangle, Ellipse } from "./dist/Rendering/Shapes.js";
import { Lifecycle } from "./dist/Triad/Lifecycle.js";
import {
    BorderColor,
    FillColor,
    Opacity,
    rotX,
    rotY,
    rotZ,
    StyleProperties,
    zIndex,
} from "./dist/Rendering/Style.js";

const timelineObject = document.getElementById("currentPosition");
const durationRod = document.getElementById("durationRod");
const addItemButton = document.getElementById("addItem");
const addItemMenu = document.getElementById("itemCatalog");
const objectList = document.getElementById("objectList");
const playback = document.getElementById("playback");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const pauseButtonToggle = document.getElementById("pauseButton");
const settings = document.getElementById("settings");

const setup = { duration: 3, paused: false, fps: 24 };
const video = new Video(setup.duration, setup.paused, setup.fps);
const timeline = new Timeline(
    timelineObject,
    video.currentFrame,
    video.totalFrames
);

settings.addEventListener("click", () => {
    sidebar.innerHTML = "";
    let videoPropertiesPanel = document.getElementById("videoPropertiesPanel");

    if (!videoPropertiesPanel) {
        videoPropertiesPanel = document.createElement("div");
        videoPropertiesPanel.id = "videoPropertiesPanel";
        videoPropertiesPanel.innerHTML = "<h3>Video Properties</h3>";

        const hr = document.createElement("hr");

        const durationLabel = document.createElement("label");
        durationLabel.textContent = "Video Duration (in seconds): ";
        const durationInput = document.createElement("input");
        durationInput.type = "number";
        durationInput.value = setup.duration;
        durationInput.addEventListener("input", (e) => {
            setup.duration = parseFloat(e.target.value);
            video.totalFrames = video.fps * setup.duration;
            renderEverything();
        });
        durationLabel.appendChild(durationInput);
        videoPropertiesPanel.appendChild(durationLabel);

        videoPropertiesPanel.appendChild(hr);

        const fpsLabel = document.createElement("label");
        fpsLabel.textContent = "Frames per second (FPS): ";
        const fpsInput = document.createElement("input");
        fpsInput.type = "number";
        fpsInput.value = setup.fps;
        fpsInput.addEventListener("input", (e) => {
            setup.fps = parseInt(e.target.value, 10);
            video.fps = setup.fps;
            clearInterval(interval);
            interval = setInterval(() => {
                if (video.currentFrame - 1 < video.totalFrames) {
                    if (!video.paused) {
                        renderEverything();
                        timelineObject.style.left = `${
                            5 + (video.currentFrame / video.totalFrames) * 85
                        }%`;
                        timelineObject.textContent = video.currentFrame;
                        video.currentFrame++;
                    }
                }
            }, 1000 / video.fps);
            renderEverything();
        });
        fpsLabel.appendChild(fpsInput);
        videoPropertiesPanel.appendChild(fpsLabel);

        sidebar.appendChild(videoPropertiesPanel);
    } else {
        videoPropertiesPanel.classList.toggle("hidden");
    }
});

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
    let animation = new Animations([]);
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

        triadObject.instance.addEventListener("dblclick", () => {
            const index = sceneObjects.indexOf(triadObject);
            if (index !== -1) {
                sceneObjects.splice(index, 1);
            }

            triadObject.instance.remove();

            if (selectedObject === triadObject) {
                selectedObject = null;
                updateSidebar();
            }

            renderEverything();
        });
        updateSidebar();
    }
}

function updateSidebar() {
    if (!selectedObject) return;

    const sidebarToggleClone =
        sidebar.querySelector("#sidebarToggle") ||
        sidebarToggle.cloneNode(true);
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

    renderAnimationList();
}

function renderAnimationList() {
    const animationDiv = document.createElement("div");
    animationDiv.id = "animation-list";
    animationDiv.innerHTML = "<h4>Animations</h4>";

    const selectAnimation = document.createElement("select");
    Object.keys(AnimationType).forEach((key) => {
        if (isNaN(Number(key))) {
            const option = document.createElement("option");
            option.value = AnimationType[key];
            option.textContent = key;
            selectAnimation.appendChild(option);
        }
    });

    animationDiv.appendChild(selectAnimation);

    const addAnimationButton = document.createElement("button");
    addAnimationButton.textContent = "Add Animation";
    addAnimationButton.addEventListener("click", () => {
        const newAnimation = new Animation(0, 5, selectAnimation.value);
        selectedObject.animation.animations.push(newAnimation);
        renderAnimationList();
    });

    animationDiv.appendChild(addAnimationButton);

    selectedObject.animation.animations.forEach((anim, index) => {
        const animDiv = document.createElement("div");
        animDiv.innerHTML = `<h5>Animation #${index}</h5>`;

        const startInput = document.createElement("input");
        startInput.type = "number";
        startInput.value = anim.start;
        startInput.placeholder = `Start Frame (1 sec = ${video.fps}fps)`;
        startInput.addEventListener("input", (e) => {
            anim.start = parseInt(e.target.value, 10);
        });

        const durationInput = document.createElement("input");
        durationInput.type = "number";
        durationInput.value = anim.duration;
        durationInput.placeholder = "Duration (in frames)";
        durationInput.addEventListener("input", (e) => {
            anim.duration = parseInt(e.target.value, 10);
        });

        const otherInput = document.createElement("input");
        otherInput.type = "number";
        otherInput.value = anim.duration;
        anim.other = 2;
        otherInput.placeholder = "Other attribute (read documentation)";
        otherInput.addEventListener("input", (e) => {
            anim.other = parseInt(e.target.value, 10);
        });

        animDiv.appendChild(startInput);
        animDiv.appendChild(durationInput);
        animDiv.appendChild(otherInput);
        animationDiv.appendChild(animDiv);
    });

    const existingAnimationDiv = sidebar.querySelector("#animation-list");
    if (existingAnimationDiv) {
        sidebar.replaceChild(animationDiv, existingAnimationDiv);
    } else {
        sidebar.appendChild(animationDiv);
    }
}

function renderEverything() {
    sceneObjects.forEach((object) => {
        object.renderable.dimensions = new Vector2(
            object.renderable.initialDimensions.x,
            object.renderable.initialDimensions.y
        );

        object.animation.animations.forEach((anim) => {
            const progress = anim.applyAnimation(video.currentFrame);

            if (progress >= 0 && progress <= 1) {
                if (anim.animationType == 0) {
                    object.style.forEach((style) => {
                        if (style.attribute === StyleProperties.opacity) {
                            style.value = progress;
                        }
                    });
                } else if (anim.animationType == 1) {
                    object.style.forEach((style) => {
                        if (style.attribute === StyleProperties.opacity) {
                            style.value = 1 - progress;
                        }
                    });
                } else if (anim.animationType == 2) {
                    const scaleFactorX =
                        object.renderable.initialDimensions.x *
                        (1 + (anim.other - 1) * progress);
                    const scaleFactorY =
                        object.renderable.initialDimensions.y *
                        (1 + (anim.other - 1) * progress);

                    object.renderable.dimensions = new Vector2(
                        scaleFactorX,
                        scaleFactorY
                    );
                }
            } else if (progress > 1 && anim.animationType == 2) {
                const scaleFactorX =
                    object.renderable.initialDimensions.x * anim.other;
                const scaleFactorY =
                    object.renderable.initialDimensions.y * anim.other;

                object.renderable.dimensions = new Vector2(
                    scaleFactorX,
                    scaleFactorY
                );
            }
        });

        object.render(video.currentFrame);
    });
}

let interval = setInterval(() => {
    if (video.currentFrame - 1 < video.totalFrames) {
        if (!video.paused) {
            renderEverything();
            timelineObject.style.left = `${
                5 + (video.currentFrame / video.totalFrames) * 85
            }%`;
            timelineObject.textContent = video.currentFrame;
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
        timelineObject.textContent = video.currentFrame;
        renderEverything();
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
        renderEverything();
        timelineObject.style.left = `${
            5 + (video.currentFrame / video.totalFrames) * 85
        }%`;
        timelineObject.textContent = video.currentFrame;
    }
    if (e.code === "ArrowRight") {
        video.paused = true;
        video.currentFrame = Math.min(
            video.totalFrames,
            video.currentFrame + 1
        );
        renderEverything();
        timelineObject.style.left = `${
            5 + (video.currentFrame / video.totalFrames) * 85
        }%`;
        timelineObject.textContent = video.currentFrame;
    }
});
