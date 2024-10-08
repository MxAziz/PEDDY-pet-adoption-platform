
//(3) Fetch All Pet Categories
const loadPetCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPetCategories(data.categories))
        .catch(error => console.log(error));

}

// (1) load all pets
const loadAllPets = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error));
}

// (1)display
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    pets.forEach(item  => {
        const card = document.createElement('div')
        card.classList = "card card-compact ";
        card.innerHTML = `
        <figure>
            <img
            src=${item.image}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        petsContainer.append(card);
    });
}

// (3)display
const displayPetCategories = (categories) => {
    const petBtnContainer = document.getElementById('categories')
    categories.forEach(item  => {
        const button = document.createElement('button');
        button.classList = "btn btn-lg space-x-2 font-bold border-2 bg-white ";
        button.innerHTML = `
            <img src=${item.category_icon}>
            <p>${item.category}</p>

        `
        petBtnContainer.append(button);

    });

}




loadPetCategories();
loadAllPets();