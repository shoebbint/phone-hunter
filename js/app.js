// search-button-function
const phoneSearch = () => {

    let searchText = document.getElementById("search-field").value;
    //search api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.status, data.data))
    document.getElementById("search-field").value = "";
}
const showPhones = (apiData, phones) => {

    if (apiData == true) {

        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = "";
        phones.forEach(phone => {

            console.log(phone);

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card " style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${phone.phone_name}</h5>
            <p class="card-text text-center">Brand:${phone.brand}</p>
            <div class="text-center">
            <a href="#" onclick="seeDetails('${phone.slug}')" id="details-btn" class="btn btn-primary mx-auto">See Details</a>
            </div>
            </div>
        </div>`
            searchResult.appendChild(div);
        });
    }
    else {
        const noResultDiv = document.getElementById('no-result');
        noResultDiv.style.display = "block";
    }

}

const seeDetails = (id) => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))

    const showDetails = (details) => {
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.innerHTML = "";
        console.log(details)

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100 w-50 mx-auto">
            <img class="mx-auto" src="${details.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${details.name}</h5>
            <p class="card-text text-center">${details.releaseDate}</p>
            </div>
            <div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">Storage: ${details.mainFeatures.storage}</li>
            <li class="list-group-item text-center">Display: ${details.mainFeatures.displaySize}</li>
            <li class="list-group-item text-center">Chip: ${details.mainFeatures.chipSet}</li>
            </ul>
            </div>
            <div class="card-footer">
            <small class="text-muted">${details.releaseDate}</small>
            </div>
        </div>`
        phoneDetails.appendChild(div);

    }
}