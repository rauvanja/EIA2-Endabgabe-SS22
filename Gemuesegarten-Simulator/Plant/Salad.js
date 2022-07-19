"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Salad extends farm.Plant {
        constructor() {
            super("Salad", 90, 1, 1, "<img src=Emojis/Salad.png class=fieldImage>");
        }
    }
    farm.Salad = Salad;
})(farm || (farm = {}));
//# sourceMappingURL=Salad.js.map