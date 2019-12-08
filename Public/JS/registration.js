window.onload = function () {
    main();
};

function main() {
    const registrationForm = document.getElementById("registration-form");
    console.log(registrationForm);
    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = registrationForm.querySelector("input[name='name']").value;
        const gender = registrationForm.querySelector('#form-gender').value;
        const dateOfBirth = registrationForm.querySelector('#form-dob').value;
        const voiceIntro = registrationForm.querySelector('#form-voice').value;
        const icon = registrationForm.querySelector('#form-icon').value;
        const images = registrationForm.querySelector('#form-images').value;

        const registrationFromContent = { name, gender, dateOfBirth, voiceIntro, icon, images };

        const res = fetch('/registration/uploadInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(registrationFromContent)
        });

        console.log(registrationFromContent);


        // if (res.status === 200) {
        //     window.location.href = '/match.html';
        // } else {
        //     alert("upload failed");
        // };

    }
    )
};
