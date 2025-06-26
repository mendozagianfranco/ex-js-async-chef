// In questo esercizio, utilizzerai async / await per creare la funzione getChefBirthday(id).

// Questa funzione accetta un id di una ricetta e deve:

// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef

// Note del docente

// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona(async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch;




async function fetchJSON(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

async function getChefBirthday(id) {
    let recipe;
    try {
        recipe = await fetchJSON(`https://dummyjson.com/recipes/${id}`);
    } catch (error) {
        throw new Error(`Non trovato la ricetta ${id}`);
    }

    if (recipe.message) {
        throw new Error(recipe.message);
    }


    let chef;
    try {
        chef = await fetchJSON(`https://dummyjson.com/users/${recipe.userId}`);

    } catch (error) {
        throw new Error(`Non trovato lo chef ${recipe.userId}`);
    }

    return chef.birthDate;
}

getChefBirthday(2)
    .then(birthday => console.log('Data di nascit dello chef:', dayjs(birthday).format('DD/MM/YYYY')))
    .catch(error => console.error('Error:', error.message));