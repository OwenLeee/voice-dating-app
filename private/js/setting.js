class Setting {
    async loadSettings() {

        const selfResponse = await fetch('/chatroom/me');
        this.selfInfo = await selfResponse.json();
        let myID = this.selfInfo[0].user_id;
        console.log('1', this.selfInfo[0].user_id) // number

        const pictures = await fetch('/portfolio/pictures/' + myID);
        this.images = await pictures.json();
        console.log('2', this.images); // [{}, {}, {}, {}];

        const res = await fetch('/portfolio/allUserInfo/' + myID);
        this.users = await res.json();
        console.log('3', this.users); // [{}];  UserInfo

        const ratings = await fetch('/rating/result/' + myID);
        this.rates = await ratings.json();
        console.log('4', this.rates); // [{avg}]

        const voice = await fetch('portfolio/voice/' + myID);
        this.voiceTapes = await voice.json();
        console.log('5', this.voiceTapes);


        this.renderSettings();
    }
    renderSettings() {
        let html = '';
        console.log('5', this.images);
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

            document.querySelector('.carousel-inner').innerHTML = html
        }

        // Edit pictures parts

        let editPictures = '';
        for (let i = 0; i < this.images.length; i++) {
            editPictures += `
        <img class="imageSize" src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="small-images">
        </img>
        <button type="button" class="btn btn-outline-danger deleteButton" data-picturePath="${this.images[i].picture_path}">Delete</button>
        `
            document.querySelector('.image-wrap').innerHTML = editPictures;
        }

        let deleteButtons = document.querySelectorAll('deleteButton');
        for (deleteButton of deleteButtons) {
            deleteButton.addEventListener('click', async (event) => {
                event.stopPropagation();
        
        }



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
        <div class="score">${this.rates[0].avg}/5</div>
        `
        document.querySelector('#rating').innerHTML = rating;


        let voice = '';
        voice += `
        <audio controls>
        <source src="/user-pics/uploads/voiceTapes/${this.voiceTapes[0].voice_path}" type="audio/ogg">
        </audio>
        `
        document.querySelector('#voice').innerHTML = voice;

        let description = '';
        description += `
        <div>${this.users[0].description}</div>
        `
        document.querySelector('#description').innerHTML = description;
    }
}

const setting = new Setting();
setting.loadSettings();



/*


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


*/