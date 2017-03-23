var patientType = "";
var patientProperties = [];
patientProperties["medDetails"] = [];
var MEDICINE_CONSTANTS = ["Oxycodone", "Tramadol", "Dilaudid", "Percocet", "Ibuprofen", "Naprosyn", "Tylenol with codeine"]


function isParentCheck(subjectGroupValue) {
    if (subjectGroupValue === "parent_proxy") {

        document.getElementById('ifParent').style.display = 'block';
        document.getElementById('hydroxurea').style.display = 'none';
    } else {
        document.getElementById('ifParent').style.display = 'none';
        document.getElementById('hydroxurea').style.display = 'block';
    }
    //get subject group/patientType
    patientType = subjectGroupValue;
}

function setHydroxurea(tablets) {
    patientProperties["hydroxureaTablets"] = tablets;
    checkRequiredValues();
}

function setChildPin(pin) {
    if (pin != "") {
        patientProperties["childPin"] = pin;
        checkRequiredValues();
    }
}

function checkRequiredValues() {
    document.getElementById("submitBtn").removeAttribute("disabled");
}

function getDeviceType() {
    var val;
    var groupInfo = document.getElementById('patient_form').elements["device"];
    for (var i = 0, len = groupInfo.length; i < len; i++) {
        if (groupInfo[i].checked) { // radio checked?
            val = groupInfo[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val;
}

function getMedicine() {
    var medicineName;
    for (var i = 0; i < MEDICINE_CONSTANTS.length; i++) {
        medicineName = MEDICINE_CONSTANTS[i];
        medTablets = document.getElementById(medicineName + "_tablets");
        medDosage = document.getElementById(medicineName + "_medicine_mg");
        if (medTablets.options[medTablets.selectedIndex].value != 0 && !(medDosage.hasAttribute("disabled"))) {
            patientProperties["medDetails"].push({
                medicine: medicineName,
                prescribedDosage: medDosage.options[medDosage.selectedIndex].value,
                unit: "mg",
                tablet: medTablets.options[medTablets.selectedIndex].value
            });
        }
    }
}

function submitData() {
    //console.log(temp);
    if (patientType === "adult" || patientType === "child") {
        patientProperties["childPin"] = "";
    } else if (patientType === "parent_proxy") {
        patientProperties["hydroxureaTablets"] = 0 + "";
    }

    //get device type
    patientProperties["deviceType"] = getDeviceType();

    //get device version
    patientProperties["deviceVersion"] = document.getElementById('patient_form').elements['device_version'].value;

    //medicine name, medicine dosage in mg and # of tablets --array of objects
    //patientProperties["medDetails"] ();

    //get other medicine info
    patientProperties["otherMedicine"] = document.getElementById('patient_form').elements['other_medication'].value;

    //get otherInfo
    patientProperties["otherInfo"] = document.getElementById('patient_form').elements['other_info'].value;
    getMedicine();

    //create json with all the values
    var formData = {

        patientGroup: patientType,
        childPin: patientProperties["childPin"],
        deviceType: patientProperties["deviceType"],
        deviceVersion: patientProperties["deviceVersion"],
        hydroxureaTablets: patientProperties["hydroxureaTablets"],
        medDetails: patientProperties["medDetails"],
        otherMedicine: patientProperties["otherMedicine"],
        otherInfo: patientProperties["otherInfo"]
    }
    callAjax(formData);
}

function callAjax(formData) {
    var formDataJSON = JSON.stringify(formData);
    console.log("JSON before sending::" + formDataJSON);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "{{postURL}}/rest/patients/enrollpatient",
        method: "POST",
        dataType: "json",
        data: formDataJSON,
        success: function(data) {
            //data - response from server
            // console.log(data.patientPIN);
            // Put the object into storage
            console.log("Success");
            console.log(data);
            sessionStorage.setItem('patientPIN', data.patientPIN);
            // window.alert("Your pin is "+data.patientPIN+"\n Please note it down.");
            window.location = "/addNewSuccess/" + data.patientPIN;
        },
        error: function(error) {
            console.log(error);
            var errorMessage = JSON.parse(error.responseText).message;
            window.alert(errorMessage);
            window.location = "error.html";
        }
    });
}

function ClearForm() {
    document.getElementById('patient_form').reset();
    sessionStorage.setItem('patientPIN', 0);
}

function showIns() {
    window.location = "ins.html";
}

function goIndex() {
    window.location = "index.html";
}

function goBack() {
    window.location = "index.html"
}

function enable(medicineName) {
    var e = document.getElementById(medicineName + "_tablets");
    if (e.options[e.selectedIndex].value == "0") {
        document.getElementById(medicineName + "_medicine_mg").setAttribute("disabled", null);
    } else {
        document.getElementById(medicineName + "_medicine_mg").removeAttribute("disabled");
    }
}
