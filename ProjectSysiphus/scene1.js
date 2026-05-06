let farWorld = document.querySelector("#farWorld");
let trackWorld = document.querySelector("#trackWorld");

let stone = document.querySelector("#stone");
let counter = document.querySelector("#counter");
let instruction = document.querySelector("#instruc");
let nextLink = document.querySelector("#nextLink");

let dragging = false;
let lastX = 0;
let lastY = 0;

let distance = 0;
let stoneAngle = 0;
let wordCount = 0;

let endDistance = 4000;
let loopLength = 1400;



function moveWorld() {
  let progress = distance % loopLength;

  let trackX = -progress;
  let trackY = progress * 0.36;

  let farX = -progress * 0.18;

  trackWorld.style.transform =
    "translate(" + trackX + "px, " + trackY + "px)";

  farWorld.style.transform =
    "translate(" + farX + "px)";

  stoneAngle += 4;
  stone.style.transform = "rotate(" + stoneAngle + "deg)";

  counter.innerText = "distance " + Math.floor(distance);

  if (distance > endDistance) {
    nextLink.classList.add("show");
    instruction.innerText = "i kept pushing for an answer. i kept asking where the loop ends.";
  }
}

document.addEventListener("mousedown", function(event) {
  dragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
  document.body.classList.add("dragging");
});

document.addEventListener("mousemove", function(event) {
  if (dragging == false) {
    return;
  }

  let dx = event.clientX - lastX;
  let dy = event.clientY - lastY;

  let movement = dx - dy;

  if (movement < 0) {
    movement = movement * -0.25;
  }

  distance = distance + movement;

  if (distance < 0) {
    distance = 0;
  }

  moveWorld();

  // if (Math.floor(distance) % 260 < 14) {
  //   addFloatingWord();
  // }

  lastX = event.clientX;
  lastY = event.clientY;
});

document.addEventListener("mouseup", function() {
  dragging = false;
  document.body.classList.remove("dragging");
});

document.addEventListener("wheel", function(event) {
  distance = distance + event.deltaY * 0.5;

  if (distance < 0) {
    distance = 0;
  }

  moveWorld();

  if (Math.floor(distance) % 260 < 14) {
    addFloatingWord();
  }
});


// let words = ["push", "again", "almost there", "same slope", "same stone"];
// function addFloatingWord() {
//   let word = document.createElement("p");
//   word.className = "floatingWord";
//   word.innerText = words[wordCount % words.length];

//   word.style.left = Math.random() * 3200 + "px";
//   word.style.top = Math.random() * 500 + "px";

//   trackWorld.append(word);

//   wordCount = wordCount + 1;
// }




let bgm = document.querySelector("#bgm");
let musicBtn = document.querySelector("#musicBtn");

let playing = false;

musicBtn.onclick = function () {
  if (playing == false) {
    bgm.volume = 0.3;
    bgm.play();
    musicBtn.classList.add("playing");
    musicBtn.innerText = "♫";
    playing = true;
  } else {
    bgm.pause();
    musicBtn.classList.remove("playing");
    musicBtn.innerText = "♫";
    playing = false;
  }
};

moveWorld();