import { layoutRender } from "../script.js";
import { detailpopup } from "./detailpopup.js";	

import { ApiKey } from "../info.js";
import { baseUrl } from "../info.js";
import { apiVersion } from "../info.js";

export function Search() {

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
            document.querySelector('#searchResult').style.display = 'block';


            layoutRender(`${searchApi}`, "searchResult", "Search Result");
             setTimeout(() => {
                detailpopup();
            }, 1000);

            document.querySelector('#photoGallery').innerHTML = "";
            document.querySelector('#videoGallery').innerHTML = "";
            document.querySelector('#innerDetailpage').innerHTML = "";
        }
    });




} Search();

document.querySelector('.popSearchInp').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
    document.querySelector('.filterbtn').dispatchEvent(new Event("click"));
    }
})
