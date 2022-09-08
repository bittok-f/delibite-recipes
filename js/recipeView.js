'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import svgIcons from 'url:../assets/sprite.svg';
// import * as model from './model.js';

class RecipeView {
  #parentContainer = document.querySelector('.recipe');
  #errorMessage = 'No recipe found for your search query';
  #data;

  /**
   *Render the received data to the DOM (recipe container)
   * @param {Object} data The data to be rendered (recipe)
   * @returns(undefined)
   * @this {Object} recipeView
   * @author Francis Bittok
   */
  renderData(data) {
    this.#data = data;
    const html = this.#generateRecipeMarkup();
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  #clearContainer() {
    this.#parentContainer.innerHTML = '';
  }

  addHandlerBookmarkRecipe(handler) {
    this.#parentContainer.addEventListener('click', function (e) {
      const clicked = e.target.closest('.recipe__bookmark--btn-active');
      if (!clicked) return;

      handler();
    });
  }

  // addHandlerUpdate(handler) {
  //   ['hashchange', 'load'].forEach(event =>
  //     window.addEventListener(event, handler)
  //   );
  // }

  renderLoader() {
    const html = `
    <div class="loader">
      <h1 class="header__title">D B</h1>
    </div>
    `;
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  renderError() {
    const html = `
    <div class="info info__error">
            <div>
              <svg class="info__icon">
                <use href="${svgIcons}#icon-warning"></use>
              </svg>
            </div>
            <p class="info__msg">
             ${this.#errorMessage}
            </p>
    </div>
    `;
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  #generateRecipeMarkup() {
    return `

              <div class="recipe__container">
                      <div class="recipe__composition">
                                <div class="recipe__composition--details">
                                  <p class="recipe__composition--type">Gluten-Free</p>
                                  <svg class="recipe__icon--description recipe__icon--check">
                                    <use href="${svgIcons}#icon-${
      this.#data.glutenFree ? 'check' : 'cross'
    }"></use>
                                  </svg>
                                </div>
                    
                                <div class="recipe__composition--details">
                                  <p class="recipe__composition--type">Vegeterian</p>
                                  <svg class="recipe__icon--description recipe__icon--check">
                                    <use href="${svgIcons}#icon-${
      this.#data.vegetarian ? 'check' : 'cross'
    }"></use>
                                  </svg>
                                </div>
                    
                                <div class="recipe__composition--details">
                                  <p class="recipe__composition--type">Vegan</p>
                                  <svg class="recipe__icon--description recipe__icon--check">
                                    <use href="${svgIcons}#icon-${
      this.#data.vegan ? 'check' : 'cross'
    }"></use>
                                  </svg>
                                </div>
                    
                                <div class="recipe__composition--details">
                                  <p class="recipe__composition--type">Dairy Free</p>
                                  <svg class="recipe__icon--description recipe__icon--check">
                                    <use href="${svgIcons}#icon-${
      this.#data.dairyFree ? 'check' : 'cross'
    }"></use>
                                  </svg>
                                </div>

                                <div class="recipe__composition--details">
                                <p class="recipe__composition--type">Very Healthy</p>
                                <svg class="recipe__icon--description recipe__icon--check">
                                  <use href="${svgIcons}#icon-${
      this.#data.healthy ? 'check' : 'cross'
    }"></use>
                                </svg>
                              </div>
                      </div>

              <figure class="recipe__figure">
                        <img
                          src="${this.#data.image}"
                          alt="${this.#data.title}"
                          class="recipe__img"
                        />
                        <div class="recipe__details">
                          <p class="recipe__title">${this.#data.title}</p>
                            <div class="recipe__btn--collection">
                                <button class="recipe__btn recipe__bookmark--btn-active">
                                  <svg class="recipe__bookmark--btn">
                                    <use href="${svgIcons}#icon-heart${
      this.#data.bookmarked ? '' : '-outlined'
    }"></use>
                                  </svg>
                                </button>
                              
                          </div>
                        </div>
              </figure>

              <div class="recipe__nav">
                      <div class="recipe__icon">
                        <svg class="recipe__icon--description recipe__icon--like">
                          <use href="${svgIcons}#icon-thumbs-up"></use>
                        </svg>
                        <p class="recipe__description">${this.#data.likes}</p>
                        <span>Likes</span>
                      </div>

                      <div class="recipe__icon">
                        <svg class="recipe__icon--description recipe__icon--time">
                          <use href="${svgIcons}#icon-alarm"></use>
                        </svg>
                        <p class="recipe__description">${
                          this.#data.cookingTime
                        }</p>
                        <span>Minutes</span>
                      </div>

                      <div class="recipe__icon recipe__users--data">
                        <svg class="recipe__icon--description recipe__icon--users">
                          <use href="${svgIcons}#icon-users"></use>
                        </svg>
                        <p class="recipe__description">${
                          this.#data.servings
                        }</p>
                        <span>Servings</span>
                      </div>

                  
              </div>

            </div>
   
            <div class="recipe__ingredients">
              <ul class="recipe__ingredients--list">

              ${this.#data.ingredients
                .map(ing => {
                  return `
                  <li class="recipe__ingredients--item">
                      <svg class="recipe__icon--description recipe__icon--list">
                        <use href="${svgIcons}#icon-chevron-small-right"></use>
                      </svg>

                      <p class="recipe__ingredients--amount">${ing.amount}</p>
                      <p class="recipe__ingredients--unit">${ing.unit}</p>
                      <span>of</span>
                      <p class="recipe__ingredients--details">${ing.name}</p>
                </li>
                  `;
                })
                .join('\n')}
                
              </ul>
            </div>
  
            <div class="recipe__instructions">
              <p class="recipe__instructions--text">
                <span class="recipe__instructions--owner"
                  ></span
                >
                ${this.#data.summary}
              </p>
              <a
                class="recipe__instructions--btn"
                href="${this.#data.sourceUrl}"
                target="_blank"
              >
                <svg class="recipe__icon--instructions">
                  <use href="${svgIcons}#icon-edit"></use>
                </svg>
                View Recipe
              </a>
            </div>  
  
      `;
  }
}

export const recipeView = new RecipeView();
