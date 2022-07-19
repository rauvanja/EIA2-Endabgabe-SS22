"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Garlic extends farm.Plant {
        constructor() {
            super("Garlic", 300, 5, 3, "<img src=Emojis/Garlic.png class=fieldImage>");
        }
    }
    farm.Garlic = Garlic;
})(farm || (farm = {}));
//# sourceMappingURL=Garlic.js.map