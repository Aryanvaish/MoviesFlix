import { layoutRender } from "../script.js";

import { ApiKey } from "../script.js"
import { baseUrl } from "../script.js";
import { apiVersion } from "../script.js";

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
            searchApi = `${baseUrl}/${apiVersion}/search/${selectCategory}?api_key=${ApiKey}&query=${SearchInputValue}`;
            document.querySelector('#mainWrap').style.display = "none";

            layoutRender(`${searchApi}`, "searchResult", "Search Result");
        }

    });


} Search();

document.querySelector('.popSearchInp').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
    document.querySelector('.filterbtn').dispatchEvent(new Event("click"));
    }
})
