
import './food-list.js';

class FoodDetail extends HTMLElement{
    

    set food(food){
        this._food = food;
        this.render();
    }

    render(){
        if (!this._food) {
            this.innerHTML = `<p>No food data found</p>`;
            return;
        }

        this.innerHTML = `
        <style>
            body{
                background-color: antiquewhite;
                padding: 20px;
            }
            
            .search-container{
                background-color: aqua;
            }
            
            #detail-food-img{
                margin: 20px;
            }
            
            .card .card-wrapper{
                display: flex;
            }
            
            #back-btn {
                display: block;
                margin: auto;
                width: 10%;
            }
            
            .card-text{
                text-align: justify;
            }
            
            .card-body h1 {
                text-align: center;
            }
            
            .card-body{
                text-align: center;
            }
        </style>

        <div class="card" style="width: 100%;">
          <div class="card-wrapper">
            <div class="card-body">
              <h1 class="card-title">${this._food.strMeal}</h1>
              <h5 class="card-title">Category: ${this._food.strCategory}</h4>
              <h5 class="card-title">Area: ${this._food.strArea}</h4>
              <p class="card-text">${this._food.strInstructions}</p>
            </div>
            <img id="detail-food-img" src="${this._food.strMealThumb}" style="width:30%;" alt="${this._food.strMeal}">
          </div>

          <button class="btn btn-dark mb-4" id="back-btn">Back</button>
        </div>
        `;

        const DetailFoodElement = document.querySelector('food-detail');
        const searchContainerElement = document.querySelector('.search-container');
        const FoodListElement = document.querySelector('food-list')
        
        const backToFoodList = () => {
            searchContainerElement.style.display = 'block';
            DetailFoodElement.style.display = 'none';
            FoodListElement.style.display = 'block';
        };

        const backButton = this.querySelector('#back-btn');
        backButton.addEventListener('click', (event) => {
          event.preventDefault();
          backToFoodList();
        });
    }

    connectedCallback(){
        this.render();
    }
}

customElements.define("food-detail", FoodDetail);
