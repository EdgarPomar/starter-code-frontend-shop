document.querySelector(".form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe si hay errores
    if (validate()) {
        alert("Formulari enviat correctament!"); // Reemplazar por modal o mensaje en pantalla
        this.submit(); // Enviar solo si no hay errores
    }
});

function validate() {
    let error = 0;
    
    // Obtener los campos del formulario
    const fields = [
        { id: "fName", regex: /^[a-zA-ZÀ-ÿ' -]{3,}$/, error: "El nom ha de contenir només lletres i almenys 3 caràcters." },
        { id: "fEmail", regex: /^\S+@\S+\.\S+$/, error: "L'email ha de tenir un format vàlid." },
        { id: "fAddress", regex: /^.{3,}$/, error: "L'adreça ha de tenir almenys 3 caràcters." },
        { id: "fLastN", regex: /^[a-zA-ZÀ-ÿ' -]{3,}$/, error: "Els cognoms han de contenir només lletres i almenys 3 caràcters." },
        { id: "fPassword", regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,8}$/, error: "La contrasenya ha de tenir entre 4 i 8 caràcters, incloent números, majúscules i minúscules." },
        { id: "fPhone", regex: /^\d{9}$/, error: "El telèfon ha de contenir 9 dígits i només números." }
    ];

    clearErrors();

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(`error${field.id.charAt(1).toUpperCase() + field.id.slice(2)}`);
        
        if (!field.regex.test(input.value.trim())) {
            error++;
            showError(input, errorElement, field.error);
        }
    });

    return error === 0;
}

function showError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add("is-invalid");
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll(".form-control").forEach(input => input.classList.remove("is-invalid"));
    document.querySelectorAll(".invalid-feedback").forEach(error => error.style.display = 'none');
}
