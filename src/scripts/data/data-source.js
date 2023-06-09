
class DataSource{

    static getFoodByKeyword(keyword) {
      return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          console.log('Response from API:', responseJson);
          if (responseJson.error) {
              return Promise.reject(`${keyword} is not found`);
          } else {
              return Promise.resolve(responseJson.meals);
          }
        }) .catch(error => {
          console.error('Error while searching for food:', error);
        })
  };

    static getDetailFoods(id) {
      return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          if (responseJson.error) {
            return Promise.reject('an error occurred');
          } else {
            return Promise.resolve(responseJson.meals[0]);
          }
        });
    };

    static getDefaultFoods() {
      return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=ch')
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            return Promise.reject('an error occurred');
          } else {
            return Promise.resolve(responseJson.meals);
          }
        });
    }

}

export default DataSource;