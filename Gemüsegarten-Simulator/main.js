"use strict";
var farm;
(function (farm) {
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        let start = document.getElementById("start");
        start.addEventListener("click", hideScreen1);
    }
    // Screen 1 verschwindet und wechselt zu Screen 2
    function hideScreen1() {
        let screen1 = document.getElementById("Screen1");
        let screen2 = document.getElementById("Screen2");
        screen1.style.display = "none";
        screen2.style.display = "unset";
    }
})(farm || (farm = {}));
//# sourceMappingURL=main.js.map