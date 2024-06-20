import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";


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
    galleryWrap.classList.add('galleryWrap');
    photoSection.appendChild(galleryWrap);

    const imgTabsButtons = document.querySelectorAll('.imgTabs > button');
    imgTabsButtons.forEach((button) => {
        button.addEventListener('click', () =>{
            imgTabsButtons.forEach((button) => {
                button.classList.remove('active');
            });  
            button.classList.add('active');
            galleryWrap.innerHTML = '';
            galleryContent();
        });
    });
    
};

export async function galleryContent(){
    await fetch(`${baseUrl}/${apiVersion}/${currmediatype}/${currcontentid}/images?api_key=${ApiKey}`)
    .then((response) => response.json())
    .then((data) => {

        const activegalleryTab = document.querySelector('.imgTabs > button.active').getAttribute('data-image-gallery');
           
        if(activegalleryTab == 'logos'){
                defaultgallery = data.logos;
            }else if(activegalleryTab == 'posters'){
                defaultgallery = data.posters;
            }else if(activegalleryTab == 'backdrops') {
                defaultgallery = data.backdrops;
            }

        for (let i = 0; i < defaultgallery?.length; i++) {

            let imageUrl = defaultgallery[i]?.file_path;
            const galleryDiv = document.querySelector('.galleryWrap');
            galleryDiv.innerHTML += `<img src="https://media.themoviedb.org/t/p/w500_and_h282_face/${imageUrl}" loading="lazy">`
        }

        const galleryImgs = document.querySelectorAll(".galleryWrap img");
        for (let j = 0; j < galleryImgs.length; j++) {
            galleryImgs[j].addEventListener("error", function () {
                galleryImgs[j].setAttribute("src", "images/not-found-image.png");
            });
        }

    });

}