class Setting {
    async loadSettings() {

        const selfResponse = await fetch('/chatroom/me');
        this.selfInfo = await selfResponse.json();
        let myID = this.selfInfo[0].user_id;
        // console.log('1', this.selfInfo[0].user_id) // number

        const pictures = await fetch('/portfolio/pictures/' + myID);
        this.images = await pictures.json();
        // console.log('2', this.images); // [{}, {}, {}, {}];

        const res = await fetch('/portfolio/allUserInfo/' + myID);
        this.users = await res.json();
        // console.log('3', this.users); // [{}];  UserInfo

        const ratings = await fetch('/rating/result/' + myID);
        this.rates = await ratings.json();
        // console.log('4', this.rates); // [{avg}]

        const voice = await fetch('/portfolio/voice/' + myID);
        this.voiceTapes = await voice.json();
        // console.log('5', this.voiceTapes);

        // const changedVoice = await fetch('/setting/voice');
        // this.changedVoiceTapes = await changedVoice.json();
        // console.log('6', this.changedVoiceTapes);


        this.renderSettings();
    }


    renderSettings() {
        let html = '';
        // console.log('5', this.images);
        // for (let image of this.images) {
        //     console.log('4', image.user_id);
        //     if (image.user_id == this.selfInfo[0].user_id) {
        //         console.log(image.picture_path);
        for (let i = 0; i < this.images.length; i++) {
            if (i === 0) {
                html += `
            <div class="carousel-item active">
            <img src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="d-block w-100">
            </div>
            `
            } else {
                html += `
            <div class="carousel-item">
            <img src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="d-block w-100">
            </div>
            `
            }

        }
        document.querySelector('.carousel-inner').innerHTML = html

        // Edit pictures parts

        let deletePictures = '';
        for (let i = 0; i < this.images.length; i++) {
            deletePictures += `
                <div class="shadow p-2 m-2">
                <img class="imageSize" src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="small-images">
                </img>
                <button type="button" class="btn btn-outline-danger deleteButton float-right" data-picture-path="${this.images[i].picture_path}">Delete</button>

                </div>
            `;
        }
        document.querySelector('.image-wrap').innerHTML = deletePictures;

        let deleteButtons = document.querySelectorAll('.deleteButton');
        // console.log(deleteButtons);
        for (let deleteButton of deleteButtons) {
            deleteButton.addEventListener('click', async (event) => {
                event.stopPropagation();

                let picturePath = deleteButton.dataset.picturePath;
                await fetch('/setting/pictures/' + picturePath, {
                    method: 'DELETE'
                });
            });
        };



        // let addPictures = '';
        // for (let i = 0; i < this.images.length; i++) {
        //     deletePictures += `
        // <img class="imageSize" src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="small-images">



        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        let age = getAge(this.users[0].date_of_birth);

        let nameAge = '';
        nameAge += `
            <div>
                <b>${this.users[0].name}, ${age}</b>
            </div>
            `
        document.querySelector('#nameAge').innerHTML = nameAge;


        let rating = '';
        rating += `
        <div class="rating">rating</div>
            <div class="score">${this.rates[0].avg ? this.rates[0].avg : '--'}/5</div>
            `
        document.querySelector('#rating').innerHTML = rating;


        let voice = '';
        voice += `
                <audio controls>
                <source src="/user-pics/uploads/voiceTapes/${this.voiceTapes[0].voice_path}" type="audio/ogg">
                </audio>
                <div>
                <form class="voiceTape" method="PUT" action="/setting/voice" enctype="multipart/form-data">
                <input type="file" id="mp3" name="mp3">
                <input type="submit" value="Change">
                </form>
                </div>
                `
        document.querySelector('#voice').innerHTML = voice;


        document.querySelector('.voiceTape').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append('mp3', document.querySelector('#mp3').files[0], 'voice.mp3')

            const res = await fetch('/setting/voice', {
                method: 'PUT',
                body: formData
            });
            setting.loadSettings();
        });


        let description = '';
        description += `
                <div>${this.users[0].description}</div>
                <form id="change">
                    <div class="form-group">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <button type="submit">Change</button>
                    </div>
                </form>
                `
        document.querySelector('#description').innerHTML = description;


        let edit = document.querySelector('#change');
        edit.addEventListener('submit', async (event) => {
            event.preventDefault();
            let message = document.querySelector('textarea').value
            console.log(message);
            await fetch('/setting/description', {
                method: 'PUT',
                headers: {
                    // Specify any HTTP Headers Here
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    description: message
                })
            });
            setting.loadSettings();
        });

    };
};

let deleteButton = document.querySelector('#close-button');
deleteButton.addEventListener('click', async (event) => {
    // event.preventDefault();
    setting.loadSettings();
});



document.querySelector('.writeboard').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('picture', document.querySelector('#picture').files[0], 'picture.png');

    const res = await fetch('/setting/pictures', {
        method: 'POST',
        body: formData
    });
    let pictureObject = await res.json();
    // console.log(pictureObject);

    document.querySelector('.image-wrap').innerHTML += `
                <div class="shadow p-2 m-2">
                <img class="imageSize" src="/user-pics/uploads/pictures/${pictureObject.picturePath}" class="small-images">
                </img>
                <button type="button" class="btn btn-outline-danger deleteButton float-right" id="added" data-picture-path="${pictureObject.picturePath}">Delete</button>
                </div>
                `;
    // let addedDeleteButtons = document.querySelectorAll('#added');
    // console.log(addedDeleteButtons);
    // addedDeleteButtons.addEventListener('click', async (event) => {

    //     console.log(addedDeleteButtons);        
    //     let picturePath = addedDeleteButtons[addedDeleteButtons.length - 1].dataset.picturePath;
    //     await fetch('/setting/pictures/' + picturePath, {
    //         method: 'DELETE'
    //     });
    // });

});


const setting = new Setting();
setting.loadSettings();





