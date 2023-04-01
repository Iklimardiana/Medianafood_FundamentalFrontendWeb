

import './food-list.js';

class FoodDetail extends HTMLElement{
    

    set food(food){
        this._food = food;
        this.render();
    }

    render(){
        if (this._food) {
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
                    text-align: left;
                }

                .container{
                    background-color: #495579;
                    color: #FFFBEB;
                    width: 65%;
                }

                .img-fluid{
                    border: solid 1.5px #FFFBEB;
                    width: 40%;
                    margin: auto;
                    padding:0;
                }

                #title{
                    text-align:center;
                }

                @media screen and (max-width:643px){
                    .container{
                        width: 100%;
                        font-size: 0.7rem;
                    }

                    #back-btn {
                        font-size: 0.7rem;
                    }
                }
            
            </style>

            <div class="container py-1 px-4 mt-4 rounded" >
              <div class="row">
                <h2 class="card-title mb-2" id="title">${this._food.strMeal}</h2>
                <img class="img-fluid rounded shadow mb-2" src="${this._food.strMealThumb}" alt="${this._food.strMeal}">
                <h5 class="card-title">Category: ${this._food.strCategory}</h5>
                <h5 class="card-title">Area: ${this._food.strArea}</h5>
                <p class="card-text pt-2">${this._food.strInstructions}</p>
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
                $(".card").hide();
                $(".card").fadeIn(1000);
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
