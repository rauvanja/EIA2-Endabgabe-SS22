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
        createFields();
    }
    // create fields
    function createFields() {
        //iterate through rows
        for (let index = 0; index < 7; index++) {
            document.querySelector("row" + index);
            let rows = document.getElementById("row" + index);
            //create 7 fields in a row 
            for (let index = 0; index < 9; index++) {
                let field = document.createElement("div");
                field.classList.add("field");
                rows.appendChild(field);
                let stateAd = document.createElement("div");
                stateAd.classList.add("state");
                field.appendChild(stateAd);
            }
        }
    }
})(farm || (farm = {}));
//# sourceMappingURL=main.js.map