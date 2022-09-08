'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import svgIcons from 'url:../assets/sprite.svg';
import { state } from './model.js';

class ResultsView {
  #parentContainer = document.querySelector('.result__list');
  #form = document.querySelector('.search');
  #errorMessage = 'No recipe for your search';
  #data;

  /**
   *Render the received data to the DOM (results container)
   * @param {Array} data The data to be rendered (search results)
   * @returns(undefined)
   * @this {Object} resultsView
   * @author Francis Bittok
   */
  renderData(data) {
    this.#data = data;
    const html = this.#generateResultsMarkup();
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  getSearchQuery() {
    const query = document.querySelector('.search__input').value.trim();
    if (!query) return;
    document.querySelector('.search__input').value = '';
    return query;
  }

  addHandlerDisplayResults(handler) {
    this.#form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearContainer() {
    this.#parentContainer.innerHTML = '';
  }

  renderLoader() {
    const html = `
    <div class="loader">
      <h1 class="header__title">D B</h1>
    </div>
    `;
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  renderError(error = this.#errorMessage) {
    const html = `
    <div class="info info__error">
            <div>
              <svg class="info__icon">
                <use href="${svgIcons}#icon-warning"></use>
              </svg>
            </div>
            <p class="info__msg">
             ${error}
            </p>
    </div>
    `;
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  #generateResultsMarkup() {
    const id = window.location.hash.slice(1);

    return `
        ${this.#data
          .map(result => {
            return `
            <li class="overview">
                <a class="overview__link ${
                  result.id === +id ? 'overview__link--active' : ''
                }" href="#${result.id}">
                <figure class="overview__img">
                    <img
                    src="${result.image}"
                    alt="${result.title}"
                    />
                </figure>
                <div class="overview__info">
                    <p class="overview__title">
                    ${result.title}
                    </p>
                </div>
                </a>
            </li>
            `;
          })
          .join('\n')}
      `;
  }
}

export const resultsView = new ResultsView();
