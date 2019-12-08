document.querySelector('.writeboard').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('picture', document.querySelector('#picture').files[0], 'picture.png')

    await fetch('/setting/addPictures', {
        method: 'POST',
        body: formData
    })
});

document.querySelector('.voiceTape').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mp4', document.querySelector('#mp4').files[0], 'voice.mp4')

    await fetch('/setting/addVoice', {
        method: 'POST',
        body: formData
    })
});