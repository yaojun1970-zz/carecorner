/*------------------------------------------------------------
Author:        Yao Jun
Company:       Salesforce.com
Description:   JavaScript Library for validating the required 
			   field input and formatting for Web-to-Case form

History
14 March 2014      Yao Jun     Creation
------------------------------------------------------------*/

window.onload = init;
 
// The "onload" handler. Run after the page is fully loaded.
function init() {
   // Attach "onsubmit" handler
   document.getElementById("theForm").onsubmit = validateGenericForm;
   
}

// You need to change the default value of <select>'s <option>, if it is not set to "".
var defaultSelection = "";

//define the Web-to-Case form element Id;
var fullname = "last_name";
var DOB = "00N6F00000EgS5w";
var NRIC = "00N6F00000EgS6a";
var citizen = "00N6F00000EgS5n";
var email = "email";
var address = "street";
var emergencyContactName = "00N6F00000EgS5z";
var emergencyRelationship = "00N6F00000EgS61";
var emergencyContactNo = "00N6F00000EgS60";
var viCertification = "00N6F00000EgS7S";
var commitmentLevel = "00N6F00000EgS5o";
var declarMedical = "00N6F00000EgS6W";
var declarEmployee = "00N6F00000EgS7G";
var declarAddiction = "00N6F00000EgS5g";
var declarCriminal = "00N6F00000EgS5v";
var declarOffence = "00N6F00000EgS5u"; 

    
/* The "onsubmit" handler to validate the input fields.
 * Most of the input validation functions take 2 arguments:
 * inputId or inputName: the "id" of the <input> element to be validated
 *   or "name" for checkboxes and radio buttons.
 * errorMsg: the error message to be displayed if validation fails.
 *   The message shall be displayed on an element with id of
 *   inputID+"Error" if it exists; otherwise via an alert().
 */
 
function validateGenericForm() {
	
	var isValidFullname = isNotEmpty(fullname, "Please enter your name.");
	var isValidDOB = isNotEmpty(DOB, "Please enter your Date of Birth.");	
	// Removed NRIC check due to PDPA compliance
	//var isValidNRIC = isNotEmpty(NRIC, "Please enter your NRIC/Fin No.");
	var isValidCitizen = isSelected(citizen, "Please select your Citizenship.");
	var isValidEmail = verifyEmailFormat(email, "Please enter a valid Email address.");
	var isValidAddress = isNotEmpty(address, "Please enter your postal address.");
	var isValidEmergencyContactName = isNotEmpty(emergencyContactName, "Please enter contact name.");
	var isValidEmergencyRelationship = isNotEmpty(emergencyRelationship, "Please enter relationship.");
	var isValidEmergencyContactNo = isNotEmpty(emergencyContactNo, "Please enter contact number.");
	var isValidVICertification = isSelected(viCertification, "Please select an answer.");
	var isValidCommitmentLevel = isSelected(commitmentLevel, "Please select commitment level.");
	var isValidDeclarMedical = isSelected(declarMedical, "Please select an answer.");
	var isValidDeclarEmployee = isSelected(declarEmployee, "Please select an answer.");
	var isValidDeclarAddiction = isSelected(declarAddiction, "Please select an answer.");
	var isValidDeclarCriminal = isSelected(declarCriminal, "Please select an answer.");
	var isValidDeclarOffence = isSelected(declarOffence, "Please select an answer.");
	
	
	var validated = (isValidFullname 
					&& isValidDOB
					//&& isValidNRIC 
					&& isValidCitizen 
					&& isValidEmail
					&& isValidAddress
					&& isValidEmergencyContactName
					&& isValidEmergencyRelationship
					&& isValidEmergencyContactNo
					&& isValidVICertification
					&& isValidCommitmentLevel
					&& isValidDeclarMedical
					&& isValidDeclarEmployee
					&& isValidDeclarAddiction
					&& isValidDeclarCriminal
					&& isValidDeclarOffence); 
	
	if (validated) {
		var width = 400; 
		var height = 300;
		var screenX = (screen.width/2 - width/2);
		var screenY = (screen.height/2 - height/2);
		var features= "width=" + width + ",height=" + height;
		features += ",screenX=" + screenX + ",left=" + screenX;
		features += ",screenY=" + screenY +",top=" + screenY;
		features += ",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,addressbar=no";
		var mywin=window.open(url, "_blank", features);
		mywin.focus();
	}
	
	return validated;

}


// Return true if the input value is not empty
function isNotEmpty(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = (inputValue.length !== 0);  
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}

// Return true if selection is made in <select> input
function isSelected(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value;
   var isValid = inputValue != defaultSelection;
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}

// Return true if the input value is a valid email address
function verifyEmailFormat(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var emailFilter = /^\w+[\+\.\w\-]*@([\w\-]+\.)*\w+[\w\-]*\.([a-z]{2,4}|\d+)$/ig;
   var inputValue = inputElement.value.trim();
   var isValid = (inputValue.length !== 0) && (inputValue.search(emailFilter) !== -1);
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}


/* If "isValid" is false, print the errorMsg; else, reset to normal display.
 * The errorMsg shall be displayed on errorElement if it exists;
 *   otherwise via an alert().
 */
function showMessage(isValid, inputElement, errorMsg, errorElement) {
   if (!isValid) {
      // Put up error message on errorElement or via alert()
      if (errorElement !== null) {
         errorElement.innerHTML = errorMsg;
      } else {
         alert(errorMsg);
      }
      // Change "class" of inputElement, so that CSS displays differently
      if (inputElement !== null) {
         inputElement.className += " error";
         inputElement.focus();
      }
   } else {
      // Reset to normal display
      if (errorElement !== null) {
         errorElement.innerHTML = "";
      }
      if (inputElement !== null) {
         inputElement.className = "";
      }
   }
}

