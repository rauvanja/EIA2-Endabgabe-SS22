/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/

namespace farm {

    let lastClickedImage: HTMLImageElement = <HTMLImageElement>document.getElementById("salad1");

    // Variablen für Formelement
    let priceVariation: number;
    let capital: number = 0;

    // Array's
    let seedlings: Product[] = [];
    let cropProducts: Product[] = [];
    let plants: Plant[] = [];
    let fields: Field[] = [];

    window.addEventListener("load", hndLoad);
    function hndLoad(): void {
        console.log("Start");
        let start: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        start.addEventListener("click", hideScreen1);
    }

    // Blende screen 1 aus und screen 2 ein
    function hideScreen1(): void {

        readData(); // Liest Formelement aus

        // 
        let dung: Product = new Product("Dung", "standard", 1, priceVariation + 1); // 3 + 1 weil math.floor (rundet den wert ab), deshalb immer 1 + 
        let pesticide: Product = new Product("Pesticide", "standard", 1, priceVariation + 1);

        // Brauchen wir!! Aber wieso genau??
        // Salad ist element 0 im Array
        seedlings.push(new Product("Salad", "seedling", 1, priceVariation + 1)); // nur eine range für die Preisschwankung, 1-5 fehlt noch
        cropProducts.push(new Product("Salad", "cropProduct", 1 * 3, priceVariation * 2 + 1)); // range der Preisschwankung nochmal überlegen
        plants.push(new Salad());
        // Potato ist element 1 im Array
        seedlings.push(new Product("Potato", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new Product("Potato", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new Potato());
        // Carrot ist element 2 im Array
        seedlings.push(new Product("Carrot", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new Product("Carrot", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new Carrot());
        // Eggplant ist element 3 im Array
        seedlings.push(new Product("Eggplant", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new Product("Eggplant", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new Eggplant());
        // Eggplant ist element 4 im Array
        seedlings.push(new Product("Garlic", "seedling", 1, priceVariation + 1)); // 
        cropProducts.push(new Product("Garlic", "cropProduct", 1 * 3, priceVariation * 2 + 1));
        plants.push(new Garlic());


        // EVENTLISTENER Plants, Dung & Pesticide in Marketplace
        let saladItem: HTMLImageElement = <HTMLImageElement>document.getElementById("salad");
        let carrotItem: HTMLImageElement = <HTMLImageElement>document.getElementById("carrot");
        let potatoItem: HTMLImageElement = <HTMLImageElement>document.getElementById("potato");
        let eggplantItem: HTMLImageElement = <HTMLImageElement>document.getElementById("eggplant");
        let garlicItem: HTMLImageElement = <HTMLImageElement>document.getElementById("garlic");
        let dungItem: HTMLImageElement = <HTMLImageElement>document.getElementById("dung");
        let pesticideItem: HTMLImageElement = <HTMLImageElement>document.getElementById("pesticide");

        // EVENTLISTENER Plants, Dung & Pesticide in Your Storage
        let salad1: HTMLImageElement = <HTMLImageElement>document.getElementById("salad1");
        let potato1: HTMLImageElement = <HTMLImageElement>document.getElementById("potato1");
        let carrot1: HTMLImageElement = <HTMLImageElement>document.getElementById("carrot1");
        let eggplant1: HTMLImageElement = <HTMLImageElement>document.getElementById("eggplant1");
        let garlic1: HTMLImageElement = <HTMLImageElement>document.getElementById("garlic1");
        let dung1: HTMLImageElement = <HTMLImageElement>document.getElementById("dung1");
        let pesticide1: HTMLImageElement = <HTMLImageElement>document.getElementById("pesticide1");
        let water1: HTMLImageElement = <HTMLImageElement>document.getElementById("water1");    // water is endless

        // OnClick Aufruf Funktionen buy Plants, Dung & Pesticide in Marketplace
        saladItem.addEventListener("click", buySalad);
        potatoItem.addEventListener("click", buyPotato);
        carrotItem.addEventListener("click", buyCarrot);
        eggplantItem.addEventListener("click", buyEggplant);
        garlicItem.addEventListener("click", buyGarlic);
        dungItem.addEventListener("click", buyDung);
        pesticideItem.addEventListener("click", buyPesticide);

        // Aufruf Funktionen Plants, Dung, Pesticide & Water in Your Storage
        salad1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "salad";
            }
            console.log("click salad in storage");
        });
        potato1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "potato";
            }
            console.log("click salad in storage");
        });
        carrot1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "carrot";
            }
            console.log("click carrot in storage");
        });
        eggplant1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "eggplant"
            }
            console.log("click eggplant in storage");
        });
        garlic1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (seedlings[0].amount > 0) {
                document.body.className = "garlic";
            }
            console.log("click garlic in storage");
        });
        dung1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (dung.amount > 0) {
                document.body.className = "dung";
            }
            console.log("click dung in storage");
        });
        pesticide1.addEventListener("click", function (): void {
            lastClickedImage = this;
            if (pesticide.amount > 0) {
                document.body.className = "pesticide";
            }
            console.log("click pesticide in storage");
        });
        water1.addEventListener("click", function (): void {
            lastClickedImage = this;
            document.body.className = "water";
            console.log("click water in storage");
        });


        let screen1: HTMLDivElement = <HTMLDivElement>document.getElementById("Screen1");
        let screen2: HTMLDivElement = <HTMLDivElement>document.getElementById("Screen2");
        screen1.style.display = "none";
        screen2.style.display = "unset";

        let market: Market = new Market(capital, seedlings, cropProducts, dung, pesticide);
        createFields(market, plants);

        // buy seedlings - salad 
        function buySalad(): void {
            let saladcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("saladCounter");
            market.buyProduct(seedlings[0]); //aus dem Array
            let counterSalad: number = seedlings[0].amount;
            saladcounter.innerHTML = counterSalad.toString();
            // console.log("saladCounter");
        }

        // buy seedlings - potato
        function buyPotato(): void {
            let potatocounter: HTMLDivElement = <HTMLDivElement>document.getElementById("potatoCounter");
            market.buyProduct(seedlings[1]); //aus dem Array
            let counterPotato: number = seedlings[1].amount; // ??
            potatocounter.innerHTML = counterPotato.toString();
            // console.log("potatoCounter");
        }

        // buy seedlings - carrot
        function buyCarrot(): void {
            let carrotcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("carrotCounter");
            market.buyProduct(seedlings[2]);
            let counterCarrot: number = seedlings[2].amount;
            carrotcounter.innerHTML = counterCarrot.toString();
            // console.log("carrotCounter");
        }

        // buy seedlings - eggplant
        function buyEggplant(): void {
            let eggplantcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("eggplantCounter");
            market.buyProduct(seedlings[3]);
            let counterEggplant: number = seedlings[3].amount;
            eggplantcounter.innerHTML = counterEggplant.toString();
            // console.log("eggplantCounter");

        }

        // buy seedlings - garlic
        function buyGarlic(): void {
            let garliccounter: HTMLDivElement = <HTMLDivElement>document.getElementById("garlicCounter");
            market.buyProduct(seedlings[4]);
            let counterGarlic: number = seedlings[4].amount;
            garliccounter.innerHTML = counterGarlic.toString();
            // console.log("eggplantCounter");
        }

        // buy dung 
        function buyDung(): void {
            let dungcounter: HTMLDivElement = <HTMLDivElement>document.getElementById("dungCounter");
            market.buyProduct(dung);
            let counterDung: number = dung.amount;
            dungcounter.innerHTML = counterDung.toString();
            // console.log("dungCounter");
        }

        // buy pesticide
        function buyPesticide(): void {
            let pesticidecounter: HTMLDivElement = <HTMLDivElement>document.getElementById("pesticideCounter");
            market.buyProduct(pesticide);
            let counterPesticide: number = pesticide.amount;
            pesticidecounter.innerHTML = counterPesticide.toString();
            // console.log("pesticideCounter");
        }
    }

    // Felder werden erstellt
    function createFields(market: Market, plants: Plant[]): void {

        // Variable für Vergabe ID Felder
        let rowCounter: number = 0;

        // iterate through rows
        for (let index: number = 0; index < 7; index++) {
            document.querySelector("row" + index);
            let rows: HTMLDivElement = <HTMLDivElement>document.getElementById("row" + index); // Reihen aus HTML selektieren

            // 9 Felder pro Reihe werden erstellt
            for (let index: number = 0; index < 9; index++) {
                let fieldDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // werden neue div's erstellt
                let gameField: Field = new Field(market, plants); // Instanz der Klasse Field wird erstellt
                fields.push(gameField);
                fieldDiv.classList.add("field"); // class="field" wird zugewiesen
                fieldDiv.id = (rowCounter + index).toString(); //jedes Feld bekommt eine Nummer sprich ID
                // console.log(field.id, index);
                rows.appendChild(fieldDiv); // row's bekommt das Kind field und wird zum parent
                fieldDiv.addEventListener("click", function (): void { gameField.onClick(fieldDiv, lastClickedImage); }); // Felder bekommen einen Click Listener --> Image wird in Div Field eingesetzt in der onKlick Funktion

                // let state: HTMLDivElement = <HTMLDivElement>document.createElement("div"); // werden neue div's erstellt
                // state.classList.add("pbar"); // class="pbar" wird zugewiesen
                // fieldDiv.appendChild(state); // fieldDiv bekommt das Kind state und wird zum parent

            }
            rowCounter += 9; // das die id's weiterzählen und nicht 0-8 fortlaufend für jede Reihe sonder von 0-62, ingesamt 63 Felder
        }

        setInterval(randomPest, 60000); //
    }

    // liest Formelement aus
    function readData(): void {
        let formdata: FormData = new FormData(document.forms[0]); //Instanz wird erstellt

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
        let capitalDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("capital");
        capitalDiv.innerHTML = "TOTAL CAPITAL:   " + capital.toString() + "€";
    }

    function randomPest(): void {
        console.log("randomPest", fields[0]);

        for (let i = 0; i < 15; i++) { // Anzahl der befallenen Felder
            let randomNumber: number = Math.floor(Math.random() * (100 - 1) + 1); // wenn eine zahl eines Feldes überein stimmt, dann wird es befallen
            console.log(randomNumber);
            if (fields[randomNumber]) {
                fields[randomNumber].createPest();
            }
        }

    }

}