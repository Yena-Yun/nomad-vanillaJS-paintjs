const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

// mousemove: 마우스를 움직일 때
function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	console.log(x, y);
}

// mousedown: 마우스를 누르고 있을 때
// mouseup: 마우스를 뗄 때

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
}