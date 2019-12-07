window.onload = function () {
    main ();
};

function main () {
    const registrationForm = document.getElementById("registration-form");
    registrationForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = registrationForm.querySelector("input[name='form-name']").value;
        

    })


}