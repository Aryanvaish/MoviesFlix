const popup_Warp = document.getElementById('popup_Warp');

let active_Id;

function onloadSlugCheck() {
    active_Id = window.location.href?.split('?')[1]?.split('&')[0];

    // console.log(active_Id);

    if (active_Id === undefined) {
        console.log("No Result Found");
    } else {
        history.pushState({}, null, `?${active_Id}`);
        contentDetail();
    }

} onloadSlugCheck();



function innerPageCreation() {

    fetch(`https://api.themoviedb.org/3/movie/85937?api_key=e6e82b1d384c0712afd3d57364994f60`)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);

            // const media = this.parentElement.parentElement.getAttribute("data-media-type");
            console.log(this);            // let currMedia;

            // if(media == "tv"){
            //     currMedia = "tv";
            // }else if(media == "movie"){
            //     currMedia = "movie";
            // }else if(media == "multi"){
            //     currMedia = this.querySelector('.hiddenInfo > p.mediaType').textContent;
            // }
    })



}innerPageCreation();




export function contentDetail() {

    const content_Boxes = document.querySelectorAll('.cont_boxes');
    for (let i = 0; i < content_Boxes.length; i++) {


        content_Boxes[i].addEventListener("click", function () {
            console.log(this);
            console.log(this.querySelector('.mainTitle').getAttribute("data-content-id"));
            // console.log(active_query);


            // popup_Warp.innerHTML = `
            // <div class="mainPop">
            //     <a href="javascript:void(0)" class="videoLink" data-yt-key="">
            //         <img src="" class="popImg" alt="Movie Img">
            //     </a>
            //     <div class="movieContent">
            //         <div class="title">
            //             <h2></h2>
            //             <img class="adultContext" src="" title=""  alt="rated" >
            //         </div>
            //     <p class="releaseDate"></p>
            //     <strong class="genres"></strong>
            //     <p class="overview_context"></p>
            //     <h3 class="rating"></h3>
            //     </div>
            //     <img src="images/searchClose.png" alt="crossIcon" class="closeForm">
            // </div>`;


            // document.querySelector('.mainPop > a > img.popImg').src = this.querySelector('.poster').src;
            // document.querySelector('.mainPop .title > h2').textContent = this.querySelector('.mainTitle > strong').textContent;
            // document.querySelector('.mainPop p.releaseDate').innerHTML = `Release Date : <span>${this.querySelector('.hiddenInfo .releDate').textContent} </span>`;
            // document.querySelector('.mainPop strong.genres').innerHTML = `Genre : ${this.querySelector('.genre').textContent}`;
            // document.querySelector('.mainPop p.overview_context').innerHTML = this.querySelector('.hiddenInfo > .overview').textContent;
            // document.querySelector('.mainPop h3.rating').innerHTML = `Rating : ${this.querySelector('.hiddenInfo .voteRating').textContent}`;




            // const closeForm = document.querySelector('.closeForm');
            //     closeForm.addEventListener("click", function () {
            //         history.back({}, null, ''); 
            // })





            // fetch(`${baseUrl}/${apiVersion}/${currMedia}/${this.querySelector('.hiddenInfo .contentId').textContent}/videos?api_key=${ApiKey}`)
            // .then((response) => response.json())
            // .then((trailerData) => {
            //     for (let i = 0; i < trailerData.results.length; i++) {
            //         if(trailerData.results[i].type == "Trailer"){
            //             document.querySelector('.mainPop .videoLink').setAttribute("data-yt-key", trailerData.results[i].key);
            //         }
            //     }
            // });


            // document.querySelector('.mainPop > a.videoLink').addEventListener('click', function(){

            // const ytKey = document.querySelector('.mainPop .videoLink').getAttribute("data-yt-key");

            //  popup_Warp.innerHTML = `
            //  <div class="ytFrameBody">
            //       <iframe src="https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1" allow="autoplay" frameborder="0" allowfullscreen width="100%" height="100%" class="ytframe"></iframe>
            //       <img src="images/searchClose.png" alt="CloseIcon" class="playerClose">
            //  </div>  
            //  `; 

            // });


            // const ratedOrnot = this.querySelector('.hiddenInfo .adultScheme').textContent;
            // if (ratedOrnot == 'false') {
            //     document.querySelector('.mainPop img.adultContext').src = 'images/tick.png';
            //     document.querySelector('.mainPop img.adultContext').title = 'Family Friendly 😄';
            //     document.querySelector('.mainPop img.adultContext').classList.add('underRated');
            // } else {
            //     document.querySelector('.mainPop img.adultContext').src = 'images/rated.png'
            //     document.querySelector('.mainPop img.adultContext').title = '18+ Content ☠️';
            //     document.querySelector('.mainPop img.adultContext').classList.add('RatedPlus');
            // }

            // document.querySelector('body').style.overflowY = "hidden";
            // popup_Warp.classList.remove('hide');
        })
    }
}
