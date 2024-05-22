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
    advFilters.parentElement.classList.add("hide");
}); 



export function Search() {

    const advFilters = document.querySelector('.advFilters');

    document.querySelector('.filterSearch').addEventListener('click', function () {
        advFilters.parentElement.classList.remove("hide");
        console.log();
    });


    const ReleaseSelect = document.querySelector('.ReleaseSelect');
    const Currentyear = new Date().getFullYear();
    for (let i = 1980; i < Currentyear + 1; i++) {
        ReleaseSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    document.querySelector('.filterbtn').addEventListener('click', () => {
        const SearchInputValue = document.querySelector('.popSearchInp').value;
        const selectCategory = document.querySelector('select[name="Category"]').value;
        const selectAdult = document.querySelector('select[name="Adult"]').value;
        const selectRelease = document.querySelector('.ReleaseSelect').value;

        console.log(SearchInputValue, selectCategory, selectAdult, selectRelease);
    });


} Search();