/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/

namespace farm {

    export class Field {

        element: HTMLDivElement;
        market: Market;
        plants: Plant[];  // ??
        plant: Plant | null;
        growthProzss: number = 0;
        growPercent: number = 0;
        pestAttack: boolean = false;
        pestTime: number = 0;
        waterStock: number = 0;
        waterNeed: number = 0;
        waterNeedTime: number = 0;
        dungStock: number = 0;
        dungNeed: number = 0;
        dungNeedTime: number = 0;
        maxCareTime: number = 120;
        currentCareTime: number = 0;
        intervall: number | undefined;


        constructor(_market?: Market, _plants?: Plant[]) { // ?? //?macht Übergabeparameter optional - Warum genau nötig?

            if (_market) {
                this.market = _market; // get info from the other class
            }
            if (_plants) {
                this.plants = _plants;
            }
        }

        // Image wird dem Feld hinzugefügt
        onClick(fieldDiv: HTMLElement, lastClickedImage: HTMLImageElement): void {
            console.log("onClick");
            this.element = <HTMLDivElement>fieldDiv;
            if (this.growPercent == 100) {
                this.cropPlant();
                return;
            }
            document.body.className = "";
            switch (lastClickedImage.id) {
                case "salad1":
                    if (this.plant == null) { // falls keine Pflanze auf dem Feld existiert dann
                        console.log(this.market.seedlings[0].amount);
                        if (this.market.seedlings[0].amount > 0) {  // falls Setzling im Storage -> pflanzen
                            this.plantPlant(this.plants[0]); // Pflanze pflanzen

                            fieldDiv.innerHTML = this.plants[0].image; // Pflanzenbild in fielddiv
                            let imageElement: HTMLImageElement = <HTMLImageElement>this.element.firstElementChild;
                            imageElement.style.transform = "scale(0.35)"; // Skaliere Salatbild - Startgröße

                            let saladcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("saladCounter");
                            let counterSalad: number = this.market.seedlings[0].amount;
                            saladcounter.innerHTML = counterSalad.toString(); // Update Salatcounter im Storage
                            console.log("plant Salad");

                        }
                    }
                    break;

                case "potato1":
                    if (this.plant == null) {
                        console.log(this.market.seedlings[1].amount);
                        if (this.market.seedlings[1].amount > 0) {
                            this.plantPlant(this.plants[1]);

                            fieldDiv.innerHTML = this.plants[1].image;
                            let imageElement: HTMLImageElement = <HTMLImageElement>this.element.firstElementChild;
                            imageElement.style.transform = "scale(0.35)";

                            let potatocounter: HTMLDivElement = <HTMLDivElement>document.getElementById("potatoCounter");
                            let counterPotato: number = this.market.seedlings[1].amount;
                            potatocounter.innerHTML = counterPotato.toString();
                            console.log("plant Potato");

                        }
                    }
                    break;

                case "carrot1":
                    if (this.plant == null) {
                        console.log(this.market.seedlings[2].amount);
                        if (this.market.seedlings[2].amount > 0) {
                            this.plantPlant(this.plants[2]);

                            fieldDiv.innerHTML = this.plants[2].image;
                            let imageElement: HTMLImageElement = <HTMLImageElement>this.element.firstElementChild;
                            imageElement.style.transform = "scale(0.35)";

                            let carrotcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("carrotCounter");
                            let counterCarrot: number = this.market.seedlings[2].amount;
                            carrotcounter.innerHTML = counterCarrot.toString();
                            console.log("plant Carrot");
                        }
                    }
                    break;

                case "eggplant1":
                    if (this.plant == null) {
                        console.log(this.market.seedlings[3].amount);
                        if (this.market.seedlings[3].amount > 0) {
                            this.plantPlant(this.plants[3]);

                            fieldDiv.innerHTML = this.plants[3].image;
                            let imageElement: HTMLImageElement = <HTMLImageElement>this.element.firstElementChild;
                            imageElement.style.transform = "scale(0.35)";

                            let eggplantcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("eggplantCounter");
                            let counterEggplant: number = this.market.seedlings[3].amount;
                            eggplantcounter.innerHTML = counterEggplant.toString();
                            console.log("plant Eggplant");
                        }
                    }
                    break;

                case "garlic1":
                    if (this.plant == null) {
                        console.log(this.market.seedlings[4].amount);
                        if (this.market.seedlings[4].amount > 0) {
                            this.plantPlant(this.plants[4]);

                            fieldDiv.innerHTML = this.plants[4].image;
                            let imageElement: HTMLImageElement = <HTMLImageElement>this.element.firstElementChild;
                            imageElement.style.transform = "scale(0.35)";

                            let garliccounter: HTMLDivElement = <HTMLDivElement>document.getElementById("garlicCounter");
                            let counterGarlic: number = this.market.seedlings[4].amount;
                            garliccounter.innerHTML = counterGarlic.toString();
                            console.log("plant Garlic");
                        }
                    }
                    break;

                case "dung1":
                    if (this.plant != null) {
                        if (this.market.dung.amount > 0) {
                            this.dungPlant();
                            let dungcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("dungCounter");
                            let counterDung: number = this.market.dung.amount;
                            dungcounter.innerHTML = counterDung.toString();
                            console.log("place dung");
                        }
                    }
                    break;

                case "pesticide1":
                    if (this.plant != null) {
                        if (this.market.pesticide.amount > 0) {
                            this.pestFight();
                            let pesticidecounter: HTMLDivElement = <HTMLDivElement>document.getElementById("pesticideCounter");
                            let counterPesticide: number = this.market.pesticide.amount;
                            pesticidecounter.innerHTML = counterPesticide.toString();
                            console.log("place pesticide");
                        }
                    }
                    break;

                case "water1":
                    console.log("choose water");
                    this.waterPlant();
                    break;

                default:
                    console.error("fuck");
                    break;
            }

        }

