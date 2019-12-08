document.querySelector('.writeboard').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('picture', document.querySelector('#picture').files[0], 'picture.png')

    await fetch('/setting/addPictures', {
        method: 'POST',
        body: formData
    })
});