const apiKey = '9dbb6a18519af2cebb214bb6158a553a';
const appID = '6c321b00';
const baseUrl = 'https://api.edamam.com/api/recipes/v2';



// Function to fetch 3 random meals form Edamam API

const randomMeal = async function() {
    const ingredients = ['chicken', 'pasta', 'salad', 'vegan', 'dessert', 'fish'];
    const mealsContainer = document.getElementById('results-grid');

    mealsContainer.innerHTML = '';
    document.getElementById('search-input').value = '';

    for (let i = 0; i < 3; i++) {
        const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        const url = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${apiKey}&type=public&q=${randomIngredient}`;
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
    document.getElementById('load-more').style.display = 'block';
}

// Function to fetch the results of a user search form Edamam API

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

                if (data.hits.length > 18) {
                    for (let i = 0; i < 18; i++) {
                        displayMeal(data.hits[i].recipe);
                    }
                } else {
                    for (let i = 0; i < data.hits.length; i++) {
                        displayMeal(data.hits[i].recipe);
                    }
                }
                
            } else {
                console.error('Errore nella fetch: ', data);
            }
        } catch (error) {
            console.error('Errore durante la fetch: ', error);
        }
    }
    document.getElementById('load-more').style.display = 'none';
});

// Function to load 3 more random meals

document.getElementById('load-more').addEventListener('click', async function() {
    const ingredients = ['chicken', 'pasta', 'salad', 'vegan', 'dessert', 'fish'];
    const mealsContainer = document.getElementById('results-grid');

    document.getElementById('search-input').value = '';

    for (let i = 0; i < 3; i++) {
        const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
        const url = `https://api.edamam.com/api/recipes/v2?app_id=${appID}&app_key=${apiKey}&type=public&q=${randomIngredient}`;
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
});

// Function to display the results

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


