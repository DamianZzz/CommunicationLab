let mainBtn = document.querySelector("#mainBtn");
let page = document.querySelector(".page");
let count = 0;

function clicker() {
    count = count + 1;

    if (count == 1) {
        mainBtn.innerText = "Why did you click?";
    }

    else if (count == 2) {
        for (let i = 0; i < 3; i++) {
            let newBtn = document.createElement("button");
            newBtn.innerText = "CLICK";
            newBtn.className = "btn";

            let x = Math.random() * 90;
            let y = Math.random() * 90;

            newBtn.style.left = x + "%";
            newBtn.style.top = y + "%";
            newBtn.style.transform = "translate(-50%, -50%)";

            newBtn.onclick = mainBtn.onclick;

            page.append(newBtn);
        }
    }

    else if (count == 3) {
        let allBtns = document.querySelectorAll(".btn");

        for (let i = 0; i < allBtns.length; i++) {
            let x = Math.random() * 90;
            let y = Math.random() * 90;

            allBtns[i].style.left = x + "%";
            allBtns[i].style.top = y + "%";
            allBtns[i].style.backgroundColor = "red";
            allBtns[i].style.color = "yellow";
        }

        document.body.style.backgroundColor = "black";
    }

    else if (count == 4) {
        for (let i = 0; i < 8; i++) {
            let word = document.createElement("div");
            word.innerText = "ERROR";
            word.className = "word";

            let x = Math.random() * 90;
            let y = Math.random() * 90;

            word.style.left = x + "%";
            word.style.top = y + "%";

            page.append(word);
        }
    }

    else {
        let allBtns = document.querySelectorAll(".btn");

        for (let i = 0; i < allBtns.length; i++) {
            let x = Math.random() * 100;
            let y = Math.random() * 100;

            allBtns[i].style.left = x + "%";
            allBtns[i].style.top = y + "%";
            allBtns[i].style.fontSize = Math.random() * 30 + 10 + "px";
        }

        for (let i = 0; i < 5; i++) {
            let word = document.createElement("div");
            word.innerText = "404";
            word.className = "word";

            let x = Math.random() * 100;
            let y = Math.random() * 100;

            word.style.left = x + "%";
            word.style.top = y + "%";

            page.append(word);
        }
    }
}