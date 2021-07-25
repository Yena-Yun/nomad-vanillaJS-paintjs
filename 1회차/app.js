const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth;

//선 그리기
ctx.strokeStyle = "#2c2c2c"; //선 색깔
let painting = false; //선 굵기

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

	//painting이 false일 경우(= 안 그리고 있는 경우)
	//(캔버스 위에서 드래그 없이 마우스만 움직이는 경우)
	if (!painting) {
		//클릭만 했을 때 (경로 시작)
		ctx.beginPath(); //선 그리기 시작 명령
		ctx.moveTo(x, y); //선 시작 좌표

	//painting이 true일 경우(= 그리는 중인 경우)
	} else {
		//클릭한 상태로 마우스를 드래그하면서 그리는 동안 실행
		ctx.lineTo(x, y); //moveTo 좌표(시작점)로부터 마우스가 이동한 곳으로 좌표 이동		
		ctx.stroke(); //moveTo로부터 lineTo로 이동하는 과정의 선이 화면에 보이도록 렌더링
		ctx.closePath();
	}
}

// mousedown: 마우스를 누르고 있을 때
// mouseup: 마우스를 뗄 때

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
}