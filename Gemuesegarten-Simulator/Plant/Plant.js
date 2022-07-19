"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Plant {
        constructor(name, _growthTime, _waterNeed, _dungNeed, _image) {
            this.waterNeedTime = 60;
            this.dungNeedTime = 70;
            this.name = name;
            this.growthTime = _growthTime;
            this.waterNeed = _waterNeed;
            this.waterNeedTime = 60;
            this.dungNeed = _dungNeed;
            this.dungNeedTime = 70;
            this.image = _image;
        }
    }
    farm.Plant = Plant;
})(farm || (farm = {}));
//# sourceMappingURL=Plant.js.map