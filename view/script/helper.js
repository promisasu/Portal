
function ClearForm(){
  document.getElementById('patient_form').reset();
  sessionStorage.setItem('patientPIN', 0);
}

function showIns(){
  window.location="ins.html";
}

function goIndex(){
  window.location="index.html";
}

function isParentCheck() {
  if (document.getElementById('parentCheck').checked) {

    document.getElementById('ifParent').style.display = 'block';
    document.getElementById('hydroxurea').style.display = 'none';
  }
  else if(document.getElementById('childCheck').checked){

    document.getElementById('ifParent').style.display = 'none';
    document.getElementById('hydroxurea').style.display = 'block';
  }
  else {

    document.getElementById('ifParent').style.display = 'none';
    document.getElementById('hydroxurea').style.display = 'block';
  }

}

var allowedToSubmit=0;

function submitData(){

  //get subject group
  var subjectGroup=getRadioValue("subject_group");

  //parent of which child
  // if (document.getElementById('parentCheck').checked){
  //   var parent_pin = document.getElementById('patient_form').elements['patient_pin1'].value;
  // }
  // else{
  //   var paren_pin = document.getElementById('patient_form').elements['patient_pin2'].value;
  // }
  var child_pin = document.getElementById('patient_form').elements['childPin'].value;


  //get device type
  var deviceType = getRadioValue("device");

  //get device version
  var deviceVersion = document.getElementById('patient_form').elements['device_version'].value;

  //how many hydroxurea tablets
  if(document.getElementById('parentCheck').checked){
    var hydroxurea_tablets = 0+"";
  }else{
    var hydroxurea_tablets = getRadioValue("hydroxurea_tablets");
  }


  //medicine name, medicine dosage in mg and # of tablets --array of objects
  var medDetails = getCheckedBoxes("medicine");
  // for(var i=0;i<medDetails.length;i++){
  //     console.log(":::"+medDetails[i].medicine);
  //     console.log(":::"+medDetails[i].mg);
  //     console.log(":::"+medDetails[i].tablet);
  // }

  //get other medicine info
  var otherMedicine = document.getElementById('patient_form').elements['other_medication'].value;

  //get otherInfo
  var otherInfo = document.getElementById('patient_form').elements['other_info'].value;

  //create json with all the values
  var formData={

    patientGroup: subjectGroup,
    childPin: child_pin,
    deviceType: deviceType,
    deviceVersion: deviceVersion,
    hydroxureaTablets: hydroxurea_tablets,
    medDetails: medDetails,
    otherMedicine: otherMedicine,
    otherInfo: otherInfo

  }

  var formDataJSON = JSON.stringify(formData);
  console.log("JSON before sending::"+formDataJSON);
  if(allowedToSubmit==1){
    //one of the medication value is 0; so dont submit
    allowedToSubmit=0;
  }else{
    allowedToSubmit=0;
    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      url : "{{postURL}}/rest/patients/enrollpatient",
      method: "POST",
      dataType:"json",
      data : formDataJSON,
      success: function(data)
      {
        //data - response from server
        // console.log(data.patientPIN);

        // Put the object into storage
        sessionStorage.setItem('patientPIN', data.patientPIN);
        // window.alert("Your pin is "+data.patientPIN+"\n Please note it down.");
        window.location="success.html";

      },
      error: function(error){
        var errorMessage=JSON.parse(error.responseText).message;
        window.alert(errorMessage);
        window.location="error.html";
      }

    });
  }

}

function getRadioValue(elemName){
  var val;
  var groupInfo=document.getElementById('patient_form').elements[elemName];
  for (var i=0, len=groupInfo.length; i<len; i++) {
    if ( groupInfo[i].checked ) { // radio checked?
      val = groupInfo[i].value; // if so, hold its value in val
      break; // and break out of for loop
    }
  }
  return val;
}

function getCheckedBoxes(chkboxName){
  var checkboxes = document.getElementsByName(chkboxName);
  var ans=[];
  for(var i=0;i<checkboxes.length;i++){
    if(checkboxes[i].checked){
      //get medicine name
      var medName=checkboxes[i].value;
      //get mg and #of tablet for each selected medicine
      var medDiv=document.getElementById(medName).childNodes;
      var mg = medDiv[1].value;
      var tablet = medDiv[3].value;
      if(mg==0 || tablet==0){
        window.alert("Please enter some medication value");
        allowedToSubmit=1;
      }

      //console.log("mg--> "+medDiv[1].value+" tablet--> "+medDiv[3].value)
      //store it into an array
      ans.push({
        medicine: medName,
        prescribedDosage: mg,
        unit: "mg",
        tablet: tablet
      });

    }
  }
  return ans;
}

function goBack(){
  window.location="index.html"
}
