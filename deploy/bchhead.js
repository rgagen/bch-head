function update() {
    const data = getFormData();
    const dict = stringDict();
    const date = date_string(data);
    updateScannerInfo(date, data, dict);
    updateProtocolInfo(date, data, dict);
}
function date_string(data) {
    const date = new Date();
    const date_string = `${data["initials"]} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}:`;
    return (date_string);
}
function updateScannerInfo(date, data, dict) {
    const scanner_info = `${date} ${dict[data["magnet"]]} - `;
    document.getElementById("scanner_info").value = scanner_info;
}
function updateProtocolInfo(date, data, dict) {
    let brain = `Br: ${dict[data["brain"]]}`;
    const brain_keys = Object.keys(data["addBrain"]);
    for (key of brain_keys) {
        if (data["addBrain"][key]) {
            brain = brain + ` + ${dict[key]}`;
        }
    }
    let spine = `Sp: ${dict[data["spine"]]}`;
    let aa = "AA: ";
    const aa_keys = Object.keys(data["aa"]);
    for (key of aa_keys) {
        if (data["aa"][key]) {
            aa = aa + ` + ${dict[key]}`;
        }
    }
    if (aa.length === 4) {
        aa = aa + " nil";
    }
    const text = `${date}\n${brain}\n${spine}\n${aa}`;
    document.getElementById("protocol").value = text;
}
function getFormData() {
    let data = new Object();
    data['initials'] = document.getElementById("init").value;
    const magnet = document.getElementsByName("magnet");
    for (radio of magnet) {
        if (radio.checked) {
            data['magnet'] = radio.value;
            break;
        }
        ;
    }
    const head = document.getElementsByName("brain");
    for (radio of head) {
        if (radio.checked) {
            data["brain"] = radio.value;
            break;
        }
        ;
    }
    const addBrain = document.getElementsByName("addBrain");
    data["addBrain"] = new Object();
    for (radio of addBrain) {
        data["addBrain"][radio.value] = radio.checked;
    }
    const spine = document.getElementsByName("spine");
    for (radio of spine) {
        if (radio.checked) {
            data['spine'] = radio.value;
        }
        ;
    }
    const aa = document.getElementsByName("aa");
    data['aa'] = new Object();
    for (radio of aa) {
        data['aa'][radio.value] = radio.checked;
    }
    return (data);
}
function stringDict() {
    dict = new Object();
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
function copyScannerInfo() {
    const text = document.getElementById("scanner_info").value;
    navigator.clipboard.writeText(text);
}
function copyProtocolInfo() {
    const text = document.getElementById("protocol").value;
    navigator.clipboard.writeText(text);
}