const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
	painting = false;
}

// mousemove: 마우스를 움직일 때
function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	console.log(x, y);
}

// mousedown: 마우스를 누르고 있을 때
function onMouseDown(event) {
	painting = true;
	console.log(painting);
}

// mouseup: 마우스를 뗄 때
function onMouseUp(event) {
	stopPainting();
}

function onMouseLeave(event) {
	stopPainting();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("mouseup", onMouseUp);
	canvas.addEventListener("mouseleave", stopPainting);
}