const popup_Warp = document.getElementById('popup_Warp');

export function infoPop() {
    const content_Boxes = document.querySelectorAll('.cont_boxes');
    for (let i = 0; i < content_Boxes.length; i++) {
        content_Boxes[i].addEventListener("click", function () {

            document.querySelector('.mainPop > img.popImg').src = this.querySelector('.poster').src;
            document.querySelector('.mainPop .title > h2').textContent = this.querySelector('.mainTitle > strong').textContent;
            document.querySelector('.mainPop p.releaseDate').innerHTML = `Release Date : <span>${this.querySelector('.hiddenInfo .releDate').textContent} </span>`;
            document.querySelector('.mainPop strong.genres').innerHTML = `Genre : ${this.querySelector('.genre').textContent}`;
            document.querySelector('.mainPop p.overview_context').innerHTML = this.querySelector('.hiddenInfo > .overview').textContent;
            document.querySelector('.mainPop h3.rating').innerHTML = `Rating : ${this.querySelector('.hiddenInfo .voteRating').textContent}`;

            const ratedOrnot = this.querySelector('.hiddenInfo .adultScheme').textContent;
            if (ratedOrnot == 'false') {
                document.querySelector('.mainPop img.adultContext').src = 'images/tick.png';
                document.querySelector('.mainPop img.adultContext').title = 'Family Friendly 😄';
                document.querySelector('.mainPop img.adultContext').classList.add('underRated');
            } else {
                document.querySelector('.mainPop img.adultContext').src = 'images/rated.png'
                document.querySelector('.mainPop img.adultContext').title = '18+ Content ☠️';
                document.querySelector('.mainPop img.adultContext').classList.add('RatedPlus');
            }

            document.querySelector('body').style.overflowY = "hidden";
            popup_Warp.classList.remove('hide');
        })
    }

    const closeForm = document.querySelectorAll('.closeForm');
    for (let k = 0; k < closeForm.length; k++) {
        closeForm[k].addEventListener("click", function () {
            document.querySelector('body').style.overflowY = "auto";
            popup_Warp.classList.add('hide');
        })
    }

}


if (popup_Warp.classList.contains('hide')) {
    addEventListener("keydown", (e) => {
        if (e.isComposing || e.code === 'Escape') {
            document.querySelector('body').style.overflowY = "auto";
            popup_Warp.classList.add('hide');
        }
    })
}