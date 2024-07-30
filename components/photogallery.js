import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";

import { popupClose } from "../script.js"


var defaultgallery;

var currmediatype;
var currcontentid;
export async function photoGallery(currMedia, contentId) {

    currmediatype = currMedia;
    currcontentid = contentId;

    const photoSection = document.querySelector('#photoGallery');
    photoSection.innerHTML = `<div class='imgTabs'>
                                    <strong>Photo Gallery :</strong>
                                    <button class="active" data-image-gallery="backdrops">Backdrops</button>
                                    <button class="" data-image-gallery="posters">Posters</button>
                                    <button class="" data-image-gallery="logos">Logos</button>
                              </div>`

    const galleryWrap = document.createElement('div')
    galleryWrap.classList.add('galleryWrap', 'photoWrap');
    photoSection.appendChild(galleryWrap);

    const imgTabsButtons = document.querySelectorAll('.imgTabs > button');
    imgTabsButtons.forEach((button) => {
        button.addEventListener('click', () => {
            imgTabsButtons.forEach((button) => {
                button.classList.remove('active');
            });
            button.classList.add('active');
            galleryWrap.innerHTML = '';
            phtotgalleryContent();
        });
    });

};

export async function phtotgalleryContent() {
    await fetch(`${baseUrl}/${apiVersion}/${currmediatype}/${currcontentid}/images?api_key=${ApiKey}`)
        .then((response) => response.json())
        .then((data) => {

            const activegalleryTab = document.querySelector('.imgTabs > button.active').getAttribute('data-image-gallery');

            defaultgallery = data[activegalleryTab];

            const galleryDiv = document.querySelector('.galleryWrap.photoWrap');

            // Error handling --------------------------

            if (defaultgallery.length == 0) {
                galleryDiv.innerHTML = `<strong class="noimgs">Not Available !!!</strong>`
            }

            // -----------------------------------------

            var itemNo = 1;

            for (let i = 0; i < defaultgallery?.length; i++) {
                let imageUrl = defaultgallery[i]?.file_path;
                galleryDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w1066_and_h600_face//${imageUrl}" data-item="img-${itemNo++}">`
            }

            // Img Error Handler -----------------------

            const galleryImgs = document.querySelectorAll(".galleryWrap.photoWrap img");
            for (let j = 0; j < galleryImgs.length; j++) {
                galleryImgs[j].addEventListener("error", function () {
                    galleryImgs[j].setAttribute("src", "images/not-found-image.png");
                });
            }

            // Img PopoUp ------------------------------

            const popup_Warp = document.getElementById('popup_Warp');
            const photoWrapImgs = document.querySelectorAll(".galleryWrap.photoWrap > img");
            const allimgs = document.querySelectorAll('.galleryWrap.photoWrap img');

            var CurrIndex;
            var currentImage;

            for (let z = 0; z < photoWrapImgs.length; z++) {
                photoWrapImgs[z].addEventListener('click', function () {

                    currentImage = this.src;
                    popup_Warp.innerHTML = `<img src="./images/leftArrow.svg" class="arrows left-item"><img src='${currentImage}' class="fullSizegallery"><img src="./images/rightArrow.svg" class="arrows right-item"><img src="images/searchClose.png" alt="CloseIcon" class="playerClose">`;
                    document.querySelector('.playerClose').addEventListener('click', () => {
                        popupClose();
                    });
                    popup_Warp.classList.remove('hide');
                    CurrIndex = Array.from(allimgs).findIndex((item) => item == this);

                    if (CurrIndex === 0 || allimgs.length <= 1) { document.querySelector('.arrows.left-item').classList.add('hide'); }
                    if (CurrIndex === allimgs.length - 1 || allimgs.length <= 1) { document.querySelector('.arrows.right-item').classList.add('hide'); }


                    addEventListener("keydown", (e) => {
                        if (e.isComposing || e.code === "ArrowLeft") {
                            document.querySelector('.arrows.left-item').dispatchEvent(new Event("click"));
                        }

                        if (e.isComposing || e.code === "ArrowRight") {
                            document.querySelector('.arrows.right-item').dispatchEvent(new Event("click"));
                        }
                    })

                    prevImgSlide(); NextImgSlide();
                    document.querySelector('body').style.overflowY = "hidden";

                })
            }


            async function prevImgSlide() {
                const leftArrow = document.querySelector('.arrows.left-item');
                const RightArrow = document.querySelector('.arrows.right-item');
                const fullSizegallery = document.querySelector('.fullSizegallery');


                leftArrow.addEventListener('click', function () {
                    CurrIndex--;

                    if (!CurrIndex === allimgs.length <= 1) {
                        RightArrow.classList.remove('hide');
                    }

                    if (CurrIndex === 0) { leftArrow.classList.add('hide'); }

                    if (CurrIndex <= -1) {
                        CurrIndex = 0;
                        return;
                    }

                    fullSizegallery.src = allimgs[CurrIndex].src;
                })
            }


            async function NextImgSlide() {
                const RightArrow = document.querySelector('.arrows.right-item');
                const leftArrow = document.querySelector('.arrows.left-item');
                const fullSizegallery = document.querySelector('.fullSizegallery');


                RightArrow.addEventListener('click', function () {
                    CurrIndex++;

                    if (CurrIndex > 0) {
                        leftArrow.classList.remove('hide');
                    }

                    CurrIndex >= allimgs.length - 1 ? RightArrow.classList.add('hide') : RightArrow.classList.remove('hide');

                    if (CurrIndex >= allimgs.length) {
                        CurrIndex = allimgs.length - 1;
                        return;
                    }

                    fullSizegallery.src = allimgs[CurrIndex].src;
                })
            }



        });

}

