
//(3) Fetch All Pet Categories
const loadPetCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPetCategories(data.categories))
        .catch(error => console.log(error));

}

const displayPetCategories = (categories) => {
    const petBtnContainer = document.getElementById('categories')
    categories.forEach(item  => {
        console.log(item);
        const button = document.createElement('button');
        button.classList = "btn btn-lg";
        button.innerHTML = `
            <img src="item.category_icon">

        `
        petBtnContainer.append(button);

    });

}




loadPetCategories();