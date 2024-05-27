// Search Icon and Search close  ----------------------------


document.querySelector('.searchIcon').addEventListener('click', function () {
    document.querySelector('.searchInp').classList.add('shown');
    this.style.display = "none";
    document.querySelector('.searchClose').style.display = "block";
    document.querySelector('.filterSearch').style.display = "block";
});


document.querySelector('.searchClose').addEventListener('click', function () {
    document.querySelector('.searchInp').classList.toggle('shown');
    this.style.display = "none";
    document.querySelector('.searchIcon').style.display = "block";
    document.querySelector('.filterSearch').style.display = "none";
});

// ----------------------- End ------------------------------



export function Search() {
    document.querySelector('.filterSearch').addEventListener('click', function () {

        popup_Warp.innerHTML = `
        <div class="advFilters">
            <input type="text" class="popSearchInp" placeholder="Search Here...">
            <select name="Category">
                <option value="Category" selected>Category</option>
                <option value="All">All</option>
                <option value="Movie">Movie</option>
                <option value="Series">Series</option>
                <option value="Person">Person</option>
            </select>
            <select name="Adult">
                <option value="Adult" selected>Adult</option>
                <option value="True">Yes</option>
                <option value="False">No</option>
            </select>
            <select name="Release Date" class="ReleaseSelect">
                <option value="Year of release">Year of Release</option>
            </select>
            <button class="filterbtn">Submit Search</button>
            <img src="images/searchClose.png" alt="CloseIcon" class="filterClose">
        </div>`;


        const advFilters = document.querySelector('.advFilters');

        const ReleaseSelect = document.querySelector('.ReleaseSelect');
        const Currentyear = new Date().getFullYear();
        for (let i = 1980; i < Currentyear + 1; i++) {
            ReleaseSelect.innerHTML += `<option value="${i}">${i}</option>`;
        }

        document.querySelector('.filterClose').addEventListener('click', () => {
            advFilters.parentElement.classList.add("hide");
            document.querySelector('body').style.overflowY = "auto";
            popup_Warp.innerHTML = "";
        });

        advFilters.parentElement.classList.remove("hide");
        document.querySelector('body').style.overflowY = "hidden";


        document.querySelector('.filterbtn').addEventListener('click', () => {
            const SearchInputValue = document.querySelector('.popSearchInp').value;
            const selectCategory = document.querySelector('select[name="Category"]').value;
            const selectAdult = document.querySelector('select[name="Adult"]').value;
            const selectRelease = document.querySelector('.ReleaseSelect').value;
    
            console.log(SearchInputValue, selectCategory, selectAdult, selectRelease);
    
            const mainWrap = document.querySelector('.mainWrap');
            // mainWrap.innerHTML = "";
            // layoutRender(`https://api.themoviedb.org/3/search/multi?api_key=e6e82b1d384c0712afd3d57364994f60&query=doctor-who&include_adult=false&language=en-US&page=1`);
            
        });


    });


} Search();