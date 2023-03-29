
const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
class DataSource{
    static getFood = () => {
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

    static getFoodsByCategory = (category) => {
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

    static getDetailFoods = (id) => {
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

    static getFoodsByKeyword = (keyword) => {
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
}