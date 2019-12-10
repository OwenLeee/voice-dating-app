class PortfolioList {
    async loadPortfolio() {
        const res = await fetch('/portfolio/allUserInfo');
        this.users = await res.json();
        // console.log(this.users);
        const pictures = await fetch('/portfolio/pictures');
        this.users = await pictures.json()
            ;
        this.renderPortfolio();
    }

    renderPortfolio() {
        let html = '';
        for (let picture of this.pictures) {
            html += `
            <div class="carousel-item active">
            <img src="/user-pics/uploads/pictures/mary.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="/user-pics/uploads/pictures/owen.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
            <img src="/user-pics/uploads/pictures/sherman.jpg" class="d-block w-100" alt="...">
            </div>
            `
        }

    }
}

