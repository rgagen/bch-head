function update() {
    const data = getFormData();
    console.log(data.initials);
    const dict = stringDict();
    const date = date_string(data);
    updateScannerInfo(date, data, dict);
    updateProtocolInfo(date, data, dict);
}

function date_string(data: Data): string {
    const date = new Date();
    const date_string = `${data.initials} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}:`;
    return (date_string);
}

function updateScannerInfo(date: string, data: Data, dict: Record<string, string>) {
    const scanner_info = `${date} ${dict[data["magnet"]]} - `;
    document.getElementById("scanner_info")!.innerHTML = scanner_info;
}

function updateProtocolInfo(date: string, data: Data, dict: Record<string, string>) {
    let brain = `Br: ${dict[data.brain]}`;
    for (let key of data.addBrain) {
        brain = brain + ` + ${dict[key]}`;
    }
    let spine = `Sp: ${dict[data.spine]}`;
    let aa = "AA: ";
    for (let key of data.aa) {
        aa = aa + ` + ${dict[key]}`;
    }
    if (aa.length === 4) {
        aa = aa + " nil";
    }
    const text = `${date}\n${brain}\n${spine}\n${aa}`;
    document.getElementById("protocol")!.innerHTML = text;
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
    let data = new Data();
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
        data.addBrain.push(radio.value);
    }
    const spine = document.getElementsByName("spine");
    for (let radio of spine as NodeListOf<HTMLInputElement>) {
        if (radio.checked) {
            data.spine = radio.value;
        }
        ;
    }
    const aa = document.getElementsByName("aa");
    for (let radio of aa as NodeListOf<HTMLInputElement>) {
        data.aa.push(radio.value);
    }
    return (data);
}

function stringDict(): Record<string, string> {
    const dict: Record<string, string> = {};
    dict["anyScanner"] = "any scanner";
    dict["oneT"] = "1.5T only";
    dict["threeT"] = "3T only";
    dict["oneTPreference"] = "1.5T > 3T";
    dict["threeTPreference"] = "3T > 1.5T";
    dict["standardHead"] = "Brain tumour protocol";
    dict["midline"] = "Midline tumour protocol";
    dict["NF1"] = "NF1 protocol";
    dict["hybrid"] = "Hybrid epilepsy protocol";
    dict["corT2"] = "cor T2 3mm";
    dict["ccjCISS"] = "CISS posterior fossa and CCJ";
    dict["midCISS"] = "midline sag CISS";
    dict["swi"] = "SWI";
    dict["standardSpine"] = "Sag T1+C + axials any ROI";
    dict["t2Spine"] = "Sag T2 + T1+C with axial T2 + T1+C any ROI";
    dict["noSpine"] = "nill";
    dict["svs"] = "/- SVS if any clear recurrence";
    dict["mvs"] = "MVS at level of tumour";
    dict["dscSup"] = "DSC supratentorial";
    dict["dscInf"] = "DSC infratentorial";
    dict["asl"] = "ASL whole head";
    return (dict);
}

function copyScannerInfo(): void {
    const text = document.getElementById("scanner_info")!.innerText;
    navigator.clipboard.writeText(text);
}

function copyProtocolInfo(): void {
    const text = document.getElementById("protocol")!.innerText;
    navigator.clipboard.writeText(text);
}