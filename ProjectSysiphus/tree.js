let canopyGreen = document.querySelector("#canopyGreen");
let canopyGold = document.querySelector("#canopyGold");
let highlightLeaf = document.querySelector("#highlightLeaf");
let newLeaf = document.querySelector("#newLeaf");
let snowLayer = document.querySelector("#snowLayer");
let snowGround = document.querySelector("#snowGround");

let seasonText = document.querySelector("#seasonText");
let progressText = document.querySelector("#progressText");
let nextLink = document.querySelector("#nextLink");

let snowTimer = null;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
    let percentage = (value - inMin) / (inMax - inMin);
    percentage = clamp(percentage, 0, 1);
    return outMin + percentage * (outMax - outMin);
}

function getScrollPercentage() {
    let scrollTop = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return scrollTop / maxScroll;
}

function createSnowflake() {
    let snowflake = document.createElement("div");
    snowflake.className = "snowflake";

    let size = Math.random() * 7 + 4;
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.top = "-20px";

    let duration = Math.random() * 4 + 5;
    snowflake.style.animationDuration = duration + "s";

    snowLayer.append(snowflake);

    setTimeout(function () {
        snowflake.remove();
    }, duration * 1000);
}

function startSnow() {
    if (snowTimer !== null) return;
    snowTimer = setInterval(createSnowflake, 180);
}

function stopSnow() {
    if (snowTimer === null) return;
    clearInterval(snowTimer);
    snowTimer = null;
}

function updateScene() {
    let p = getScrollPercentage();
    updateBackgroundTransition(p);
    progressText.innerText = "time: " + Math.floor(p * 100) + "%";

    if (p < 0.18) {
        stopSnow();

        seasonText.innerText = "summer: everything seems alive and overflowing.";
        canopyGreen.style.opacity = 1;
        canopyGold.style.opacity = 0;

        highlightLeaf.style.opacity = 1;
        highlightLeaf.style.left = "57%";
        highlightLeaf.style.top = "28%";
        highlightLeaf.style.transform = "rotate(-25deg)";

        newLeaf.style.opacity = 0;
        newLeaf.style.transform = "rotate(-25deg) scale(0.2)";
        snowGround.style.height = "0px";
        nextLink.classList.remove("show");
    }


  else if (p < 0.48) {
    stopSnow();

    let autumnProgress = mapRange(p, 0.25, 0.5, 0, 1);
    seasonText.innerText = "autumn: the tree changes color.";

    canopyGreen.style.opacity = 1 - autumnProgress * 0.75;
    canopyGold.style.opacity = Math.sin(autumnProgress * Math.PI);

    highlightLeaf.style.opacity = 1;
    highlightLeaf.style.left = "57%";
    highlightLeaf.style.top = "28%";
    highlightLeaf.style.transform = "rotate(-25deg)";

    newLeaf.style.opacity = 0;
    snowGround.style.height = "0px";
    nextLink.classList.remove("show");
  }


  else if (p < 0.75) {
    startSnow();

    let winterProgress = mapRange(p, 0.50, 0.78, 0, 1);
    seasonText.innerText = "winter: everything returns to quiet.";

    canopyGreen.style.opacity = 0.08;
    canopyGold.style.opacity = 0;

    let leafX = mapRange(winterProgress, 0, 1, 57, 63);
    let leafY = mapRange(winterProgress, 0, 1, 28, 82);
    let leafRotate = mapRange(winterProgress, 0, 1, -25, 110);

    highlightLeaf.style.opacity = 1;
    highlightLeaf.style.left = leafX + "%";
    highlightLeaf.style.top = leafY + "%";
    highlightLeaf.style.transform = "rotate(" + leafRotate + "deg)";

    let snowHeight = mapRange(winterProgress, 0, 1, 0, 130);
    snowGround.style.height = snowHeight + "px";

    newLeaf.style.opacity = 0;
    nextLink.classList.remove("show");
  }


  else {
    stopSnow();

    let springProgress = mapRange(p, 0.78, 1, 0, 1);
    seasonText.innerText = "spring: the tree begins again.";

    canopyGreen.style.opacity = mapRange(springProgress, 0, 1, 0.08, 1);
    canopyGold.style.opacity = 0;

    highlightLeaf.style.opacity = 0;

    let snowHeight = mapRange(springProgress, 0, 1, 130, 0);
    snowGround.style.height = snowHeight + "px";

    if (springProgress > 0.65) {
      newLeaf.style.opacity = 1;
      newLeaf.style.transform = "rotate(-25deg) scale(1)";
    } else {
      newLeaf.style.opacity = 0;
      newLeaf.style.transform = "rotate(-25deg) scale(0.2)";
    }

    if (springProgress > 0.88) {
      seasonText.innerText = "spring: my old friend is back";
      nextLink.classList.add("show");
    } else {
      nextLink.classList.remove("show");
    }
  }
}
let bg1 = document.querySelector("#bg1");
let bg2 = document.querySelector("#bg2");

function updateBackgroundTransition(progress) {

  let t = mapRange(progress, 0.75, 1.00, 0, 1);

  bg1.style.opacity = 1 - t;
  bg2.style.opacity = t;
}

window.addEventListener("scroll", updateScene);
updateScene();