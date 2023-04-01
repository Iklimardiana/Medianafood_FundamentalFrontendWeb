

import './food-list.js';

class FoodDetail extends HTMLElement{
    

    set food(food){
        this._food = food;
        this.render();
    }

    render(){
        if (this._food) {
            // this.innerHTML = `<p>No food data found</p>`;
            // return;
            this.innerHTML = `
            <style>
                
                #back-btn {
                    display: block;
                    margin: auto;
                    width: 5rem;
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

                .card-title{
                    text-align: center;
                }

                .container{
                    background-color: #495579;
                    color: #FFFBEB;
                }

                .img-fluid{
                    border: solid 1.5px #FFFBEB;
                }
            
            </style>

            <div class="container p-4 rounded" >
              <div class="row">
                <div class="col-md-6 col-lg-4">
                  <img class="img-fluid rounded shadow" src="${this._food.strMealThumb}" alt="${this._food.strMeal}">
                </div>
                <div class="col-md-6 col-sm-12 col-lg-8">
                  <h1 class="card-title">${this._food.strMeal}</h1>
                  <h5 class="card-title">Category: ${this._food.strCategory}</h5>
                  <h5 class="card-title">Area: ${this._food.strArea}</h5>
                  <p class="card-text pt-2">${this._food.strInstructions}</p>
                </div>
              </div>
              <div class="button-container mt-4">
                <button class="btn btn-light fw-semibold mb-4" id="back-btn">Back</button>
              </div>
            </div>
            `;

            $(".container").hide();
            $(".container").fadeIn(1000);

            const DetailFoodElement = document.querySelector('food-detail');
            const searchContainerElement = document.querySelector('.search-container');
            const FoodListElement = document.querySelector('food-list');
            
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

    }

    connectedCallback(){
        this.render();
    }
}

customElements.define("food-detail", FoodDetail);
