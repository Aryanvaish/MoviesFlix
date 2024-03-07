window.addEventListener('scroll', function () {
    const navbar = document.querySelector(".nav_Container");
    if (window.scrollY > 40) {
        navbar.classList.add('fixed');
    }
    else {
        navbar.classList.remove('fixed');
    }
})

var genres = {};

var defaultpage = "1";   

fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e6e82b1d384c0712afd3d57364994f60')
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.genres.length; i++) {
            genres[data.genres[i].id] = data.genres[i].name;
        }

});


const trending = document.querySelector('.trending ul');

function Create(){
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=e6e82b1d384c0712afd3d57364994f60&page=${defaultpage}`)
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.results.length; i++) {
            let poster = data.results[i].poster_path;
            let title = data.results[i].title;
            let genreKey = data.results[i].genre_ids;
            let release_date = data.results[i].release_date.substring(0, 4);
            let rating = data.results[i].vote_average.toString().substring(0, 3);

            var genretags = '';

            for (let j = 0; j < genreKey.length; j++) {
                genretags += `${genres[genreKey[j]]} `;
                // console.log(genretags)
            }
            

            const ratingStat = parseInt(rating);
            var ratingBg = '';

            if(ratingStat >= 8){
                ratingBg = "green";
            }else if(ratingStat == 7 || ratingStat == 6 || ratingStat == 5){
                ratingBg = "yellow";
            }else{
                ratingBg = "red";
            } 



            trending.innerHTML +=
                `<li>
              <strong class="rating ${ratingBg}">${rating}</strong>  
              <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster}" class="poster" alt="Poster">
              <div class="mainTitle"><strong>${title}</strong><span>( ${release_date} )</span></div>
              <h3 class="genre">${genretags}</h3>
            </li>`

        }
        
        const moviePoster = document.querySelectorAll('.poster');
        for (let j = 0; j < moviePoster.length; j++) {
            moviePoster[j].addEventListener('error', function(){
                console.log(moviePoster[j]);
                moviePoster[j].setAttribute("src", "images/error.jpg");   
            }) ;                
        } 
    })
}Create();


const prevPage = document.querySelector('.prevPage');
const nextPage = document.querySelector('.nextPage');
const currPage = document.querySelector('.currPage');

currPage.innerHTML = defaultpage;


function currentPage(){
    if(currPage.innerHTML == 1 ){
        prevPage.style.pointerEvents = "none";
    }else if(currPage.innerHTML >= 500){
        prevPage.style.pointerEvents = "all";
        nextPage.style.pointerEvents = "none";
    }else{
        prevPage.style.pointerEvents = "all";
        nextPage.style.pointerEvents = "all";
    }
        
}

currentPage();


nextPage.addEventListener("click", function() {
    trending.innerHTML = "";
    currPage.textContent++;
    defaultpage++;
    Create();
    currentPage();
});


prevPage.addEventListener("click", function() {
    trending.innerHTML = "";
    currPage.textContent--;
    defaultpage--;
    Create();
    currentPage();
});



