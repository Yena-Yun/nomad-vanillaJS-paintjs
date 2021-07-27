const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = canvas.offsetWidth;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 배경색 없이 그림 그린 후 우클릭으로 다른 이름으로 그림 저장하면
// 배경색이 transparent가 되어 있는 것 방지 (배경색의 초기값을 흰색으로)
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//초기값 지정
ctx.strokeStyle = INITIAL_COLOR; //선 색깔
ctx.fillStyle = INITIAL_COLOR; //채우기 색깔
ctx.lineWidth = 2.5; //선 굵기

// //사각형 만들고 안에 색깔 채우기
// ctx.fillStyle = 'green';
// ctx.fillRect(50, 20, 100, 49);
// ctx.fillStyle = 'red'; //(아래에서 fillStyle을 바꿔도 앞의 사각형에는 영향 미치지 않음)
// ctx.fillRect(80, 100, 100, 49);

let painting = false; //그리고 있는 중인지 여부(flag 변수)
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting(event) {
	if (filling === false) {
		painting = true;
	}
}

// mousemove: 마우스를 움직일 때
function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;

	//painting이 false일 경우(= 안 그리고 있는 경우)
	//(캔버스 위에서 클릭&드래그 없이 마우스 움직임만 있음)
	if (!painting) {
		ctx.beginPath(); //선 그리기 시작
		ctx.moveTo(x, y); //선 시작 좌표

	//painting이 true일 경우(= 그리는 중인 경우)
	} else {
		ctx.lineTo(x, y); //moveTo 좌표(시작점)로부터 마우스가 이동한 곳으로 좌표 이동		
		ctx.stroke(); //moveTo로부터 lineTo로 이동하는 과정의 선을 화면에 보여줌
		// ctx.closePath(); //lineTo의 좌표에 도착하면 선이 끝나버림
	}
}

// mousedown: 마우스를 누르고 있을 때
// mouseup: 마우스를 뗄 때

// 색깔을 선택했을 때의 동작을 처리하는 함수
function handleColorClick(event) {
	// 클릭한 색깔의 style 안의 backgroundColor를 가져옴 (style.~: 자바스크립트 문법)
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color; //선택한 색으로 선색이 결정됨
	ctx.fillStyle = color; //선택한 색으로 fill색이 결정됨
}

// range 바를 조절할 때의 동작을 처리하는 함수
function handleRangeChange(event) {
	// range 바의 조절값 가져오기
	const size = event.target.value;
	// 선 굵기 = 선택된 조절값
	ctx.lineWidth = size * 2;
}

function handleModeClick(event) {
	if (filling) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
		ctx.fillStyle = ctx.strokeStyle;
	}
}

function handleCanvasClick(event) {
	// filling 플래그가 true일 때만 canvas 전체를 채우는 fill 동작 실행
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

//canvas 위에서는 우클릭이 안 되도록 하는 함수
//('다른 이름으로 저장'이 아닌 save 버튼 눌러서 저장하게 하고 싶을 때)
function handleRightClick(event) {
	event.preventDefault();
}

function handleSaveClick(event) {
	//canvas.toDataURL(type, encoderOptions) - 인자는 둘 다 optional
	//(type의 default는 image/png)
	//canvas에 그려진 image를 가져와서 url로 만들기
	const image = canvas.toDataURL("image/jpeg");
	// console.log(image); //콘솔에 찍힌 내용의 맨 끝에 copy 누르고 주소창에 복붙하면 저장된 이미지가 브라우저에 뜸

	// a 태그 생성
	const link = document.createElement("a");

	//download는 "a" 태그의 속성 중 하나
	//	=> 브라우저에게 해당 url의 파일을 다운로드 하라고 지시
	link.href = image; //href에 파일의 url 연결
	link.download = "mypainting.jpeg"; //다운로드 받을 때의 파일 이름 지정
	link.click(); //save 버튼 클릭 시 link("a" 태그)가 클릭된 것과 같은 효과 부여
}

//canvas 위에서의 이벤트 관리
if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleRightClick); // ** 우클릭 저장 방지
}

//Array.from: object로부터 array를 만드는 메소드
//colors를 배열로 만든 뒤 forEach로 안에서 하나씩 꺼내며 각 color에 대해 함수 실행
Array.from(colors).forEach(color =>
	color.addEventListener("click", handleColorClick)
);

if (range) {
	//addEventlistener("input", ...): input의 value가 바뀔 때 함수 실행
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}