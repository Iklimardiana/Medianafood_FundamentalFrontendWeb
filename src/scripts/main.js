'use strict'

import DataSource from './data/data-source.js'

function main() {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
    const FoodCategoryElement = document.querySelector('.Food-category');
    const container = document.querySelector('.container');
    const DetailFoodElement = document.querySelector('.food-detail');
    const searchForm = document.querySelector('.search-form');
    const FoodsOfCategoryElement = document.querySelector('.FoodsOfCategory');
    
    const showResponseMessage = (message = 'Check your internet connection') => {
        FoodCategoryElement.innerHTML = `<p>${message}</p>`;
    };

    const closeDetail = () =>{
      DetailFoodElement.innerHTML = '';
      FoodsOfCategoryElement.style.display = 'block';
    }

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const keyword = document.querySelector('.search-input').value;
      getFoodsByKeyword(keyword);
    });
    

    const renderFoodCategory = (foods) => {

        FoodCategoryElement.innerHTML='';

        foods.forEach((food) => {
          const foodItem = `
            <li>
              <h3 data-kategori="${food.strCategory}">${food.strCategory}</h3>
            </li>
          `;
          FoodCategoryElement.innerHTML += foodItem;
        });
      
        const clickedCategory = document.querySelectorAll('.Food-category h3');
        clickedCategory.forEach((button) => {
          button.addEventListener('click', (event) => {
            const categoryName = event.target.getAttribute('data-kategori');
            closeDetail();
            event.preventDefault();
            getFoodsByCategory(categoryName);
          });
        });
    };

    const getFood = () => {
        fetch(`${baseUrl}/categories.php`)
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderFoodCategory(responseJson.categories);
                getFoodsByCategory('beef');
            }
        })
        .catch(error => {
            showResponseMessage(error);
        });
    };

    const getFoodsByCategory = (category) => {
        fetch(`${baseUrl}/filter.php?c=${category}`)
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.error) {
              showResponseMessage(responseJson.message);
            } else {
              renderFoodList(responseJson.meals);
            }
          })
          .catch(error => {
            showResponseMessage(error);
          });
    };

    const getDetailFoods = (id) => {
      fetch(`${baseUrl}/lookup.php?i=${id}`)
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.error) {
              showResponseMessage(responseJson.message);
            } else {
              renderDetailFood(responseJson.meals[0]);
            }
          })
          .catch(error => {
            showResponseMessage(error);
          });
    };

    const getFoodsByKeyword = (keyword) => {
      fetch(`${baseUrl}/search.php?s=${keyword}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.error) {
            showResponseMessage(responseJson.message);
          } else {
            renderFoodList(responseJson.meals);
          }
        })
        .catch(error => {
          showResponseMessage(error);
        });
    };

    const renderDetailFood = (food) => {
      // FoodCategoryElement.innerHTML = '';
      FoodCategoryElement.style.display = 'block';
      DetailFoodElement.style.display = 'block';
      FoodsOfCategoryElement.style.display = 'none';

      const detailContent = `
        <img src="${food.strMealThumb}" alt="${food.strMeal}">
        <h1>${food.strMeal}</h1>
        <h2>Category: ${food.strCategory}</h2>
        <h2>Area: ${food.strArea}</h2>
        <p>${food.strInstructions}</p>
      `;
      DetailFoodElement.innerHTML = detailContent;
    };
    

    // <img src="${food.strMealThumb}" alt="${food.strMeal}"></img>
    const renderFoodList = (foods) => {
        FoodsOfCategoryElement.innerHTML = '';

        if (foods && foods.length > 0) {
          foods.forEach(food => {
            const foodItem = `
              <li>
                <h3>${food.strMeal}</h3>
                <button data-id="${food.idMeal}" class="detail-btn">Detail</button>
              </li>
            `;
            FoodsOfCategoryElement.innerHTML += foodItem;
          });

          const detailButtons = document.querySelectorAll('.detail-btn');
          detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
              const mealId = event.target.getAttribute('data-id');
              event.preventDefault();
              getDetailFoods(mealId);
            });
          });
        } else {
            showResponseMessage('No food data found');
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        getFood();
    });
}

export default main;