        grow(_tick: number, _field: Field): void {
            // console.log("grow", _field.plant);
            if (_field.plant == null) {
                return; // if no plant is planted end here
            }
            if (_field.currentCareTime >= _field.maxCareTime) {
                _field.resetField();
                return; // no caretaking -> plant dies -> field empty again
            }
            //if all condition are meeted, plant grows and the need for water and dung rises
            // console.log(_field.waterNeed, _field.waterStock, _field.dungNeed, _field.dungStock,_field.pestAttack);

            if (_field.waterNeed == _field.waterStock && _field.dungNeed == _field.dungStock && !_field.pestAttack) {
                if (_field.plant.growthTime > _field.growthProzss) { // if growthProzess is smaller tha growthTime ...
                    _field.growthProzss += _tick; // ... increase growthProzess by 10
                    _field.growPercent = Math.floor(_field.growthProzss / _field.plant.growthTime * 100);
                    console.log(_field.growPercent);
                    _field.waterNeedTime += _tick; // ... increase waterNeedTime by 10
                    _field.dungNeedTime += _tick; // ... increase dungNeedTime by 10
                    //Icon auftauchen lassen im Zusatzfeld!
                    if (_field.waterNeedTime >= _field.plant.waterNeedTime) { // if waterNeedTime is bigger than the waterNeedTime from this plant ...
                        _field.waterNeedTime = 0; // ... the plant doesn't need water anymore and the counter starts again
                        _field.waterNeed += _field.plant.waterNeed; // set waterNeed of plant to 0 again
                    }
                    //Icon auftauchen lassen im Zusatzfeld!
                    if (_field.dungNeedTime >= _field.plant.dungNeedTime) { // if dungNeedTime is bigger than the dungNeedTime from this plant ... 
                        _field.dungNeedTime = 0; // ... the plant doesn't need more dung and the counter starts again
                        _field.dungNeed += _field.plant.dungNeed; // set dungNeed of plant to 0 again
                    }
                    _field.refreshField();
                    //bild element des gemüses im feld wird je nach grow percent vergößert
                    let imageElement: HTMLImageElement = <HTMLImageElement>_field.element.firstElementChild;
                    imageElement.style.transform = "scale(" + (0.35 + _field.growPercent / 100) + ")"; //wird mit dem grow percent alle 10sek(tick) von 0-100% vergößert
                    // 0.35 -> min-Größe
                }
            } else {
                _field.currentCareTime += _tick; // else the timer for to care for the plant increases
            }
        }

