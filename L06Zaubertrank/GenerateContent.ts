namespace L06Zaubertrank {
    export interface Item {
        name: string;
        price?: number;
        stepper?: boolean;
    }
    export interface Data {
        [category: string]: Item[];
    }
    export function generateContent(_data: Data): void {
        console.log(JSON.stringify(_data));
        let group: HTMLElement | null = null;
        for (let category in _data) {
            let items: Item[] = _data[category];
            group = createSelect(items, category);
            let div: HTMLDivElement | null = document.querySelector("div#" + category);
            if (div && group)
                div.appendChild(group);
        }
        document.getElementById("Wirkung_value")?.addEventListener("input", slider);
        document.getElementById("Zutaten_value")?.addEventListener("input", slider);
    }
    function createSelect(_items: Item[], _category: string): HTMLElement {
        let group: HTMLDivElement = document.createElement("div");
        let select: HTMLSelectElement = document.createElement("select");
        select.id = _category;
        if (_category != "Zutaten") {
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = _category;
            label.htmlFor = _category;
            group.appendChild(label);
            group.innerHTML += "<br>";
        }
        for (let item of _items) {
            let option: HTMLOptionElement = document.createElement("option");
            option.value = item.name;
            if (_category == "Zutaten") {
                option.setAttribute("price", (item.price)!.toString());
                option.setAttribute("stepper", (item.stepper)! + "");
            }
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        group.appendChild(select);
        let range: HTMLInputElement = document.createElement("input");
        range.type = "range";
        range.min = "1";
        range.step = "1";
        range.id = _category + "_value";
        if (_category == "Wirkung") {
            range.name = "Wirkungsdauer";
            range.max = "60";
            let labelForRange: HTMLLabelElement = document.createElement("label");
            labelForRange.textContent = range.name;
            labelForRange.htmlFor = range.name;
            group.innerHTML += "<br>";
            group.appendChild(labelForRange);
        } else {
            range.name = "Menge";
            range.max = "500";
        }
        range.setAttribute("value", "30");
        group.innerHTML += "<br>";
        group.appendChild(range);

        let input: HTMLInputElement = document.createElement("input");
        input.type = "text";
        input.id = "bubble" + range.id;
        input.setAttribute("value", "30");
        input.setAttribute("disabled", "disabled");
        input.setAttribute("class", "time");
        group.appendChild(input);
        if (_category == "Wirkung")
            group.innerHTML += " min";
        else
            group.innerHTML += " Stück/ml";

        return group;
    }
}