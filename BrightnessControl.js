var currentBrightness = 50; // Valor inicial

function setBrightness(value) {
    currentBrightness = Math.max(0, Math.min(100, value)); // limitar entre 0 y 100
    updateBar();
    try {
        var shell = new ActiveXObject("WScript.Shell");
        shell.Run('"' + System.Gadget.path + '\\SetBrightness.exe" ' + currentBrightness, 0, false);
        System.Gadget.Settings.writeString("lastBrightness", currentBrightness);
    } catch (e) {
        alert("Error cambiando el brillo: " + e.message);
    }
}

function increaseBrightness() {
    setBrightness(currentBrightness + 5);
}

function decreaseBrightness() {
    setBrightness(currentBrightness - 5);
}

function updateBar() {
    var bar = document.getElementById("barFill");
    bar.style.width = currentBrightness + "%";
}

function initBrightness() {
    try {
        var saved = System.Gadget.Settings.readString("lastBrightness");
        if (saved !== "") {
            currentBrightness = parseInt(saved, 10);
        }
    } catch (e) {
        currentBrightness = 50;
    }
    updateBar();
}
