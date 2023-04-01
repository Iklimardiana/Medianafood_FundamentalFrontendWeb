'use strict'

import DataSource from '../data/data-source.js'
import '../components/food-list.js';
import '../components/food-detail.js';


function main() {
    const searchForm = document.querySelector('.input-group');
    const FoodListElement = document.querySelector('food-list');

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

    const fallbackResult = message => {
      FoodListElement.innerHTML = '';
      FoodListElement.innerHTML += message;
    };
  }

  export default main;