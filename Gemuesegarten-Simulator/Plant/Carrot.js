"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Carrot extends farm.Plant {
        constructor() {
            super("Carrot", 180, 3, 2, "<img src=Emojis/Carrot.png class=fieldImage>");
        }
    }
    farm.Carrot = Carrot;
})(farm || (farm = {}));
//# sourceMappingURL=Carrot.js.map