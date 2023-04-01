import DataSource from "../data/data-source";
import './food-detail.js';

class FoodList extends HTMLElement {
    constructor() {
        super();
        this._food = [];
        DataSource.getDefaultFoods()
            .then(foods => {
                this._food = foods;
                this.render();
            })
            .catch(error => {
                console.error(error);
                console.log('Failed to load default food list.');
            });
    }

    set food(food) {
        this._food = food;
        this.render();
    }

    render() {
        this.innerHTML = '';
            const numCols = 4;
            let row = document.createElement('div');
            row.classList.add('row');
            this._food.forEach((food, index) => {
                if (index % numCols === 0) {
                    this.appendChild(row);
                    row = document.createElement('div');
                    row.classList.add('row');
                }
                const foodItem = `
                    <style>
                        .card-text{
                            text-align: justify;
                        }
                        
                        .card-body h1 {
                            text-align: center;
                        }
                        
                        .card-body{
                            text-align: center;
                            height: 100%;
                        }

                        .row {
                            display: flex;
                            flex-wrap: wrap;
                        }
                        
                        .card {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            height: 100%;
                            transition: transform 0.2s ease-out;
                            background-color: #495579;
                            color: #FFFBEB;
                        }

                        .btn-light{
                            background-color: #FFFBEB;
                            color: #495579;
                        }

                        @media screen and (max-width:472px){
                            .detail-btn {
                                font-size: 0.7rem;
                            }
                        }
                        
                    </style>

                    <div class="col-lg-${12 / numCols} col-md-${12 / numCols} col-sm-6 mb-4">
                        <div class="card shadow">
                            <img src="${food.strMealThumb}" class="card-img-top" alt="${food.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${food.strMeal}</h5>
                                <button data-id="${food.idMeal}" class="btn btn-light fw-semibold detail-btn">Detail</button>
                            </div>
                        </div>
                    </div>
                `;
                row.innerHTML += foodItem;

                  
            });
            this.appendChild(row);

            $(".card").hide();
            $(".card").fadeIn(1000);
            $('.card').hover(
                function() {
                    $(this).css('transform', 'scale(1.06)');
                },
                function() {
                    $(this).css('transform', 'scale(1)');
                }
            );


            const FoodListElement = document.querySelector('food-list');
            const DetailFoodElement = document.querySelector('food-detail');
            const searchContainerElement = document.querySelector('.search-container');

            const detailFood = async(id) => {
                DetailFoodElement.innerHTML = '';
                searchContainerElement.style.display = 'none'
                FoodListElement.style.display = 'none';
                DetailFoodElement.style.display = 'block';
                try {
                  const result = await DataSource.getDetailFoods(id);
                  const foodDetailElement = document.querySelector('food-detail');
                  foodDetailElement.food = result;
                } catch (message) {
                  fallbackResult('An Error Occured')
                }
             }
             
            const detailButtons = this.querySelectorAll('.detail-btn');
            detailButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const mealId = event.target.getAttribute('data-id');
                    event.preventDefault();
                    detailFood(mealId);
                });
            });
        
    }
      

    connectedCallback() {
        this.render();
    }
}

const fallbackResult = message => {
    console.log(message);
};

customElements.define("food-list", FoodList);
