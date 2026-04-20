const SECOND_TOTAL = 60;
const MINUTE_TOTAL = 60;
const HOUR_TOTAL = 12;

const SECOND_TEXT = ".";
const MINUTE_TEXT = "*";
const HOUR_TEXT = "|";

const SECOND_RADIUS = 350;
const MINUTE_RADIUS = 260;
const HOUR_RADIUS = 160;

function createRing(containerId, total, text, radius, className) {
    const ring = document.getElementById(containerId);

    for (let i = 0; i < total; i++) {
        const unit = document.createElement("span");
        unit.className = className;
        unit.innerText = text;

        const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        unit.style.left = `calc(50% + ${x}px)`;
        unit.style.top = `calc(50% + ${y}px)`;

        ring.appendChild(unit);
    }
}

function updateSecondRing(second) {
    const units = document.querySelectorAll(".secondUnit");

    units.forEach(function(unit, index) {
        unit.classList.remove("active", "trail1", "trail2", "trail3");

        const directDiff = Math.abs(index - second);
        const circularDiff = Math.min(directDiff, SECOND_TOTAL - directDiff);

        if (circularDiff === 0) {
            unit.classList.add("active");
        } else if (circularDiff === 1) {
            unit.classList.add("trail1");
        } else if (circularDiff === 2) {
            unit.classList.add("trail2");
        } else if (circularDiff === 3) {
            unit.classList.add("trail3");
        }
    });
}

function updateMinuteRing(minute) {
    const units = document.querySelectorAll(".minuteUnit");

    units.forEach(function(unit, index) {
        unit.classList.remove("past", "current", "future");

        if (index < minute) {
            unit.classList.add("past");
        } else if (index === minute) {
            unit.classList.add("current");
        } else {
            unit.classList.add("future");
        }
    });
}

function updateHourRing(hour) {
    const units = document.querySelectorAll(".hourUnit");

    let hour12 = hour % 12;
    const currentIndex = hour12 % 12;

    units.forEach(function(unit, index) {
        unit.classList.remove("active-hour");

        const rotateDeg = unit.dataset.rotateDeg;

        if (index === currentIndex) {
            unit.classList.add("active-hour");
            unit.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg) scale(1.25)`;
        } else {
            unit.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;
        }
    });
}

function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    updateSecondRing(second);
    updateMinuteRing(minute);
    updateHourRing(hour);
}

createRing("secondRing", SECOND_TOTAL, SECOND_TEXT, SECOND_RADIUS, "secondUnit");
createRing("minuteRing", MINUTE_TOTAL, MINUTE_TEXT, MINUTE_RADIUS, "minuteUnit");
createHourRing();

function createHourRing() {
    const ring = document.getElementById("hourRing");

    for (let i = 0; i < HOUR_TOTAL; i++) {
        const unit = document.createElement("span");
        unit.className = "hourUnit";
        unit.innerText = HOUR_TEXT;

        const angleRad = (i / HOUR_TOTAL) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angleRad) * HOUR_RADIUS;
        const y = Math.sin(angleRad) * HOUR_RADIUS;

        const rotateDeg = i * 30;

        unit.style.left = `calc(50% + ${x}px)`;
        unit.style.top = `calc(50% + ${y}px)`;
        unit.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;

        unit.dataset.rotateDeg = rotateDeg;

        ring.appendChild(unit);
    }
}

updateClock();
setInterval(updateClock, 1000);