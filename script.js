const hue = Math.floor(Math.random() * 256);
document.querySelector("body").style.backgroundColor =
  "hsl(" + hue + ", 50%, 50%)"; // set random background color

const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
context.scale(2, 2);

const listOfCoordinates = [];
const cellSize = 24; //px
const lineLength = 8; //px
const numOfLinesX = (canvas.width / cellSize) >> 0; // number of whole lines fit in to canvas
const numOfLinesY = (canvas.height / cellSize) >> 0; // number of whole lines fit in to canvas
console.log("lines: " + numOfLinesX + " by " + numOfLinesY);
console.log("h: " + canvas.height, "w: " + canvas.width);

let coordinates = [],
  x = 0,
  y = 0;

function getCoordinates() {
  for (let i = 0; i < numOfLinesY; i++) {
    y = i * cellSize;
    for (let j = 0; j < numOfLinesX; j++) {
      x = j * cellSize;
      coordinates.push({ x: x, y: y });
    }
  }
  console.log(coordinates);
}

function drawLines(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.lineWidth = 0.5;

  for (let i = 0; i < coordinates.length; i++) {
    let dx = Math.abs(e.clientX - coordinates[i].x); // distance between pointer and item coordinate
    let dy = Math.abs(e.clientY - coordinates[i].y);
    let angle = Math.atan(dy / dx);
    context.moveTo(coordinates[i].x, coordinates[i].y);
    context.lineTo(
      coordinates[i].x + Math.cos(angle) * lineLength,
      coordinates[i].y + Math.sin(angle) * lineLength
    );
  }
  context.stroke();
}

getCoordinates();
canvas.addEventListener("mousemove", function(e) {
  drawLines(e);
});
