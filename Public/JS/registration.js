window.onload = function () {
    main();
};

function main() {
    const registrationForm = document.getElementById("registration-form");
    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', registrationForm.querySelector("input[name='name']").value);
        formData.append('gender', registrationForm.querySelector("#form-gender").value);
        formData.append('dateOfBirth', registrationForm.querySelector("input[name='date-of-birth']").value);
        formData.append('voiceIntro', registrationForm.querySelector("input[name='voice']").files[0]);
        formData.append('icon', registrationForm.querySelector("input[name='icon']").files[0]);
        for (const image of registrationForm.querySelectorAll(".img-class")[0].files) {
            formData.append("image", image);
        }
        
        formData.append('description', registrationForm.querySelector("input[name='description']").value);

        console.log(formData);


        const res = fetch('/registration/uploadInfo', {
            method: 'POST',
            body: formData
        });
        
    })
};