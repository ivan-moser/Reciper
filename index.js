const apiKey = '9dbb6a18519af2cebb214bb6158a553a';
const appID = '6c321b00';
const baseUrl = 'https://api.edamam.com/api/recipes/v2';

const randomMeal = async function() {
    //restituisce un oggetto contenente un array di 20 "hits"
    const url = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${apiKey}&type=public&q=random`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const randomIndex = Math.floor(Math.random() * data.hits.length);
            const meal = data.hits[randomIndex].recipe;
            displayMeal(meal);
        }

    } catch (error) {
        console.error('Errore durante la fetch: ',error);
    }
}

function displayMeal(meal) {
    const mealContainer = document.getElementById('results-container');
    mealContainer.innerHTML = `
      <h2>${meal.label}</h2>
      <img src="${meal.image}" alt="${meal.label}" />
      <p><strong>Categorie:</strong> ${meal.dishType.join(', ')}</p>
      <p><strong>Calorie:</strong> ${Math.round(meal.calories)} kcal</p>
      <a href="${meal.url}" target="_blank">Vedi ricetta completa</a>
    `;
  }

randomMeal();
