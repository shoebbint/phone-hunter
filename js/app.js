const phoneSearch = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data))
}
const showPhones = (phones) => {
    const searchResult = document.getElementById('search-result');
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
            <a href="#" class="btn btn-primary mx-auto">Details</a>
            </div>
        </div>`
        searchResult.appendChild(div);
    });



}

