document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#draw"); // select the canvas dom element
  const ctx = canvas.getContext("2d"); // create the context for our canvas

  let isDraw = false;
  let hue = 0;
  let lastX = 0;
  let lastY = 0;
  let direction = true;

  canvas.width = window.innerWidth; // width of the canvas is equal to window width
  canvas.height = window.innerHeight; // height of the canvas is equal to window height
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 75;

  function draw(e) {
    if (!isDraw) return; // if not drawing don't invoke the function

    ctx.beginPath(); // begin drawing on canvas
    ctx.moveTo(lastX, lastY); // starting from
    ctx.lineTo(e.offsetX, e.offsetY); // Go to
    ctx.strokeStyle = `hsl(${(hue += 5)}, 75%, 50%)`; // line color changing based on hsl
    // ctx.globalCompositeOperation = "screen";
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY]; // last position of the line is set to the current mouse position

    if (hue >= 360) hue = 0;

    if (ctx.lineWidth >= 75 || ctx.lineWidth <= 1) direction = !direction;

    if (direction) ctx.lineWidth++;
    else ctx.lineWidth--;
  }

  canvas.addEventListener("mousedown", (e) => {
    // only let drawing when mouse button is down
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseleave", () => (isDraw = false));
  canvas.addEventListener("mouseup", () => (isDraw = false));
});
