'use strict'

// import '../component/search-bar.js';

import DataSource from './data/data-source.js'

function main() {
    const DetailFoodElement = document.querySelector('.food-detail');
    const searchForm = document.querySelector('.search-form');
    const searchContainerElement = document.querySelector('.search-container');
    const FoodListElement = document.querySelector('.Food-list')


    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const keyword = document.querySelector('.search-input').value;
      
      try {
        const result = await DataSource.getFoodByKeyword(keyword);
        renderFoodList(result);
        searchForm.reset()
      } catch (message) {
        fallbackResult(message)
      }
    });

    const backToFoodList = () => {
      searchContainerElement.style.display = 'block';
      DetailFoodElement.style.display = 'none';
      FoodListElement.style.display = 'block';
    };

    const renderDetailFood = (food) => {
      searchContainerElement.style.display = 'none';
      DetailFoodElement.style.display = 'block';

      const detailContent = `
        <div class="card" style="width: 100%;">
          <div class="card-wrapper">
            <div class="card-body">
              <h1 class="card-title">${food.strMeal}</h1>
              <h5 class="card-title">Category: ${food.strCategory}</h4>
              <h5 class="card-title">Area: ${food.strArea}</h4>
              <p class="card-text">${food.strInstructions}</p>
            </div>
            <img id="detail-food-img" src="${food.strMealThumb}" style="width:30%; alt="${food.strMeal}">
          </div>

          <button class="btn btn-dark mb-4" id="back-btn">Back</button>
        </div>
      `;
      DetailFoodElement.innerHTML = detailContent;

      const backButton = document.getElementById('back-btn');
      backButton.addEventListener('click', (event) => {
        event.preventDefault();
        backToFoodList();
      });
    };

    const detailFood = async(id) => {
      FoodListElement.style.display = 'none';
      DetailFoodElement.style.display = 'block';
      try {
        const result = await DataSource.getDetailFoods(id);
        renderDetailFood(result);
      } catch (message) {
        fallbackResult('An Error Occured')
      }
    }

    const renderFoodList = (foods) => {
      if (foods && foods.length > 0) {
        FoodListElement.innerHTML = '';
        const numCols = 4; // jumlah kolom yang ingin ditampilkan
        let row = document.createElement('div');
        row.classList.add('row');
        foods.forEach((food, index) => {
          if (index % numCols === 0) {
            FoodListElement.appendChild(row);
            row = document.createElement('div');
            row.classList.add('row');
          }
          const foodItem = `
            <div class="col-lg-${12/numCols} col-md-${12/numCols} col-sm-6 mb-4">
              <div class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <button data-id="${food.idMeal}" class="btn btn-dark detail-btn">Detail</button>
                </div>
              </div>
            </div>
          `;
          row.innerHTML += foodItem;
        });
        FoodListElement.appendChild(row);
    
        const detailButtons = document.querySelectorAll('.detail-btn');
        detailButtons.forEach(button => {
          button.addEventListener('click', (event) => {
            const mealId = event.target.getAttribute('data-id');
            event.preventDefault();
            detailFood(mealId);
          });
        });
      } else {
        fallbackResult('No food data found');
      }
    };
    
  
    const fallbackResult = message => {
      FoodListElement.innerHTML = '';
      FoodListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    };

    // menampilkan default food list
    DataSource.getDefaultFoods()
    .then(renderFoodList)
    .catch(fallbackResult);    


  }

  export default main;