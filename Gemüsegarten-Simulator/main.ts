namespace farm {
    window.addEventListener("load", hndLoad);
    function hndLoad(): void {
        let start: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        start.addEventListener("click", hideScreen1);
    }

    // Screen 1 verschwindet und wechselt zu Screen 2
    function hideScreen1(): void {
        let screen1: HTMLDivElement = <HTMLDivElement>document.getElementById("Screen1");
        let screen2: HTMLDivElement = <HTMLDivElement>document.getElementById("Screen2");
        screen1.style.display = "none";
        screen2.style.display = "unset";
        createFields();
    }

    // create fields
    function createFields(): void {

        //iterate through rows
        for (let index: number = 0; index < 7; index++) { 
            document.querySelector("row" + index);
            let rows: HTMLDivElement = <HTMLDivElement>document.getElementById("row" + index);


            //create 7 fields in a row 
            for (let index: number = 0; index < 9; index++) {
                let field: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                field.classList.add("field");
                rows.appendChild(field);
                let stateAd: HTMLDivElement = <HTMLDivElement>document.createElement("div");
                stateAd.classList.add("state");
                field.appendChild(stateAd);
            }
        }
    }
}