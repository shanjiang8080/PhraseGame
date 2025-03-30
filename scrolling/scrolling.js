// When the user scrolls the page, execute myFunction
window.onscroll = function() {ScrollProgress()};
// if the cookie is there: give it the thing in the first place



let gameStarted = false;
let gameFinished = false;

const img = new Image();
img.crossOrigin = "anonymous"; // dunno what this does
img.src = "/scrolling/asteroids.png";
// the aspect ratio is 2 wide, 5 tall.

const canvas = document.getElementById("playOverlay");
 
canvas.width = 100;                          /// set width = image width
// so if width is 100, height is 100 * 5/2 = 250
canvas.height = 250;
//Math.round(window.innerWidth * 2.5);
console.log(`width is ${canvas.width}, height is ${canvas.height}`);
const ctx = canvas.getContext("2d", { willReadFrequently: true });
img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0, 100, 250);
    img.style.display = "none";
});

const pixelRatio = 100 / window.innerWidth;

function pick(xpos, ypos) {
  const bounding = canvas.getBoundingClientRect();
  const x = (xpos - bounding.left) * pixelRatio;
  const y = (ypos - bounding.top) * pixelRatio;
  //console.log(`x: ${x}, y: ${y}`);
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;

  if (data[0] == data[1] == data[2] == data[3]) {
    console.log("did not collide");
    return false;
  } else {
    console.log(`collided: ${rgbColor}`);
    return true;
  }
}

//canvas.addEventListener("mousemove", (event) => pick(event.clientX, event.clientY, hoveredColor));


const spaceship = document.getElementById("spaceship");
function ScrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("scrollbar").style.width = scrolled + "%";
  spaceship.style.paddingLeft = scrolled + "%";
  if (scrolled >= 50 && !gameStarted) {
    gameStarted = true;
    ResetGame();
  }
}

// this should be called every half second
// should move the canvas up 1 pixel each time.
let moveInterval = 0;
let collideInterval = 0;

let canvasMovement = 0;
function MoveCanvas() {
    canvas.style.transform = `translateY(${canvasMovement / pixelRatio}px)`;
    canvasMovement++;
    if (canvasMovement > 250 + window.innerHeight * pixelRatio) {
        console.log("cleared!");
        FinishGame();
    }
}

function SetupMove() {
    if (moveInterval != 0) {
        clearInterval(moveInterval);
    }
    moveInterval = setInterval(MoveCanvas, 100);
    canvasMovement = 0;
}

function ResetGame() {
    SetupMove();
    spaceship.src = "/scrolling/ship.png";
    SetupCollision();
}

function SetupCollision() {
    if (collideInterval != 0) {
        clearInterval(collideInterval);
    }
    collideInterval = setInterval(checkCollision, 100);
    removeEventListener("scroll", checkCollision);
    addEventListener("scroll", checkCollision);
}

function GetShipLocation() {
    var rect = spaceship.getBoundingClientRect();
    // idk why but it's this
    return [rect.right - rect.height / 2, rect.y + rect.height / 2];
}

// function to check current hitbox based on color
// wait, it shouldn't be called 10-30 times a second, just onscroll and every 100 ms (synced with the thing)
function checkCollision() {
    // get the ship's current location
    // use that to check the color of the canvas at that spot
    // if there's a hit, reset everything
    var coords = GetShipLocation();
    if (pick(coords[0], coords[1])) {
        pick(coords[0], coords[1]);
        console.log("dumb!");
        spaceship.src = "/scrolling/failure.png";
        setTimeout(ResetGame, 1000);
    }
}

function FinishGame() {
    clearInterval(moveInterval);
    clearInterval(collideInterval);
    removeEventListener("scroll", checkCollision);
    // give the thing the class
    document.getElementById("secret").className = "done";
}