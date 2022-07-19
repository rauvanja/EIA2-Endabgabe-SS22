/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/

namespace farm {

    export class Product { 

        name: string;
        kind: string; // entweder cropProduct, seedling oder standard
        currentPrice: number; // jedes Produkt hat einen Preis
        maxPrice: number; 
        minPrice: number;  
        amount: number = 0;

        constructor(_name: string, _kind: string, _minPrice: number, _maxPrice: number) {
            this.name = _name;
            this.kind = _kind;
            this.minPrice = _minPrice;
            this.maxPrice = _maxPrice;
            this.changePrice();
        }  

        // Plants, Dung und Pesticide bekommen einen zufälligen Preis 
        changePrice(): void {
            this.currentPrice = Math.floor(Math.random() * (this.maxPrice - this.minPrice) + this.minPrice); //
            // console.log("changeprice", this.currentPrice);
            let price: number = this.currentPrice;
            let divName: string = "";
            if (this.kind == "cropProduct") {
                divName = "priceSell" + this.name; // ??
            } 
            if (this.kind == "seedling") {
                divName = "priceBuy" + this.name; 
            }
            if (this.kind == "standard") {
                divName = "priceBuy" + this.name; // ??
                // console.log("dung oder peesticide", <HTMLTableCellElement>document.getElementById(divName));
                // console.log(document);
            }
            
            
            let priceDiv: HTMLTableCellElement = <HTMLTableCellElement>document.getElementById(divName);
            // console.log(divName, priceDiv);
            if (priceDiv) {
                priceDiv.innerHTML = price.toString() + "€";
            }
        }
    }
}
