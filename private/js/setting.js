

document.querySelector('.writeboard').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('picture', document.querySelector('#picture').files[0], 'picture.png');

    const res = await fetch('/setting/addPictures', {
        method: 'POST',
        body: formData
    });
    // if (res.status === 500) {
    //     swal('Only images are allowed!')
    // }
});


document.querySelector('.voiceTape').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mp4', document.querySelector('#mp4').files[0], 'voice.mp4')

    const res = await fetch('/setting/addVoice', {
        method: 'POST',
        body: formData
    });
    // if (res.status === 500) {
    //     swal('Only audio is allowed!')
    // }
});