
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
        // .then(data => {
        //     const loader = document.getElementById('loader');
        //     loader.classList.remove('hidden');

        //     setTimeout(() => {
        //         loader.classList.add('hidden');
        //         displayAllPets(data.pets);
        //     }, 2000);
        // } )
        // .catch(error => {
        //     console.log(error)
        //     loader.classList.add('hidden');
        // });
}

// (1)display
const displayAllPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = "";
    if (pets.length === 0) {
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
        <div class="flex flex-col gap-5 justify-center items-center text-center bg-[#13131308] p-16 rounded-2xl">
            <img src="./assets/error.webp">
            <h3 class="text-3xl font-bold">No Information Available</h3>
            <p class="">"Peddy" is a pet adoption platform where there are currently no available birds for adoption in this <br> category. However, new information about adoptable birds will be added soon. Stay tuned for updates!</p>
        </div>
        `;
        return;
    } else {
        petsContainer.classList.add('grid');
    }

    pets.forEach(item => {
        console.log(item);

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
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=3795dYcdKYUp&format=png"> Breed: ${breed ? breed : "Not Available"}</p>
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=20095&format=png"> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
            <p class="flex items-center" ><img class="size-5" src="https://img.icons8.com/?size=64&id=16271&format=png"> Gender: ${gender ? gender : "Not Available"}</p>
            <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=85782&format=png"> Price: ${price ? price : "Not Available"}</p>
            <p class="divider mt-1"></p>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button class="btn bg-white border border-[#0E7A81]"><img class="size-5" src="https://img.icons8.com/?size=48&id=82788&format=png"></button>
                <button class="btn bg-white border border-[#0E7A81] text-[#0E7A81] hover:bg-[#1a6a70] hover:text-white">Adopt</button>

                <button onclick="loadDetails(${item.petId})" class="btn bg-white border border-[#0E7A81] text-[#0E7A81] hover:bg-[#1a6a70] hover:text-white">Details</button>
            </div>

        </div>
        `
        petsContainer.append(card);
    });
}

const loadDetails =async (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData)
}


const displayDetails = (petsData) => {
    const { breed, date_of_birth, gender, image, pet_details, price, pet_name,vaccinated_status } = petsData;
    console.log(pet_name)
    const modal = document.getElementById('modal-content');
    modal.innerHTML = `
    <img class="w-full" src="${image}" >
    <h3 class="text-2xl font-bold mt-3">${pet_name}</h3>
    <div class="grid grid-cols-2" >
        <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=3795dYcdKYUp&format=png"> Breed: ${breed ? breed : "Not Available"}</p>
        <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=20095&format=png"> Birth: ${date_of_birth ? date_of_birth : "Not Available"}</p>
        <p class="flex items-center" ><img class="size-5" src="https://img.icons8.com/?size=64&id=16271&format=png"> Gender: ${gender ? gender : "Not Available"}</p>
        <p class="flex items-center"><img class="size-4" src="https://img.icons8.com/?size=48&id=85782&format=png"> Price: ${price ? price : "Not Available"}</p>
        <p class="flex items-center" ><img class="size-5" src="https://img.icons8.com/?size=64&id=16271&format=png"> vaccinated status: ${vaccinated_status ? vaccinated_status : "Not Available"}</p>
    </div>

    <p class="divider mt-1"></p>

    <h3 class="text-xl font-semibold">Details Information</h3>
    <p>${pet_details}</p>
    `

    document.getElementById('modal').showModal();
}




// remove all active btn class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons)
    for (const btn of buttons) {
        btn.classList.remove("active");
    }
}

// (4) load pets by category
const loadCategoryPets = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // remove all active class
            removeActiveClass();
            // active class added by id
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active")

            displayAllPets(data.data)
        })
        .catch(error => console.log(error));
}


// (3)display
const displayPetCategories = (categories) => {
    const petBtnContainer = document.getElementById('categories')
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');

        buttonContainer.innerHTML = `
        <button onclick="loadCategoryPets('${item.category}')" id="btn-${item.category}" class="category-btn btn btn-lg rounded-xl space-x-2 font-bold border-2 bg-white w-full">
        <img class="size-6 md:size-7" src=${item.category_icon}>
        <p>${item.category}</p>
        </button>
        `;

        petBtnContainer.append(buttonContainer);

    });
}



// ---------------------------------------------------------------
// const loadCategoryPet = (id) => {
//     console.log(id)
//     const loader = document.getElementById('loader');
//     loader.classList.remove('hidden');

//     setTimeout(() => {


//         displayAllPets();

//     }, 2000);
// };

// --------------------------------------

loadPetCategories();
loadAllPets();