        refreshField(): void {
            if (this.plant != null) {
                if (this.plant.growthTime == this.growthProzss) {
                    this.element.innerHTML = "<img src=Emojis/Crop.png class=fieldImage>";
                    let sound: HTMLAudioElement = new Audio("./Audio/Traktor.wav");
                    sound.play();
                } else if (this.pestAttack) {
                    this.element.innerHTML = "<img src=Emojis/Pest.png class=fieldImage>";
                    let sound: HTMLAudioElement = new Audio("./Audio/Pest.mpeg");
                    sound.play();
                } else if (this.waterNeed > this.waterStock) {
                    this.element.innerHTML = "<img src=Emojis/WaterNeed.png class=fieldImage>";
                } else if (this.dungNeed > this.dungStock) {
                    this.element.innerHTML = "<img src=Emojis/DungNeed.png class=fieldImage>";
                } else { // Bedarf von Pflanze gedeckt, dann wechselt das Bild und der Timer läuft weiter
                    this.element.innerHTML = this.plant.image;
                }
            }
        }

        plantPlant(_plant: Plant): void {
            this.plant = _plant; // get info from the other class
            console.log(this.plant);
            this.market.decreaseSeedling(_plant.name); // one less seedling in your storage
            this.intervall = setInterval(this.grow, 10000, 10, this); // calls grow every 10 seconds with parameter tick = 10
            // In der Funktion die von setIntervall aufgerufen wird, kann nich mit this auf die Instanz zugegriffen werden, deswegen muss die Instanz extra mit übergeben werden
        }

        // water is endless, so no decreasing
        waterPlant(): void {
            if (this.waterNeed >= this.waterStock) {
                this.waterStock += 1; // einmal bewässert
                this.refreshField();
            }
        }

        dungPlant(): void {
            if (this.dungNeed >= this.dungStock && this.market.dung.amount > 0) {
                this.market.decreaseDung(); // one less dung in own storage
                this.dungStock += 1; // einmal gedüngt
                this.refreshField();
            }
        }

        // nur der Preis soll auf das capital draufgerechnet werden, nicht die Pflanzen gesammelt
        cropPlant(): void {
            this.market.sellProduct(this.plant.name); //Pflanze wird verkauft und der aktuelle Verkaufspreis wird auf totalCapital gerechnet, price woher??
            this.resetField(); // empties the field
        }

        pestFight(): void {
            if (this.pestAttack && this.market.pesticide.amount > 0) {
                this.market.decreasePesticid(); // decrease one in market bc you needed one
                this.pestAttack = false; // pest is gone
                this.refreshField();
            }
        }

        createPest(): void {
            if (this.plant != null) { //wenn bepflanzt
                this.pestAttack = true;
                this.element.innerHTML = "<img src=Emojis/Pest.png class=fieldImage>";
            }
        }

        resetField(): void { // empties the field
            console.log("reset Field");
            this.element.innerHTML = "";
            this.plant = null;
            this.growthProzss = 0;
            this.growPercent = 0;
            this.pestAttack = false;
            this.pestTime = 0;
            this.waterStock = 0;
            this.waterNeed = 0;
            this.dungStock = 0;
            this.dungNeed = 0;
            this.maxCareTime = 60;
            this.currentCareTime = 0;
            clearInterval(this.intervall);
        }

    }
}