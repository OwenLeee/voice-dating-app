
let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("id")

class PortfolioList {
    // console.log(this.users);
    async loadPortfolio() {
        const selfResponse = await fetch('/chatroom/me');
        this.selfInfo = await selfResponse.json();
        // console.log('1', this.selfInfo[0].user_id) // number

        const pictures = await fetch('/portfolio/pictures/' + userId);
        this.images = await pictures.json();
        // console.log('2', this.images); // [{}, {}, {}, {}];

        const res = await fetch('/portfolio/allUserInfo/' + userId);
        this.users = await res.json();
        // console.log('3', this.users); // [{}];  UserInfo

        const ratings = await fetch('/rating/result/' + userId);
        this.rates = await ratings.json();
        // console.log('4', this.rates); // [{avg}]

        const voice = await fetch('portfolio/voice/' + userId);
        this.voiceTapes = await voice.json();
        // console.log('5', this.voiceTapes);
        this.renderPortfolio();


    }

    renderPortfolio() {

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
            <img src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="d-block w-100" alt="...">
            </div>
            `
            } else {
                html += `
            <div class="carousel-item">
            <img src="/user-pics/uploads/pictures/${this.images[i].picture_path}" class="d-block w-100" alt="...">
            </div>
            `
            }

            document.querySelector('.carousel-inner').innerHTML = html
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
            <div><b>${this.users[0].name}, ${age}</b></div>
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




const portfolioList = new PortfolioList;
portfolioList.loadPortfolio();

