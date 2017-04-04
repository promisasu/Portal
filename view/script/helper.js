var patientType = "";
var patientProperties = [];
patientProperties["medDetails"] = [];
var MEDICINE_CONSTANTS = ["Oxycodone", "Tramadol", "Dilaudid", "Percocet", "Ibuprofen", "Naprosyn", "Tylenol with codeine"]


function isParentCheck(subjectGroupValue) {
    if (subjectGroupValue === "parent_proxy") {

        document.getElementById('ifParent').style.display = 'block';
        document.getElementById('hydroxurea').style.display = 'none';
        document.getElementById('medication-questions').style.display = 'none';
    } else {
        document.getElementById('ifParent').style.display = 'none';
        document.getElementById('hydroxurea').style.display = 'block';
        document.getElementById('medication-questions').style.display = 'block';
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
    document.getElementById("submitBtn").classList.remove("disabled");
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
    if (patientType === "adult" || patientType === "child") {
        patientProperties["childPin"] = "";
    } else if (patientType === "parent_proxy") {
        patientProperties["hydroxureaTablets"] = 0 + "";

        //validate child pin
        const regex = /^\d{4}$/;
        if (patientProperties["childPin"] != undefined && patientProperties["childPin"].match(regex)) {
            document.getElementById("childPinErrorMessage").setAttribute("hidden", null);
        } else {
            document.getElementById("childPinErrorMessage").removeAttribute("hidden");
            window.setTimeout(function() {
                document.getElementById("childPin").focus();
            }, 0);
            return;
        }
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
    $('#submitBtn').addClass('disabled').attr('disabled', true);

    callAjax(formData);
}

function callAjax(formData) {
    var formPostElement = document.getElementById("webFormPostUrl");
    var postURL = formPostElement.dataset.webformpost;
    console.log("postURL");
    console.log(postURL);
    var formDataJSON = JSON.stringify(formData);
    console.log("JSON before sending::" + formDataJSON);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: postURL,
        method: "POST",
        dataType: "json",
        data: formDataJSON,
        success: function(data) {
            console.log("Success");
            console.log(data);
            sessionStorage.setItem('patientPIN', data.patientPIN);
            $('#patientPIN').text(data.patientPIN);

            $('#success-modal').modal({
                backdrop: 'static',
                keyboard: false
            });

            $("#success-modal-close").click(function() {
                var element = document.getElementById('modalClose');
                var trialId = element.getAttribute('data-trial-id');
                window.location = "/trial/" + trialId;
            });

            ClearForm();
        },
        error: function(error) {
            console.log(error);

            $('#error-message').text(error.responseJSON.message);

            $('#error-modal').modal({
                backdrop: 'static',
                keyboard: false
            });


            $("#error-modal-dismiss").click(function() {
                checkRequiredValues();
            });
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

function enable(medicineName) {
    var e = document.getElementById(medicineName + "_tablets");
    if (e.options[e.selectedIndex].value == "0") {
        document.getElementById(medicineName + "_medicine_mg").setAttribute("disabled", null);
        document.getElementById(medicineName + "_medicine_mg").setAttribute("hidden", null);
        document.getElementById(medicineName + "_medicine_mg").selected = false;
        document.getElementById(medicineName + "_medicine_mg_label").setAttribute("hidden", null);
    } else {
        document.getElementById(medicineName + "_medicine_mg").removeAttribute("disabled");
        document.getElementById(medicineName + "_medicine_mg").removeAttribute("hidden");
        document.getElementById(medicineName + "_medicine_mg_label").removeAttribute("disabled");
        document.getElementById(medicineName + "_medicine_mg_label").removeAttribute("hidden");
    }
}

ClearForm();
