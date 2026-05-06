let blanks = document.querySelectorAll(".codeBlank");
let statusText = document.querySelector("#statusText");
let popupLayer = document.querySelector("#popupLayer");
let finalLink = document.querySelector("#finalLink");

let leavesReleased = false;
let leavesLeft = 0;


blanks.forEach(function(input) {
    input.addEventListener("input", checkProgress);
});

function checkProgress() {
    let done = 0;

    blanks.forEach(function(input) {
        if (input.value.trim() !== "") {
        done = done + 1;
        input.classList.add("filled");
        } else {
        input.classList.remove("filled");
        }
    });

    statusText.innerText = "tasks: " + done + " / " + blanks.length;

    if (done === blanks.length && leavesReleased === false) {
        releaseLeaves();
    }
}

function releaseLeaves() {
    leavesReleased = true;
    statusText.innerText = "saved: loop complete";

    for (let i = 0; i < 14; i++) {
        createLeafPopup();
    }
}

function createLeafPopup() {

    let popup = document.createElement("img");
    popup.className = "leafPopup";
    popup.src = "images/leaf.png";

    let x = Math.random() * (window.innerWidth - 120) + 20;
    let y = Math.random() * (window.innerHeight - 120) + 40;
    let rotate = Math.random() * 80 - 40;
    let scale = Math.random() * 0.5 + 0.7;

    popup.style.left = x + "px";
    popup.style.top = y + "px";
    popup.style.setProperty("--r", rotate + "deg");
    popup.style.setProperty("--s", scale);

    popup.onclick = function() {
        popup.remove();
        leavesLeft = leavesLeft - 1;

        if (leavesLeft === 0) {
            finalLink.classList.add("show");
            statusText.innerText = "ready: return to the myth";
        }
    };

    popupLayer.append(popup);
    leavesLeft = leavesLeft + 1;
}