
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
    pets.forEach(item => {
        const {breed, date_of_birth, gender, price } = item;
        const card = document.createElement('div')
        card.classList = "card card-compact border-2 p-5";
        card.innerHTML = `
        <figure class="h-[150px]">
            <img
            src=${item.image}
            class="h-full w-full object-cover" />
        </figure>
        <div class="px-0 py-2">
            <h2 class="card-title font-bold">${item.pet_name}</h2>
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=3795dYcdKYUp&format=png"> Breed: ${breed}</p>
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=20095&format=png"> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
            <p class="flex items-center" ><img class="size-5" src="https://img.icons8.com/?size=64&id=16271&format=png"> Gender: ${gender}</p>
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=85782&format=png"> Price: ${price}</p>
            <p class="divider mt-1"></p>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button class="btn bg-white border border-[#0E7A81]"><img class="size-5" src="https://img.icons8.com/?size=48&id=82788&format=png"></button>
                <button class="btn bg-white border border-[#0E7A81] text-[#0E7A81] hover:bg-[#1a6a70] hover:text-white">Adopt</button>
                <button class="btn bg-white border border-[#0E7A81] text-[#0E7A81] hover:bg-[#1a6a70] hover:text-white">Details</button>
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
        button.classList = "btn btn-lg rounded-xl space-x-2 font-bold border-2 bg-white ";
        button.innerHTML = `
            <img class="size-6 md:size-7" src=${item.category_icon}>
            <p>${item.category}</p>

        `
        petBtnContainer.append(button);

    });

}




loadPetCategories();
loadAllPets();