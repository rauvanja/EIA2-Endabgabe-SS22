"use strict";
/*
Gemüsegarten-Simulator
Vanja Katharina Rau, 262452, MKB6
In Zusammenarbeit mit Aileen Akin
Teilweise Zusammenarbeit mit Ronja Burger, Joscha Reuther
*/
var farm;
(function (farm) {
    class Product {
        constructor(_name, _kind, _minPrice, _maxPrice) {
            this.amount = 0;
            this.name = _name;
            this.kind = _kind;
            this.minPrice = _minPrice;
            this.maxPrice = _maxPrice;
            this.changePrice();
        }
        // Plants, Dung und Pesticide bekommen einen zufälligen Preis 
        changePrice() {
            this.currentPrice = Math.floor(Math.random() * (this.maxPrice - this.minPrice) + this.minPrice); //
            // console.log("changeprice", this.currentPrice);
            let price = this.currentPrice;
            let divName = "";
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
            let priceDiv = document.getElementById(divName);
            // console.log(divName, priceDiv);
            if (priceDiv) {
                priceDiv.innerHTML = price.toString() + "€";
            }
        }
    }
    farm.Product = Product;
})(farm || (farm = {}));
//# sourceMappingURL=Product.js.map