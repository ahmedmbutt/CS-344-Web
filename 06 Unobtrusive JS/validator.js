function openWindow(name, email, pass) {
    window.open("", "ApplicationForm", "width=500, height=250").document.write(`<strong>You've entered the following details:</strong><br><br><tt>Full Name: </tt><em>${name}</em><br><tt>Email Address: </tt><em>${email}</em><br><tt>Password: </tt><em>${pass}</em><br>`);
}

function displayMsg(id, msg) {
    document.getElementById(id).innerHTML = msg;
}

function validateForm() {
    let nameValid;
    const nameRegex = /^[A-Za-z ]+$/;
    var name = document.ApplicationForm.FullName.value;
    if (name == "") {
        nameValid = false;
        displayMsg("FullName", "Please enter your Full Name!");
    } else if (!nameRegex.test(name)) {
        nameValid = false;
        displayMsg("FullName", "Please enter a valid Full Name!");
    } else {
        nameValid = true;
        displayMsg("FullName", "");
    }

    let emailValid;
    const emailRegex = /^\S+@\S+\.\S+$/;
    var email = document.ApplicationForm.EmailAddress.value;
    if (email == "") {
        emailValid = false;
        displayMsg("EmailAddress", "Please enter your Email Address!");
    } else if (!emailRegex.test(email)) {
        emailValid = false;
        displayMsg("EmailAddress", "Please enter a valid Email Address!");
    } else {
        emailValid = true;
        displayMsg("EmailAddress", "");
    }

    let passValid;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    var pass = document.ApplicationForm.Password.value;
    if (pass == "") {
        passValid = false;
        displayMsg("Password", "Please enter your Password!");
    } else if (!passRegex.test(pass)) {
        passValid = false;
        displayMsg("Password", "Please enter a valid Password!");
    } else {
        passValid = true;
        displayMsg("Password", "");
    }

    if (nameValid && emailValid && passValid) {
        openWindow(name, email, pass);
        return true;
    } else {
        return false;
    }
}

window.onload = function () {
    document.forms["ApplicationForm"].onsubmit = validateForm;
}