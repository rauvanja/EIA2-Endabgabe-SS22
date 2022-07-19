"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    let lastClickedImage = document.getElementById("salad1");
    // Variablen für Formelement
    let priceVariation;
    let capital = 0;
    // Array's
    let seedlings = [];
    let cropProducts = [];
    let plants = [];
    let fields = [];
    window.addEventListener("load", hndLoad);
    function hndLoad() {
        console.log("Start");
        let start = document.getElementById("start");
        start.addEventListener("click", hideScreen1);
    }
    // Blende screen 1 aus und screen 2 ein
    function hideScreen1() {
        readData(); // Liest Formelement aus
        // 
        let dung = new farm.Product("Dung", "standard", 1, priceVariation + 1); // 3 + 1 weil math.floor (rundet den wert ab), deshalb immer 1 + 
        let pesticide = new farm.Product("Pesticide", "standard", 1, priceVariation + 1);
        // Brauchen wir!! Aber wieso genau??
        // Salad ist element 0 im Array
        seedlings.push(new farm.Product("Salad", "seedling", 1, priceVariation + 1)); // nur eine range für die Preisschwankung, 1-5 fehlt noch
        cropProducts.push(new farm.Product("Salad", "cropProduct", 1 * 3, priceVariation * 2 + 1)); // range der Preisschwankung nochmal überlegen
        plants.push(new farm.Salad());
        // Potato ist element 1 im Array
        seedlings.push(new farm.Product("Potato", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new farm.Product("Potato", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new farm.Potato());
        // Carrot ist element 2 im Array
        seedlings.push(new farm.Product("Carrot", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new farm.Product("Carrot", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new farm.Carrot());
        // Eggplant ist element 3 im Array
        seedlings.push(new farm.Product("Eggplant", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new farm.Product("Eggplant", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new farm.Eggplant());
        // Eggplant ist element 4 im Array
        seedlings.push(new farm.Product("Garlic", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new farm.Product("Garlic", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new farm.Garlic());
        // EVENTLISTENER Plants, Dung & Pesticide in Marketplace
        let saladItem = document.getElementById("salad");
        let carrotItem = document.getElementById("carrot");
        let potatoItem = document.getElementById("potato");
        let eggplantItem = document.getElementById("eggplant");
        let garlicItem = document.getElementById("garlic");
        let dungItem = document.getElementById("dung");
        let pesticideItem = document.getElementById("pesticide");
        // EVENTLISTENER Plants, Dung & Pesticide in Your Storage
        let salad1 = document.getElementById("salad1");
        let potato1 = document.getElementById("potato1");
        let carrot1 = document.getElementById("carrot1");
        let eggplant1 = document.getElementById("eggplant1");
        let garlic1 = document.getElementById("garlic1");
        let dung1 = document.getElementById("dung1");
        let pesticide1 = document.getElementById("pesticide1");
        let water1 = document.getElementById("water1"); // water is endless
        // OnClick Aufruf Funktionen buy Plants, Dung & Pesticide in Marketplace
        saladItem.addEventListener("click", buySalad);
        potatoItem.addEventListener("click", buyPotato);
        carrotItem.addEventListener("click", buyCarrot);
        eggplantItem.addEventListener("click", buyEggplant);
        garlicItem.addEventListener("click", buyGarlic);
        dungItem.addEventListener("click", buyDung);
        pesticideItem.addEventListener("click", buyPesticide);
        // Aufruf Funktionen Plants, Dung, Pesticide & Water in Your Storage
        salad1.addEventListener("click", function () {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "salad";
            }
            console.log("click salad in storage");
        });
        potato1.addEventListener("click", function () {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "potato";
            }
            console.log("click salad in storage");
        });
        carrot1.addEventListener("click", function () {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "carrot";
            }
            console.log("click carrot in storage");
        });
        eggplant1.addEventListener("click", function () {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "eggplant";
            }
            console.log("click eggplant in storage");
        });
        garlic1.addEventListener("click", function () {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "garlic";
            }
            console.log("click garlic in storage");
        });
        dung1.addEventListener("click", function () {
            lastClickedImage = this;
            if (dung.amount > 0) {
                document.body.className = "dung";
            }
            console.log("click dung in storage");
        });
        pesticide1.addEventListener("click", function () {
            lastClickedImage = this;
            if (pesticide.amount > 0) {
                document.body.className = "pesticide";
            }
            console.log("click pesticide in storage");
        });
        water1.addEventListener("click", function () {
            lastClickedImage = this;
            document.body.className = "water";
            console.log("click water in storage");
        });
        let screen1 = document.getElementById("Screen1");
        let screen2 = document.getElementById("Screen2");
        screen1.style.display = "none";
        screen2.style.display = "unset";
        let market = new farm.Market(capital, seedlings, cropProducts, dung, pesticide);
        createFields(market, plants);
        // buy seedlings - salad 
        function buySalad() {
            let saladcounter = document.getElementById("saladCounter");
            market.buyProduct(seedlings[0]); //aus dem Array
            let counterSalad = seedlings[0].amount;
            saladcounter.innerHTML = counterSalad.toString();
            // console.log("saladCounter");
        }
        // buy seedlings - potato
        function buyPotato() {
            let potatocounter = document.getElementById("potatoCounter");
            market.buyProduct(seedlings[1]); //aus dem Array
            let counterPotato = seedlings[1].amount; // ??
            potatocounter.innerHTML = counterPotato.toString();
            // console.log("potatoCounter");
        }
        // buy seedlings - carrot
        function buyCarrot() {
            let carrotcounter = document.getElementById("carrotCounter");
            market.buyProduct(seedlings[2]);
            let counterCarrot = seedlings[2].amount;
            carrotcounter.innerHTML = counterCarrot.toString();
            // console.log("carrotCounter");
        }
        // buy seedlings - eggplant
        function buyEggplant() {
            let eggplantcounter = document.getElementById("eggplantCounter");
            market.buyProduct(seedlings[3]);
            let counterEggplant = seedlings[3].amount;
            eggplantcounter.innerHTML = counterEggplant.toString();
            // console.log("eggplantCounter");
        }
        // buy seedlings - garlic
        function buyGarlic() {
            let garliccounter = document.getElementById("garlicCounter");
            market.buyProduct(seedlings[4]);
            let counterGarlic = seedlings[4].amount;
            garliccounter.innerHTML = counterGarlic.toString();
            // console.log("eggplantCounter");
        }
        // buy dung 
        function buyDung() {
            let dungcounter = document.getElementById("dungCounter");
            market.buyProduct(dung);
            let counterDung = dung.amount;
            dungcounter.innerHTML = counterDung.toString();
            // console.log("dungCounter");
        }
        // buy pesticide
        function buyPesticide() {
            let pesticidecounter = document.getElementById("pesticideCounter");
            market.buyProduct(pesticide);
            let counterPesticide = pesticide.amount;
            pesticidecounter.innerHTML = counterPesticide.toString();
            // console.log("pesticideCounter");
        }
    }
    // Felder werden erstellt
    function createFields(market, plants) {
        // Variable für Vergabe ID Felder
        let rowCounter = 0;
        // iterate through rows
        for (let index = 0; index < 7; index++) {
            document.querySelector("row" + index);
            let rows = document.getElementById("row" + index); // Reihen aus HTML selektieren
            // 9 Felder pro Reihe werden erstellt
            for (let index = 0; index < 9; index++) {
                let fieldDiv = document.createElement("div"); // werden neue div's erstellt
                let gameField = new farm.Field(market, plants); // Instanz der Klasse Field wird erstellt
                fields.push(gameField);
                fieldDiv.classList.add("field"); // class="field" wird zugewiesen
                fieldDiv.id = (rowCounter + index).toString(); //jedes Feld bekommt eine Nummer sprich ID
                // console.log(field.id, index);
                rows.appendChild(fieldDiv); // row's bekommt das Kind field und wird zum parent
                fieldDiv.addEventListener("click", function () { gameField.onClick(fieldDiv, lastClickedImage); }); // Felder bekommen einen Click Listener --> Image wird in Div Field eingesetzt in der onKlick Funktion
                // let state: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // werden neue div's erstellt
                // state.classList.add("pbar"); // class="pbar" wird zugewiesen
                // fieldDiv.appendChild(state); // fieldDiv bekommt das Kind state und wird zum parent
            }
            rowCounter += 9; // das die id's weiterzählen und nicht 0-8 fortlaufend für jede Reihe sonder von 0-62, ingesamt 63 Felder
        }
        setInterval(randomPest, 60000); //
    }
    // liest Formelement aus
    function readData() {
        let formdata = new FormData(document.forms[0]); //Instanz wird erstellt
        for (let entry of formdata.entries()) {
            switch (entry[0]) {
                case "Price":
                    priceVariation = Number(entry[1]);
                    console.log(priceVariation); // 
                    break;
                case "Startcapital":
                    capital = Number(entry[1]); // entry 0 = name, entry 1 = value
                    console.log(capital);
            }
        }
        // zeigt entry (value capital) im Storage div capital
        let capitalDiv = document.getElementById("capital");
        capitalDiv.innerHTML = "TOTAL CAPITAL:   " + capital.toString() + "€";
    }
    function randomPest() {
        console.log("randomPest", fields[0]);
        for (let i = 0; i < 15; i++) { // Anzahl der befallenen Felder
            let randomNumber = Math.floor(Math.random() * (100 - 1) + 1); // wenn eine zahl eines Feldes überein stimmt, dann wird es befallen
            console.log(randomNumber);
            if (fields[randomNumber]) {
                fields[randomNumber].createPest();
            }
        }
    }
})(farm || (farm = {}));
//# sourceMappingURL=main.js.map