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
            const mealsContainer = document.getElementById('results-grid');

            mealsContainer.innerHTML = '';
            const input = document.getElementById('search-input').value = '';
            displayMeal(meal);
        }

    } catch (error) {
        console.error('Errore durante la fetch: ',error);
    }
}

document.getElementById('search-input').addEventListener('input', async function () {
    const input = document.getElementById('search-input').value;
    const mealsContainer = document.getElementById('results-grid');
    if (input) {
        const url = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${apiKey}&type=public&q=${input}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                mealsContainer.innerHTML = '';
                for (let i = 0; i < data.hits.length; i++) {
                    displayMeal(data.hits[i].recipe);
                }
            } else {
                console.error('Errore nella fetch: ', data);
            }
        } catch (error) {
            console.error('Errore durante la fetch: ', error);
        }
    }
});

function displayMeal(meal) {
    const mealsContainer = document.getElementById('results-grid');
    const mealElement = document.createElement('div');
    mealElement.setAttribute('class', 'meal-element');

    mealElement.innerHTML = `
        <div class="meal-header">
            <h2 class="meal-title">${meal.label}</h2>
        </div>
        <div class="meal-main">
            <img src="${meal.image}" alt="${meal.label}" class="meal-img" />
        </div>
        <div class="meal-footer">
            <div class="calories-section">
                <p><strong>Kcal/100g:</strong><br> ${Math.round((meal.calories / meal.totalWeight) * 100)} kcal</p>
            </div>
            <div class="button-section">
                <a href="${meal.url}" target="_blank" class="meal-url">></a>
            </div>
        </div>
        `;


    mealsContainer.appendChild(mealElement);
  }


