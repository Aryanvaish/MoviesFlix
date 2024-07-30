import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";

import { popupClose } from "../script.js"

var currmediatype;
var currcontentid;

export async function videoGallery(currMedia, contentId) {
    // Trailer, Teaser, Featurette, Behind the Scenes, Clip, Opening Credits

    currmediatype = currMedia;
    currcontentid = contentId;

    const videoSection = document.querySelector('#videoGallery');
    videoSection.innerHTML = `<div class='videoTabs'>
                                <strong>Video Gallery :</strong>
                                <button class="active" data-video-gallery="trailer">Trailers</button>
                                <button class="" data-video-gallery="teaser">Teasers</button>
                                <button class="" data-video-gallery="Clip">Clips</button>
                                <button class="" data-video-gallery="featurette">Featurettes</button>
                                <button class="" data-video-gallery="Behind the Scenes">Behind the Scenes</button>
                                <button class="" data-video-gallery="opening credits">Opening Credits</button>
                          </div>`

    const galleryWrap = document.createElement('div')
    galleryWrap.classList.add('galleryWrap', 'videoWrap');
    videoSection.appendChild(galleryWrap);

    const videoTabsButtons = document.querySelectorAll('.videoTabs > button');
    videoTabsButtons.forEach((button) => {
        button.addEventListener('click', () => {
            videoTabsButtons.forEach((button) => {
                button.classList.remove('active');
            });
            button.classList.add('active');
            galleryWrap.innerHTML = '';
            videogalleryContent();
        });
    });
}

export async function videogalleryContent() {

    const activeVideo = document.querySelector('.videoTabs .active').getAttribute('data-video-gallery');

    await fetch(`${baseUrl}/${apiVersion}/${currmediatype}/${currcontentid}/videos?api_key=${ApiKey}`)
        .then((response) => response.json())
        .then((videodata) => {
            // console.log(videodata);

            const galleryDiv = document.querySelector('.galleryWrap.videoWrap');

            // Error handling --------------------------

            if (videodata.results.length == 0) {
                galleryDiv.innerHTML = `<strong class="novideo">Not Available !!!</strong>`
            }

            // -----------------------------------------

            for (let i = 0; i < videodata.results.length; i++) {
                if(videodata.results[i].type.toLowerCase() == activeVideo){
                    galleryDiv.innerHTML += `<div data-video-type="${videodata.results[i].type}" ><img src="https://img.youtube.com/vi/${videodata.results[i].key}/maxresdefault.jpg" data-yt-key="${videodata.results[i].key}"></div>`
                }
            }

            if(galleryDiv.querySelectorAll('div').length === 0){
                galleryDiv.innerHTML = `<strong class="novideo">Coming Soon !!!</strong>`
            }

            const galleryIframes = document.querySelectorAll('.galleryWrap > div');
            for (let z = 0; z < galleryIframes.length; z++) {

                galleryIframes[z].querySelector('img').addEventListener('click', () => {
                    const popup_Warp = document.getElementById('popup_Warp');

                    popup_Warp.innerHTML = `
                        <div class="ytFrameBody">
                            <iframe src="https://www.youtube.com/embed/${galleryIframes[z].querySelector('img').getAttribute('data-yt-key')}?autoplay=1&mute=1" allow="autoplay" frameborder="0" allowfullscreen width="100%" height="100%" class="ytframe"></iframe>
                            <img src="images/searchClose.png" alt="CloseIcon" class="playerClose">
                        </div>  
                    `;

                    popup_Warp.classList.remove('hide');
                    document.querySelector('.playerClose').addEventListener('click', () => {
                        popupClose();
                    });
                });
            }


        });

}