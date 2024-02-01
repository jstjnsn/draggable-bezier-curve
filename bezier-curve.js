const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DPR = window.devicePixelRatio || 1;

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.width = WIDTH * DPR;
canvas.height = HEIGHT * DPR;
context.scale(DPR, DPR);
canvas.style.width = `${WIDTH}px`;
canvas.style.height = `${HEIGHT}px`;

context.lineWidth = 3;
context.lineJoin = "round";
context.lineCap = "round";

const root = document.querySelector("body");
root.append(canvas);

const start = { x: 50, y: HEIGHT / 2 };
const cp1 = { x: WIDTH / 2, y: HEIGHT - 50 };
const cp2 = { x: WIDTH / 2, y: 50 };
const end = { x: WIDTH - 50, y: HEIGHT / 2 };

const mouse = {
  x: 0,
  y: 0,
};
const circleSize = 100;
let mouseDown = false;

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener("mousedown", (e) => {
  mouseDown = true;
});

document.addEventListener("mouseup", (e) => {
  mouseDown = false;
});

let showHandles = true;

const handleToggle = document.createElement("div");
handleToggle.classList.add("handle-toggle");
handleToggle.addEventListener("click", () => {
  showHandles = !showHandles;
  handleToggle.classList.toggle("active");
});
root.append(handleToggle);

window.onload = draw;

function draw() {
  requestAnimationFrame(draw);
  context.fillStyle = "#1a1a1a";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.strokeStyle = "#e1e1e1";
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  context.stroke();

  if (showHandles) {
    drawCircle(start);
    drawLine(start, cp1);
    drawCircle(cp1);
    drawCircle(end);
    drawLine(end, cp2);
    drawCircle(cp2);
  }

  if (mouseDown && showHandles) {
    if (collision(mouse, start)) {
      start.x = mouse.x;
      start.y = mouse.y;
    } else if (collision(mouse, cp1)) {
      cp1.x = mouse.x;
      cp1.y = mouse.y;
    } else if (collision(mouse, cp2)) {
      cp2.x = mouse.x;
      cp2.y = mouse.y;
    } else if (collision(mouse, end)) {
      end.x = mouse.x;
      end.y = mouse.y;
    }
  }
}

function drawCircle(pos) {
  context.fillStyle = "#e1e1e1";
  context.beginPath();
  context.arc(pos.x, pos.y, circleSize / 2, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(from, to) {
  context.strokeStyle = "#e1e1e1";
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
}

function collision(a, b) {
  const result =
    a.x >= b.x - circleSize &&
    a.x <= b.x + circleSize &&
    a.y >= b.y - circleSize &&
    a.y <= b.y + circleSize;
  return result;
}
