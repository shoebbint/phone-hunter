// search-button-function
const phoneSearch = () => {
    // validation
    document.getElementById('phone-details').innerHTML = "";

    let searchText = document.getElementById("search-field").value;
    //search api 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.status, data.data))
}
const showPhones = (apiData, phoneResults) => {
    document.getElementById("search-field").value = "";
    // showing search result
    const searchResult = document.getElementById('search-result');
    const noResultDiv = document.getElementById('no-result');
    const phones = phoneResults.slice(0, 20);
    // result validation
    if (apiData == true) {
        noResultDiv.style.display = "none";
        searchResult.innerHTML = "";
        phones.forEach(phone => {
            // dynamically creating div
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card border-0" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top " alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${phone.phone_name}</h5>
            <p class="card-text text-center">Brand:${phone.brand}</p>
            <div class="text-center">
            <a href="#" onclick="seeDetails('${phone.slug}')" id="details-btn" class="btn btn-outline-warning mx-auto">See Details</a>
            </div>
            </div>
        </div>`
            searchResult.appendChild(div);
        });
    }
    else {
        searchResult.innerHTML = "";
        noResultDiv.style.display = "block";
    }

}
// show details api
const seeDetails = (id) => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
// showing details function
const showDetails = (details) => {
    const phoneDetails = document.getElementById('phone-details');
    // validation
    phoneDetails.innerHTML = "";

    // dynamically creating div
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="card h-100 w-50 mx-auto">
                <img class="mx-auto" src="${details.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                <h5 class="card-title text-center">${details.name}</h5>
                <p class="card-text text-center">Release Date: ${details.releaseDate ? details.releaseDate : "Not Found"}</p>
                </div>
                <div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item text-center">Storage: ${details.mainFeatures.storage}</li>
                <li class="list-group-item text-center">Display: ${details.mainFeatures.displaySize}</li>
                <li class="list-group-item text-center">Chip: ${details.mainFeatures.chipSet}</li>
                <li class="list-group-item text-center">Sensors: ${details.mainFeatures.sensors}</li>
                <li class="list-group-item text-center"><b>Others info:</b> <br> 
                <b>Bluetooth:</b>${details.others ? details.others.Bluetooth : "Not Found"} <br>
                <b>GPS :</b> ${details.others ? details.others.GPS : "Not Found"} <br>
                <b>NFC :</b> ${details.others ? details.others.NFC : "Not Found"} <br>
                <b>Radio :</b>  ${details.others ? details.others.Radio : "Not Found"} <br>
                <b>USB :</b> ${details.others ? details.others.USB : "Not Found"} <br>
                <b>WLAN :</b> ${details.others ? details.others.WLAN : "Not Found"} <br>
                   
                    </li>
                </ul>
                </div>
            </div>`
    phoneDetails.appendChild(div);

}
