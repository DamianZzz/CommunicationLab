let field = document.querySelector("#microbeField");
let counter = document.querySelector("#counter");
let instruction = document.querySelector("#instruc");
let nextLink = document.querySelector("#nextLink");

let population = 0;
let maxPopulation = 40;

let colorClasses = ["green", "darkGreen", "lightGreen"];

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColorClass() {
  let index = Math.floor(Math.random() * colorClasses.length);
  return colorClasses[index];
}

function updateCounter() {
  counter.innerText = "population: " + population;
}

function randomPointInsideCircle() { 
    // inside the circle
  let width = field.offsetWidth;
  let height = field.offsetHeight;

  let centerX = width / 2;
  let centerY = height / 2;
  let radius = width * 0.42;

  let angle = Math.random() * Math.PI * 2;
  let distance = Math.sqrt(Math.random()) * radius;

  let x = centerX + Math.cos(angle) * distance;
  let y = centerY + Math.sin(angle) * distance;

  return { x: x, y: y };
}

function moveCell(cell) {
  let point = randomPointInsideCircle();

  cell.style.left = point.x + "px";
  cell.style.top = point.y + "px";

  let angle = Math.random() * 180 - 90;
  cell.style.transform = "rotate(" + angle + "deg)";
}

function createCell(x, y) {
  if (population >= maxPopulation) {
    revealEnding();
    return;
  }

  let cell = document.createElement("div");
  cell.className = "microbe " + randomColorClass();

  let size = randomNumber(8, 18);
  cell.style.width = size + "px";
  cell.style.height = size * randomNumber(0.7, 1.1) + "px";

  cell.style.left = x + "px";
  cell.style.top = y + "px";

  cell.addEventListener("mouseover", function() {
    splitCell(cell);
  });

  field.append(cell);

  population = population + 1;
  updateCounter();

  setInterval(function() {
    if (document.body.contains(cell)) {
      moveCell(cell);
    }
  }, 1200 + Math.random() * 900);

  return cell;
}

function splitCell(parentCell) {
  if (population >= maxPopulation) {
    revealEnding();
    return;
  }

  if (!document.body.contains(parentCell)) {
    return;
  }

  if (parentCell.classList.contains("touched")) {
    moveCell(parentCell);
    return;
  }

  parentCell.classList.add("touched");

  let parentX = parentCell.offsetLeft;
  let parentY = parentCell.offsetTop;

  let child = createCell(
    parentX + randomNumber(-25, 25),
    parentY + randomNumber(-25, 25)
  );

  moveCell(parentCell);

  if (child) {
    setTimeout(function() {
      moveCell(child);
    }, 120);
  }

  if (population >= maxPopulation) {
    revealEnding();
  }
}

function revealEnding() {
  instruction.innerText = "there is no answer here. maybe we need to look from farther away.";
  nextLink.classList.add("show");
}

function startScene() {
  for (let i = 0; i < 7; i++) {
    let point = randomPointInsideCircle();
    let cell = createCell(point.x, point.y);
    moveCell(cell);
  }
}

startScene();