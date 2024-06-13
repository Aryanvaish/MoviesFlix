import { contentDetail } from './components/detailpopup.js';

window.addEventListener("scroll", function () {
    const navbar = document.querySelector("#navBar");
    if (window.scrollY > 40) {
        navbar.classList.add("fixed");
    } else {
        navbar.classList.remove("fixed");
    }
});

var genres = {};

function fetchGenreData(URL) {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.genres.length; i++) {
                genres[data.genres[i].id] = data.genres[i].name;
            }
        });
}

fetchGenreData(`https://api.themoviedb.org/3/genre/movie/list?api_key=e6e82b1d384c0712afd3d57364994f60`);
fetchGenreData(`https://api.themoviedb.org/3/genre/tv/list?api_key=e6e82b1d384c0712afd3d57364994f60`);


export async function layoutRender(API_URL, parentDiv, secTitle) {
    const mainBox = document.querySelector(`.${parentDiv}`);

    mainBox.innerHTML = `<div class="titlePage">
                    <h2>${secTitle}</h2>
                    <div class="pages">
                    <svg width="18px" class="prevPage prev-${parentDiv}"  height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="prev" transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"> <polygon class="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon> <polygon class="arrow-fixed" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon> <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path></g> </svg>
                    <strong class="currPage curr-${parentDiv}">1</strong>
                    <svg class="nextPage next-${parentDiv}" data-actionPage=" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon><polygon class="arrow-fixed" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon><path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path></g></svg>
                    </div>
                    </div>
                    <ul></ul>
    `;

    await UrlCreate(API_URL, parentDiv, 1);

    const totalPages = document.querySelector(`.${parentDiv}`).getAttribute('data-total-pages');
    const listWrap = document.querySelector(`.${parentDiv} ul`);
    const currPage = document.querySelector(`.curr-${parentDiv}`);
    const prevPage = document.querySelector(`.prev-${parentDiv}`);
    const nextPage = document.querySelector(`.next-${parentDiv}`);

    prevPage.addEventListener("click", async function () {
        if (currPage.textContent == 1) {
            return
        }
        listWrap.innerHTML = "";
        currPage.textContent--;
        await UrlCreate(API_URL, parentDiv, currPage.textContent);
    });

    nextPage.addEventListener("click", async function () {
        if (currPage.textContent == totalPages) {
            return
        }
        listWrap.innerHTML = "";
        currPage.textContent++;
        await UrlCreate(API_URL, parentDiv, currPage.textContent);
    });

}


export async function UrlCreate(pageurl, parentDiv, page) {
    await fetch(`${pageurl}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {


            if (data.results?.length === 0) {
                document.querySelector('.searchResult ul').innerHTML = `<div class="notFound">Not Found, Please Try Agian !!!</div>`
            }

            // Total Pages of URLS  

            let total_pages = data.total_pages;
            const parentWrapper = document.querySelector(`.${parentDiv}`);
            parentWrapper.setAttribute('data-total-pages', total_pages);

            // End ;

            const listWrap = document.querySelector(`.${parentDiv} ul`);
            for (let i = 0; i < data.results?.length; i++) {
                let poster = data.results[i].poster_path;
                let title = data.results[i].title || data.results[i].name || 'Title Not Found';
                let genreKey = data.results[i].genre_ids;
                let releDate = data.results[i].release_date || data.results[i].first_air_date;
                let voteRating = data.results[i].vote_average?.toString().substring(0, 3);
                let rating = data.results[i].vote_average?.toString().substring(0, 3);
                let contentId = data.results[i].id;

                // console.log(data);

                var genretags = "";

                for (let j = 0; j < genreKey?.length; j++) {
                    genretags += `${genres[genreKey[j]]} ${j !== (genreKey.length - 1) ? '/' : ''} `;
                }

                // console.log(genretags);

                const ratingStat = parseInt(rating);
                var ratingBg = "";

                if (ratingStat >= 8) {
                    ratingBg = "green";
                } else if (ratingStat == 7 || ratingStat == 6 || ratingStat == 5) {
                    ratingBg = "yellow";
                } else {
                    ratingBg = "red";
                }


                if (ratingStat == 0) { rating = "Upcoming"; }

                listWrap.innerHTML += `   
                    <li class="cont_boxes">
                    <strong class="rating ${ratingBg}">${rating}</strong>  
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster}" class="poster" alt="Poster">
                    <div class="mainTitle" data-content-id="${contentId}"><strong>${title}</strong><span>${releDate?.substring(0, 4) ? `(${releDate?.substring(0, 4)})` : ''}</span></div>
                    <h3 class="genre">${genretags}</h3>
                    </li>
                    `;

            }


            const moviePoster = document.querySelectorAll(".poster");
            for (let j = 0; j < moviePoster.length; j++) {
                moviePoster[j].addEventListener("error", function () {
                    moviePoster[j].setAttribute("src", "images/error.jpg");
                });
            }


        })

}



layoutRender(`https://api.themoviedb.org/3/trending/all/day?api_key=e6e82b1d384c0712afd3d57364994f60`, "trending", "Trending")
    .then(() => layoutRender(`https://api.themoviedb.org/3/trending/movie/day?api_key=e6e82b1d384c0712afd3d57364994f60`, "trendingMovie", "Trending Movie"))
    .then(() => layoutRender(`https://api.themoviedb.org/3/trending/tv/day?api_key=e6e82b1d384c0712afd3d57364994f60`, "trendingTv", "Trending Series"))
    .then(() => layoutRender(`https://api.themoviedb.org/3/movie/top_rated?api_key=e6e82b1d384c0712afd3d57364994f60`, "toplistedMovies", "Top Listed Movies"))
    .then(() => layoutRender(`https://api.themoviedb.org/3/tv/top_rated?api_key=e6e82b1d384c0712afd3d57364994f60`, "toplistedSeries", "Top Listed Series"))
    .then(() => contentDetail());



