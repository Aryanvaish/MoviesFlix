import { popupClose } from "../script.js"
import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";

import { photoGallery } from "../components/photogallery.js";
import { galleryContent } from "../components/photogallery.js";

import { videoGallery } from "../components/videogallery.js";

const popup_Warp = document.getElementById('popup_Warp');
const mainWrap = document.querySelector('#mainWrap');

export async function detailpopup() {
    const content_Boxes = document.querySelectorAll('.cont_boxes');
    for (let i = 0; i < content_Boxes.length; i++) {

        content_Boxes[i].addEventListener("click", function (e) {
            

            mainWrap.innerHTML = `
            <div class="mainPop">
                <a href="javascript:void(0)" class="videoLink" data-yt-key="">
                    <img src="" class="popImg" alt="Movie Img">
                </a>
                <div class="movieContent">
                    <div class="title">
                        <h2></h2>
                        <img class="adultContext" src="" title=""  alt="rated" >
                    </div>
                <p class="releaseDate"></p>
                <strong class="genres"></strong>
                <p class="overview_context"></p>
                <h3 class="rating"></h3>
                </div>
            </div>`;


            document.querySelector('.mainPop > a > img.popImg').src = this.querySelector('.poster').src;
            document.querySelector('.mainPop .title > h2').textContent = this.querySelector('.mainTitle > strong').textContent;
            document.querySelector('.mainPop p.releaseDate').innerHTML = `Release Date : <span>${this.querySelector('.hiddenInfo .releDate').textContent} </span>`;
            document.querySelector('.mainPop strong.genres').innerHTML = `Genre : ${this.querySelector('.genre').textContent}`;
            document.querySelector('.mainPop p.overview_context').innerHTML = this.querySelector('.hiddenInfo > .overview').textContent;
            document.querySelector('.mainPop h3.rating').innerHTML = `Rating : ${this.querySelector('.hiddenInfo .voteRating').textContent}`;


            const activeSlug = this.querySelector('.mainTitle > strong').textContent.replace(/\s+/g, "-").toLowerCase();
            const activeId = this.querySelector('.hiddenInfo .contentId').textContent;
            history.pushState({}, null, `?${activeId}&${activeSlug}`);

            const slugQuery = window.location.href.split('&')[1];
            const slugId = window.location.href.split('?')[1].split('&')[0];



            if (slugQuery == "undefined" && slugId == "undefined") {
                console.log("No Result Found");
            } else {
                const activePage = document.createElement('a');
                activePage.classList.add('activePage');
                activePage.textContent = this.querySelector('.mainTitle > strong').textContent;
                document.querySelector('.breadcrumb').append("> ");
                document.querySelector('.breadcrumb').append(activePage);
            }


            const media = this.parentElement.parentElement.getAttribute("data-media-type");

            let currMedia;

            if (media == "tv") {
                currMedia = "tv";
            } else if (media == "movie") {
                currMedia = "movie";
            } else if (media == "multi") {
                currMedia = this.querySelector('.hiddenInfo > p.mediaType').textContent;
            }


            fetch(`${baseUrl}/${apiVersion}/${currMedia}/${this.querySelector('.hiddenInfo .contentId').textContent}/videos?api_key=${ApiKey}`)
                .then((response) => response.json())
                .then((trailerData) => {
                    for (let i = 0; i < trailerData.results.length; i++) {
                        if (trailerData.results[i].type == "Trailer") {
                            document.querySelector('.mainPop .videoLink').setAttribute("data-yt-key", trailerData.results[i].key);
                        }
                    }
                });

                document.querySelector('.mainPop > a.videoLink').addEventListener('click', function () {
                const ytKey = document.querySelector('.mainPop .videoLink').getAttribute("data-yt-key");

                popup_Warp.innerHTML = `
                    <div class="ytFrameBody">
                        <iframe src="https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1" allow="autoplay" frameborder="0" allowfullscreen width="100%" height="100%" class="ytframe"></iframe>
                        <img src="images/searchClose.png" alt="CloseIcon" class="playerClose">
                    </div>  
                `;

                popup_Warp.classList.remove('hide');
                document.querySelector('.playerClose').addEventListener('click', () => {
                    popupClose();
                });

            });


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

            // PhotoGallery Section --------------

            const contentId = this.querySelector('.hiddenInfo .contentId').textContent;
            photoGallery(currMedia, contentId);
            galleryContent();

            // Video Gallery Section -------------

            videoGallery();
       
            document.querySelector('#searchResult').style.display = 'none';
            mainWrap.style.display = 'block';
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