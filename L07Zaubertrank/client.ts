//erarbeitet mit Corinna

namespace L07Zaubertrank {
    export async function getData(): Promise<void> {
        let response: Response = await fetch("data.json"); 
        let content: string = await response.text();
        let data = JSON.parse(content);  
        console.log("DATA:");
        console.log(data);
        generateContent(data);    
    }

    export async function sendDrink(_event: Event): Promise<void> {
        console.log("send potion");
        let url: string = "https://eiafuwa.herokuapp.com/";
        //let url: string = "http//localhost:5001/";
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        console.log("Query");
        console.log(query);
        url = url + "?" + query.toString();
        console.log(url);

        let select: HTMLSelectElement = <HTMLSelectElement>document.querySelector("select");
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector("textarea");
        if (select)
        url += "&Wirkung=" + select.value;
        if (textarea.value != "")
        url += "&Nebenwirkungen=" + textarea.value;

        //mithilfe von ayaans code
        let descriptionData: FormData = new FormData(document.forms[0]);
        let instructionData: FormData = new FormData(document.forms[1]);
        let descriptionQuery: URLSearchParams = new URLSearchParams(<any>descriptionData);
        let instructionQuery: URLSearchParams = new URLSearchParams(<any>instructionData);
        let response: Response = await fetch(url + "?" + descriptionQuery.toString() + "&" + instructionQuery.toString());
        let responseText: string = await response.text();
        alert("Potion sent! " + responseText.replace(/<br>/g, " "));
    }
}