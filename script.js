// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "block";
	resetForm();
};

function displayModal() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

function closeModal() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
var seletedRow = null;

function onFormSubmit() {
	var formData = readFormData();
	if (validate(formData)) {
		if (seletedRow == null) {
			insertNewRecord(formData);
		} else updateRecard(formData);
		resetForm();
		closeModal();
	} else console.log(validate(formData));
}

function readFormData() {
	var formData = {};
	formData["rollNo"] = document.getElementById("rollNo");
	formData["name"] = document.getElementById("name");
	formData["gender"] = document.getElementById("gender");
	formData["standard"] = document.getElementById("standard");
	formData["DOB"] = document.getElementById("DOB");

	return formData;
}

function insertNewRecord(data) {
	var table = document
		.getElementById("studentsList")
		.getElementsByTagName("tbody")[0];
	var newRow = table.insertRow(table.length);
	cell1 = newRow.insertCell(0);
	cell1.innerHTML = data.rollNo.value;
	cell1 = newRow.insertCell(1);
	cell1.innerHTML = data.name.value;
	cell1 = newRow.insertCell(2);
	cell1.innerHTML = data.gender.value;
	cell1 = newRow.insertCell(3);
	cell1.innerHTML = data.standard.value;
	cell1 = newRow.insertCell(4);
	cell1.innerHTML = data.DOB.value;
	cell1 = newRow.insertCell(5);
	cell1.innerHTML = `<button id="delete" onClick="onDelete(this)"><img class="icon" src="assets/trash.png"><span class="editdel">Delete</span></button>
                        <button id="edit" onClick="onEdit(this);displayModal()"><img class="icon" src="assets/pen.png"><span class="editdel">Edit</span></button>`;
}

function onEdit(td) {
	seletedRow = td.parentElement.parentElement;
	document.getElementById("rollNo").value = seletedRow.cells[0].innerHTML;
	document.getElementById("name").value = seletedRow.cells[1].innerHTML;
	document.getElementById("gender").value = seletedRow.cells[2].innerHTML;
	document.getElementById("standard").value = seletedRow.cells[3].innerHTML;
	document.getElementById("DOB").value = seletedRow.cells[4].innerHTML;
}

//Clear out the form of old values
function resetForm() {
	document.getElementById("rollNo").value = "";
	document.getElementById("name").value = "";
	document.getElementById("gender").value = "";
	document.getElementById("standard").value = "";
	document.getElementById("DOB").value = "";
	seletedRow = null;
}

function updateRecard(data) {
	seletedRow.cells[0].innerHTML = data.rollNo.value;
	seletedRow.cells[1].innerHTML = data.name.value;
	seletedRow.cells[2].innerHTML = data.gender.value;
	seletedRow.cells[3].innerHTML = data.standard.value;
	seletedRow.cells[4].innerHTML = data.DOB.value;
}

//Confirm Delete Operation then delete
function onDelete(td) {
	if (confirm("Are you sure?")) {
		row = td.parentElement.parentElement;
		document.getElementById("studentsList").deleteRow(row.rowIndex);
		resetForm();
	}
}

//Putting all Validating functions together
function validate(data) {
	if (
		validateName(data["name"]) == "" &&
		validateStandard(data["standard"]) == "" &&
		validateRollNo(data["rollNo"]) == "" &&
		validateDate(data["DOB"]) == "" &&
		validateEmpty(data["rollNo"]) == "" &&
		validateEmpty(data["name"]) == "" &&
		validateEmpty(data["gender"]) == "" &&
		validateEmpty(data["standard"]) == "" &&
		validateEmpty(data["DOB"]) == ""
	)
		return true;
	else return false;
}

//No field should be empty
function validateEmpty(name) {
	var error = "";
	if (name.value.length == 0) {
		name.style.background = "Red";
		document.getElementById("emptyValidationError").innerHTML =
			"The required field has not been filled in";
		var error = "1";
	} else {
		name.style.background = 'url("assets/back-blur3.jpg")';
		document.getElementById("emptyValidationError").innerHTML = "";
	}
	return error;
}

//Validating Name --> Only Alphabets
function validateName(data) {
	var error = "";
	var re = /^[a-zA-Z ]*$/;
	if (!re.test(data.value)) {
		data.style.background = "Red";
		document.getElementById("nameValidationError").innerHTML =
			"Only alphabets are allowed";
		var error = "1";
	} else {
		data.style.background = 'url("assets/back-blur3.jpg")';
		document.getElementById("nameValidationError").innerHTML = "";
	}
	return error;
}

//validating Date --> specified format DD MMM YYYY
function validateDate(data) {
	var error = "";
	var re = /\d{1,2}?\s\w{3}?\s\d{4}?/;
	if (!re.test(data.value)) {
		data.style.background = "Red";
		document.getElementById("dateValidationError").innerHTML =
			"Enter Valid date";
		var error = "1";
	} else {
		data.style.background = 'url("assets/back-blur3.jpg")';
		document.getElementById("dateValidationError").innerHTML = "";
	}
	return error;
}

//validating Standard --> only Roman Numbers are Allowed in Standard
function validateStandard(data) {
	var error = "";
	var re = /^(XC|XL|L?X{0,1})(IX|IV|V?I{0,3})$/;
	if (!re.test(data.value)) {
		data.style.background = "Red";
		document.getElementById("standardValidationError").innerHTML =
			"The required field must be a valid Roman Numeral";
		var error = "1";
	} else {
		data.style.background = 'url("assets/back-blur3.jpg")';
		document.getElementById("standardValidationError").innerHTML = "";
	}
	return error;
}

//validating rolllNo --> only 6 digits, Unique
function validateRollNo(data) {
	var table = document
		.getElementById("studentsList")
		.getElementsByTagName("tbody")[0];
	var error = "";
	var match = "0";
	for (var i = 0, row; (row = table.rows[i]); i++) {
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
		var col = row.cells[0];
		if (col.innerHTML == data.value) {
			match = "1";
		}
	}

	if (seletedRow !== null) {
		match = "0";
	}

	var re = /^\d{6}$/;
	if (!re.test(data.value)) {
		data.style.background = "Red";
		document.getElementById("rollNoValidationError").innerHTML =
			"The required field must be a 6-digit number";
		var error = "1";
	} else if (match !== "0") {
		data.style.background = "Red";
		document.getElementById("rollNoValidationError").innerHTML =
			"The rollNo must be unique";
		var error = "1";
	} else {
		data.style.background = 'url("assets/back-blur3.jpg")';
		document.getElementById("rollNoValidationError").innerHTML = "";
	}
	return error;
}

//To hide default date
function mydate() {
	//alert("");
	document.getElementById("dt").hidden = false;
	document.getElementById("DOB").hidden = true;
}

//to show date in specified format
function mydate1() {
	d = new Date(document.getElementById("dt").value);
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	dt = d.getDate();
	mn = d.getMonth();
	yy = d.getFullYear();
	document.getElementById("DOB").value = dt + " " + months[mn] + " " + yy;
	document.getElementById("DOB").hidden = false;
	document.getElementById("dt").hidden = true;
}

// DARK THEME !!!

const themeStylesheet = document.getElementById("theme");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleCheck = document.getElementById("theme-toggle-check");

themeToggleCheck.addEventListener("click", () => {
	// if it's light -> go dark
	if (themeToggleCheck.checked) {
		// if it's dark -> go light
		themeStylesheet.href = "style-light.css";
		themeToggle.innerText = "Dark";
	} else {
		themeStylesheet.href = "style-dark.css";
		themeToggle.innerText = "Light";
	}
});
