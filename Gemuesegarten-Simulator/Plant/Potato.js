"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Potato extends farm.Plant {
        constructor() {
            super("Potato", 120, 2, 1, "<img src=Emojis/Potato.png class=fieldImage>");
        }
    }
    farm.Potato = Potato;
})(farm || (farm = {}));
//# sourceMappingURL=Potato.js.map