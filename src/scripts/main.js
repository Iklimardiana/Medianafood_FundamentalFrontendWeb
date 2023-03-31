'use strict'

import DataSource from './data/data-source.js'
import './component/food-list.js';
import './component/food-detail.js';


function main() {
    const searchForm = document.querySelector('.search-form');
    const searchContainerElement = document.querySelector('.search-container');
    const FoodListElement = document.querySelector('food-list');
    const DetailFoodElement = document.querySelector('food-detail');

    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const keyword = document.querySelector('.search-input').value;
    
      try {
        const result = await DataSource.getFoodByKeyword(keyword);
        if (result && result.length > 0) {
          FoodListElement.food = result;
          searchForm.reset();
        } else {
          fallbackResult('No food data found');
        }
      } catch (message) {
        fallbackResult(message);
      }
    });
    

    const backToFoodList = () => {
      searchContainerElement.style.display = 'block';
      DetailFoodElement.style.display = 'none';
      FoodListElement.style.display = 'block';
    };

    const renderDetailFood = (food) => {
      DetailFoodElement.innerHTML=''
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

    const fallbackResult = message => {
      FoodListElement.innerHTML = '';
      FoodListElement.innerHTML += message;
    };
  }

  export default main;