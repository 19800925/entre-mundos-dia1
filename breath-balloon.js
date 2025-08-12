
let breathingInterval;
let breathText = document.getElementById("breath-text");
let balloon = document.getElementById("balloon");

function startBreathing() {
    let phases = [
        { text: "Inspira...", scale: 1.4 },
        { text: "Sustém...", scale: 1.4 },
        { text: "Expira...", scale: 1 },
        { text: "Pausa...", scale: 1 }
    ];
    let i = 0;
    breathText.textContent = "Preparar...";
    clearInterval(breathingInterval);
    setTimeout(() => {
        breathingInterval = setInterval(() => {
            let phase = phases[i];
            breathText.textContent = phase.text;
            balloon.style.transform = "scale(" + phase.scale + ")";
            i = (i + 1) % phases.length;
        }, 4000);
    }, 1000);
}

function stopBreathing() {
    clearInterval(breathingInterval);
    breathText.textContent = "Preparar...";
    balloon.style.transform = "scale(1)";
}
