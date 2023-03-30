'use strict'

import DataSource from './data/data-source.js'

function main() {
    const FoodCategoryElement = document.querySelector('.Food-category');
    const DetailFoodElement = document.querySelector('.food-detail');
    const searchForm = document.querySelector('.search-form');
    const searchContainerElement = document.querySelector('.search-container');
    const FoodsOfCategoryElement = document.querySelector('.FoodsOfCategory');
    const FoodListElement = document.querySelector('.Food-list')

    // const showResponseMessage = (message = 'Check your internet connection') => {
    //     FoodCategoryElement.innerHTML = `<p>${message}</p>`;
    // };

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
      FoodCategoryElement.style.display = 'block';
      DetailFoodElement.style.display = 'block';
      FoodsOfCategoryElement.style.display = 'none';

      const detailContent = `
        <img src="${food.strMealThumb}" alt="${food.strMeal}">
        <h1>${food.strMeal}</h1>
        <h2>Category: ${food.strCategory}</h2>
        <h2>Area: ${food.strArea}</h2>
        <p>${food.strInstructions}</p>
        <button id="back-btn">Back</button>
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
        foods.forEach(food => {
          const foodItem = `
            <li>
              <h3>${food.strMeal}</h3>
              <button data-id="${food.idMeal}" class="detail-btn">Detail</button>
            </li>
          `;
          FoodListElement.innerHTML += foodItem;
        });

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















    // const closeDetail = () =>{
    //   DetailFoodElement.innerHTML = '';
    //   FoodsOfCategoryElement.style.display = 'block';
    // }

    // searchForm.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //   const keyword = document.querySelector('.search-input').value;
    //   getFoodsByKeyword(keyword);
    // });
    

    // const renderFoodCategory = (foods) => {

    //     FoodCategoryElement.innerHTML='';

    //     foods.forEach((food) => {
    //       const foodItem = `
    //         <li>
    //           <h3 data-kategori="${food.strCategory}">${food.strCategory}</h3>
    //         </li>
    //       `;
    //       FoodCategoryElement.innerHTML += foodItem;
    //     });
      
    //     const clickedCategory = document.querySelectorAll('.Food-category h3');
    //     clickedCategory.forEach((button) => {
    //       button.addEventListener('click', (event) => {
    //         const categoryName = event.target.getAttribute('data-kategori');
    //         closeDetail();
    //         event.preventDefault();
    //         getFoodsByCategory(categoryName);
    //       });
    //     });
    // };

    // const getFood = () => {
    //     fetch(`${baseUrl}/categories.php`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(responseJson => {
    //         if (responseJson.error) {
    //             showResponseMessage(responseJson.message);
    //         } else {
    //             renderFoodCategory(responseJson.categories);
    //             getFoodsByCategory('beef');
    //         }
    //     })
    //     .catch(error => {
    //         showResponseMessage(error);
    //     });
    // };

    // const getFoodsByCategory = (category) => {
    //     fetch(`${baseUrl}/filter.php?c=${category}`)
    //       .then(response => {
    //         return response.json();
    //       })
    //       .then(responseJson => {
    //         if (responseJson.error) {
    //           showResponseMessage(responseJson.message);
    //         } else {
    //           renderFoodList(responseJson.meals);
    //         }
    //       })
    //       .catch(error => {
    //         showResponseMessage(error);
    //       });
    // };

    // const getDetailFoods = (id) => {
    //   fetch(`${baseUrl}/lookup.php?i=${id}`)
    //       .then(response => {
    //         return response.json();
    //       })
    //       .then(responseJson => {
    //         if (responseJson.error) {
    //           showResponseMessage(responseJson.message);
    //         } else {
    //           renderDetailFood(responseJson.meals[0]);
    //         }
    //       })
    //       .catch(error => {
    //         showResponseMessage(error);
    //       });
    // };

    // const getFoodsByKeyword = (keyword) => {
    //   fetch(`${baseUrl}/search.php?s=${keyword}`)
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(responseJson => {
    //       if (responseJson.error) {
    //         showResponseMessage(responseJson.message);
    //       } else {
    //         renderFoodList(responseJson.meals);
    //       }
    //     })
    //     .catch(error => {
    //       showResponseMessage(error);
    //     });
    // };

    // const renderDetailFood = (food) => {
    //   // FoodCategoryElement.innerHTML = '';
    //   FoodCategoryElement.style.display = 'block';
    //   DetailFoodElement.style.display = 'block';
    //   FoodsOfCategoryElement.style.display = 'none';

    //   const detailContent = `
    //     <img src="${food.strMealThumb}" alt="${food.strMeal}">
    //     <h1>${food.strMeal}</h1>
    //     <h2>Category: ${food.strCategory}</h2>
    //     <h2>Area: ${food.strArea}</h2>
    //     <p>${food.strInstructions}</p>
    //   `;
    //   DetailFoodElement.innerHTML = detailContent;
    // };
    

    // // <img src="${food.strMealThumb}" alt="${food.strMeal}"></img>
    // const renderFoodList = (foods) => {
    //     FoodsOfCategoryElement.innerHTML = '';

    //     if (foods && foods.length > 0) {
    //       foods.forEach(food => {
    //         const foodItem = `
    //           <li>
    //             <h3>${food.strMeal}</h3>
    //             <button data-id="${food.idMeal}" class="detail-btn">Detail</button>
    //           </li>
    //         `;
    //         FoodsOfCategoryElement.innerHTML += foodItem;
    //       });

    //       const detailButtons = document.querySelectorAll('.detail-btn');
    //       detailButtons.forEach(button => {
    //         button.addEventListener('click', (event) => {
    //           const mealId = event.target.getAttribute('data-id');
    //           event.preventDefault();
    //           getDetailFoods(mealId);
    //         });
    //       });
    //     } else {
    //         showResponseMessage('No food data found');
    //     }
    // };

    // document.addEventListener('DOMContentLoaded', () => {
    //   getFood();
    // });
