import { layoutRender } from "../script.js";
import { detailpopup } from "./detailpopup.js";	

export function Search() {

    const advFilters = document.querySelector('.advFilters');

    document.querySelector('.filterbtn').addEventListener('click', () => {
        const SearchInputValue = document.querySelector('.popSearchInp').value.replace(/\s+/g, "-").toLowerCase();
        const selectCategory = document.querySelector('select[name="Category"]').value;

        var searchApi;

        const invalidText = document.querySelector('.invalidText');
        if (SearchInputValue === "" || SearchInputValue === "-") {
            console.log("Please enter a movie");
            invalidText.style.display = "flex";
        } else{
            invalidText.style.display = "none";
            searchApi = `https://api.themoviedb.org/3/search/${selectCategory}?api_key=e6e82b1d384c0712afd3d57364994f60&query=${SearchInputValue}`;
            document.querySelector('#mainWrap').style.display = "none";

            layoutRender(`${searchApi}`, "searchResult", "Search Result");
            setTimeout(() => { detailpopup(); }, 100);
        }

    });




} Search();

document.querySelector('.popSearchInp').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
    document.querySelector('.filterbtn').dispatchEvent(new Event("click"));
    }
})
