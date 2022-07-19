"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Eggplant extends farm.Plant {
        constructor() {
            super("Eggplant", 240, 4, 2, "<img src=Emojis/Eggplant.png class=fieldImage>");
        }
    }
    farm.Eggplant = Eggplant;
})(farm || (farm = {}));
//# sourceMappingURL=Eggplant.js.map