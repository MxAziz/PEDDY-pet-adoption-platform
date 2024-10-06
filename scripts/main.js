
//(3) Fetch All Pet Categories
const loadPetCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPetCategories(data))
        .catch(error => console.log(error));

}

const displayPetCategories = (data) => {
    console.log(data);

}




loadPetCategories();