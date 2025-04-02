
// Exercise 6
function validate() {
    let error = 0;

    // Obtenir els camps del formulari
    let fName = document.getElementById("fName");
    let fEmail = document.getElementById("fEmail");
    let fAddress = document.getElementById("fAddress");
    let fLastN = document.getElementById("fLastN");
    let fPassword = document.getElementById("fPassword");
    let fPhone = document.getElementById("fPhone");

    // Obtenir els elements d'error
    let errorName = document.getElementById("errorName");
    let errorEmail = document.getElementById("errorEmail");
    let errorAddress = document.getElementById("errorAddress");
    let errorLastN = document.getElementById("errorLastN");
    let errorPassword = document.getElementById("errorPassword");
    let errorPhone = document.getElementById("errorPhone");

    clearErrors();

    if (fName.value.trim() === "" || !/^[a-zA-Z]+$/.test(fName.value.trim()) || fName.value.length < 3) {
        error++;
        showError(fName, errorName, "El nom ha de contenir només lletres i almenys 3 caràcters.");
    }

    if (fEmail.value.trim() === "" || !/\S+@\S+\.\S+/.test(fEmail.value.trim())) {
        error++;
        showError(fEmail, errorEmail, "L'email ha de tenir un format vàlid.");
    }

    if (fAddress.value.trim() === "" || fAddress.value.length < 3) {
        error++;
        showError(fAddress, errorAddress, "L'adreça ha de tenir almenys 3 caràcters.");
    }

    if (fLastN.value.trim() === "" || !/^[a-zA-Z]+$/.test(fLastN.value.trim()) || fLastN.value.length < 3) {
        error++;
        showError(fLastN, errorLastN, "Els cognoms han de contenir només lletres i almenys 3 caràcters.");
    }

    if (fPassword.value.length < 4 || fPassword.value.length > 8 || !/[a-zA-Z]/.test(fPassword.value) || !/[0-9]/.test(fPassword.value)) {
        error++;
        showError(fPassword, errorPassword, "La contrasenya ha de tenir entre 4 i 8 caràcters, incloent números i lletres.");
    }

    if (fPhone.value.trim() === "" || !/^\d{9}$/.test(fPhone.value.trim())) {
        error++;
        showError(fPhone, errorPhone, "El telèfon ha de contenir 9 dígits i només números.");
    }

    if (error > 0) {
        alert("Per favor, corregiu els errors abans d'enviar el formulari.");
        return false; 
    } else {
        alert("Formulari enviat correctament!");
        return true; 
    }
}

function showError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add("is-invalid"); 
    errorElement.textContent = errorMessage;  
    errorElement.style.display = 'block'; 
}

function clearErrors() {
    
    let inputs = document.querySelectorAll(".form-control");
    inputs.forEach(input => {
        input.classList.remove("is-invalid");
    });

    let errorMessages = document.querySelectorAll(".invalid-feedback");
    errorMessages.forEach(error => {
        error.style.display = 'none';
    });
}
