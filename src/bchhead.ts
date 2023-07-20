async function update(): Promise<void> {
    const data = getFormData();
    const dict = await stringDict();
    const date = date_string(data);
    updateScannerInfo(date, data, dict);
    updateProtocolInfo(date, data, dict);
}

function date_string(data: Data): string {
    const date = new Date();
    const date_string = `${data.initials} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}:`;
    return (date_string);
}

function updateScannerInfo(date: string, data: Data, dict: Map<string, string>) {
    const scanner_info = `${date} ${dict.get(data.magnet)} - `;
    document.getElementById("scanner_info")!.innerText = scanner_info;
}

function updateProtocolInfo(date: string, data: Data, dict: Map<string, string>) {
    let brain = `Br: ${dict.get(data.brain)}`;
    for (let key of data.addBrain) {
        brain = brain + ` + ${dict.get(key)}`;
    }
    let spine = `Sp: ${dict.get(data.spine)}`;
    let aa = "AA: ";
    for (let key of data.aa) {
        aa = aa + ` + ${dict.get(key)}`;
    }
    if (aa.length === 4) {
        aa = aa + " nil";
    }
    const text = `${date}\n${brain}\n${spine}\n${aa}`;
    document.getElementById("protocol")!.innerText = text;
}

class Data {
    initials: string = "";
    magnet: string = "";
    brain: string = "";
    addBrain: string[] = [];
    spine: string = "";
    aa: string[] = [];
}

function getFormData(): Data {
    const data = new Data();
    data.initials = (document.getElementById("init") as HTMLInputElement)!.value;
    const magnet = document.getElementsByName("magnet");
    for (let radio of magnet as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.magnet = radio.value;
            break;
        }
    }
    const brain = document.getElementsByName("brain");
    for (let radio of brain as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.brain = radio.value;
            break;
        }
    }
    const addBrain = document.getElementsByName("addBrain");
    for (let radio of addBrain as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.addBrain.push(radio.value);
        }
    }
    const spine = document.getElementsByName("spine");
    for (let radio of spine as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.spine = radio.value;
        }
    }
    const aa = document.getElementsByName("aa");
    for (let radio of aa as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.aa.push(radio.value);
        }
    }
    return (data);
}

async function stringDict(): Promise<Map<string, string>> {
    const dict = fetch("dictionary.json")
        .then((res) => res.json())
        .then((json) => {
                const dict = new Map<string, string>();
                for (let key in json) {
                    dict.set(key, json[key]);
                }
                return(dict)
            })
    return(dict);
}

function copyScannerInfo(): void {
    const text = document.getElementById("scanner_info")!.innerText;
    navigator.clipboard.writeText(text);
}

function copyProtocolInfo(): void {
    const text = document.getElementById("protocol")!.innerText;
    navigator.clipboard.writeText(text);
}