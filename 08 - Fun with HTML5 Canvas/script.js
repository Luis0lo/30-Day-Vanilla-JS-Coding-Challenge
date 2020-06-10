const canvas = document.querySelector("#draw");
// you draw over the context, no directly over html canvas
const ctx = canvas.getContext("2d");
// resize the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Color
ctx.strokeStyle = "purple";
//how line merge
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = "overlay";

//only when we press it will draw
let isDrawing = false;
//where do you start a line from
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// will be called whenever we move our mouse on top of the canvas
function draw(e) {
  if (!isDrawing) return; //stop the function from runnning when there are not moused down
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  //start from
  ctx.moveTo(lastX, lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  //update variables
  // lastX = e.offsetX;
  // lastY = e.offsetY;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
