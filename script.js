const hue = Math.floor(Math.random() * 256);
document.querySelector("body").style.backgroundColor =
	"hsl(" + hue + ", 50%, 50%)"; // set random background color

const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

const listOfCoordinates = [];
const cellSize = 24; //px
const lineLength = 16; //px
const numOfLinesX = (canvas.width / cellSize) >> 0; // number of whole lines fit in to canvas
const numOfLinesY = (canvas.height / cellSize) >> 0; // number of whole lines fit in to canvas
console.log("lines: " + numOfLinesX + " by " + numOfLinesY);
console.log("h: " + canvas.height, "w: " + canvas.width);

let coordinates = [];

function getCoordinates() {
	for (let i = 0; i <= numOfLinesY; i++) {
		let y = i * cellSize;
		for (let j = 0; j <= numOfLinesX; j++) {
			let x = j * cellSize;
			coordinates.push({ x: x, y: y, x2: "", y2: "", angle: "" });
		}
	}
}

function drawLines(e) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 0.5;

	for (let i = 0; i < coordinates.length; i++) {
		context.beginPath();
		context.moveTo(coordinates[i].x, coordinates[i].y);
		let dx = e.x - coordinates[i].x;
		let dy = e.y - coordinates[i].y;
		let screenDelta = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
		let pointDelta = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
		let deltaDiff = pointDelta / screenDelta;
		let opacity = 1 - Math.pow(deltaDiff, 2);
		// console.log(opacity);
		context.strokeStyle = "rgba(0,0,0," + opacity + ")";

		coordinates[i].angle = Math.atan2(dy, dx);
		if (coordinates[i].angle < 0) {
			coordinates[i].angle += 2 * Math.PI;
		}
		coordinates[i].x2 =
			coordinates[i].x + Math.cos(coordinates[i].angle) * lineLength;
		coordinates[i].y2 =
			coordinates[i].y + Math.sin(coordinates[i].angle) * lineLength;

		context.lineTo(coordinates[i].x2, coordinates[i].y2);
	context.stroke();
	}
}

getCoordinates();
canvas.addEventListener("mousemove", function(e) {
	drawLines(e);
});
