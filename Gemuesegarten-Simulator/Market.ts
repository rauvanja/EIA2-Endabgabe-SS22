/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/

namespace farm {

    export class Market {

        totalCapital: number;
        seedlings: Product[]; // Array - Setzlinge
        cropProducts: Product[]; // Array - fertige Produkte 
        dung: Product;
        pesticide: Product;


        constructor(_totalCapital: number, _seeldings: Product[], _cropProducts: Product[], _dung: Product, _pesticide: Product) {

            this.totalCapital = _totalCapital;
            this.seedlings = _seeldings;
            this.cropProducts = _cropProducts;
            this.dung = _dung;
            this.pesticide = _pesticide;
            this.changePrices(this);

            setInterval(this.changePrices, 60000, this); // jede Minute verändern sich die Preise
        }

        // Ändert Preise für seedlings, cropProducts, dung & pesticide
        // In der Funktion die von setIntervall aufgerufen wird, kann nich mit this auf die Instanz zugegriffen werden, deswegen muss die Instanz extra mit übergeben werden
        changePrices(_market: Market): void {
            console.log("changed");

            for (var seedling of _market.seedlings) {
                seedling.changePrice();  // ruft Funktion aus der class "Product" auf
            }
            for (var cropProduct of _market.cropProducts) {
                cropProduct.changePrice();
            }
            _market.dung.changePrice();
            _market.pesticide.changePrice();
        }

        // zählt die Anzahl (amount) von seedlings in Your Storage runter
        decreaseSeedling(_name: string): void {
            for (let entry of this.seedlings) { // iterates trough the array "seedlings" in which our bought seedlings are stored
                if (entry.name == _name) // if entry in array is a plant, decrease the amount of that plant (comparison by names)
                    entry.amount -= 1;
            }
        }

        // zählt die Anzahl (amount) von dung in Your Storage runter
        decreaseDung(): void {
            console.log("dungPlant", this, this.dung.amount);
            this.dung.amount -= 1;
        }

        // zählt die Anzahl (amount) von pesticide in Your Storage runter
        decreasePesticid(): void {
            this.pesticide.amount -= 1;
        }

        // decreases capital by price of product
        buyProduct(_product: Product): void { //Instanz vom Produkt übergeben
            if (this.totalCapital >= _product.currentPrice) {
                this.totalCapital -= _product.currentPrice; // zieht den aktuellen Verkaufspreis vom Total Capital ab
                _product.amount += 1; // zählt in your storage hoch
                this.refreshTotalCapital();
            }
        }

        refreshTotalCapital(): void {
            let capital: number = this.totalCapital;
            let capitalDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("capital");
            capitalDiv.innerHTML = "TOTAL CAPITAL:   " + capital.toString() + "€";

            if (this.totalCapital == 0) {
                if (window.confirm("You're broke. Try OnlyFans.com, sell your kidney or refresh to start a new game.")) {
                    window.location.reload();
                }
            }

        }

        // Pflanze wird geenrnet = Pflanze wird verkauft = aktueller Verkaufspreis wird totalCapital gutgeschrieben
        sellProduct(_productName: string): void { // zu cropPlant? in Field
            for (let entry of this.cropProducts) { // iterates trough the array "seedlings" in which our bought seedlings are stored
                if (entry.name == _productName) { // if entry in array is a plant, decrease the amount of that plant (comparison by names)
                    this.totalCapital += entry.currentPrice;

                    let sound: HTMLAudioElement = new Audio("./Audio/Money.mpeg");
                    sound.play();

                    this.refreshTotalCapital();
                }
            }
        }
    }
}
