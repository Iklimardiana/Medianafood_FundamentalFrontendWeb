
    const renderMeals = (meals) => {
        const mealListElement = document.querySelector('.Meal-list');
        mealListElement.innerHTML = '';
        meals.forEach(meal => {
          const mealElement = document.createElement('div');
          mealElement.classList.add('Meal-item');
          mealElement.innerHTML = `
            <div class="Meal-thumbnail">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="Meal-info">
              <h4>${meal.strMeal}</h4>
            </div>
          `;
          mealListElement.appendChild(mealElement);
        });
    };

    const getMealsByCategory = (categoryName, event) => {
        event.preventDefault();
        const mealListElement = document.querySelector('.Meal-list');
        mealListElement.innerHTML = '';
        console.log(categoryName);
        fetch(`${baseUrl}/filter.php?c=${categoryName}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.meals) {
                    renderMeals(responseJson.meals);
                } else {
                    showResponseMessage(`No meals found for category "${categoryName}"`);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            });
    };

    const showAllFoodsButton = document.querySelectorAll('.Food-category button');
    showAllFoodsButton.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryName = event.target.parentNode.getAttribute('href').split('=')[1];
            event.preventDefault();
            getMealsByCategory(categoryName);
        });
    });

    
        // const categoryButtons = document.querySelector('.category-buttons');
        // foods.forEach((category) => {
        // const button = document.createElement('button');
        // button.textContent = category.strCategory;
        // button.setAttribute('data-kategori', category.strCategory);
        // button.addEventListener('click', (event) => {
        //     const category = event.target.getAttribute('data-kategori');
        //     getFoodsByCategory(category);
        // });
        // categoryButtons.appendChild(button);
        // });

    // const showFoodByCategory = document.querySelectorAll('.Food-category button');
    // showFoodByCategory.forEach((button) => {
    //     button.addEventListener('click', (event) => {
    //       const categoryName = event.target.getAttribute('data-kategori');
    //       event.preventDefault();
    //       getFoodsByCategory(categoryName);
    //     });
    // });