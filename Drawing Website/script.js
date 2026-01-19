let canvas, ctx;
let drawing = false;
let color = "black";
let brushSize = 5;

let stickerMode = false;
let currentSticker = "";

function kids() { window.location.href = "kids.html"; }
function beg() { window.location.href = "beginners.html"; }
function prof() { window.location.href = "professional.html"; }

// SHOW DRAW AREA
function startDrawing() {
    document.getElementById("drawArea").style.display = "flex";

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", () => { drawing = true; playDrawSound(); });
    canvas.addEventListener("mouseup", () => { drawing = false; stopDrawSound(); });
    canvas.addEventListener("mouseleave", () => { drawing = false; stopDrawSound(); });
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("click", placeSticker);
}

// DRAWING FUNCTION
function draw(e) {
    if (!drawing || stickerMode) return;

    const rect = canvas.getBoundingClientRect();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
        e.clientX - rect.left,
        e.clientY - rect.top,
        brushSize,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// CHANGE COLOR
function setColor(c) {
    color = c;
    stickerMode = false;
}

// CHANGE BRUSH
function changeBrushSize(size) {
    brushSize = size;
}

// ERASER
function erase() {
    color = "white";
    stickerMode = false;
}

// CLEAR
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// SAVE
function saveImage() {
    let link = document.createElement("a");
    link.download = "my_drawing.png";
    link.href = canvas.toDataURL();
    link.click();
}

// STICKERS
function addSticker(emoji) {
    stickerMode = true;
    currentSticker = emoji;
}

function placeSticker(e) {
    if (!stickerMode) return;

    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    ctx.font = "40px Arial";
    ctx.fillText(currentSticker, x, y);
}

// SOUNDS
const drawSound = new Audio("sounds/draw.mp3");
const clickSound = new Audio("sounds/click.mp3");
const eraseSound = new Audio("sounds/erase.mp3");

drawSound.volume = 0.3;
clickSound.volume = 0.5;
eraseSound.volume = 0.4;

let isDrawingSoundPlaying = false;

function playDrawSound() {
    if (!isDrawingSoundPlaying) {
        drawSound.loop = true;
        drawSound.play();
        isDrawingSoundPlaying = true;
    }
}

function stopDrawSound() {
    drawSound.pause();
    drawSound.currentTime = 0;
    isDrawingSoundPlaying = false;
}
