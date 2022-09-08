'use strict';
import svgIcons from 'url:../assets/sprite.svg';
import { state } from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

class BookmarkView {
  #parentContainer = document.querySelector('.bookmarks');
  #errorMessage = 'No recipe for your search';
  #data;

  /**
   *Render the received data to the DOM (bookmarks container)
   * @param {Array} data The data to be rendered (bookmark[])
   * @returns(undefined)
   * @this {Object} bookmarkView
   * @author Francis Bittok
   */
  renderData(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.#renderMessage();

    this.#data = data;
    const html = this.#generateResultsMarkup();
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  #clearContainer() {
    this.#parentContainer.innerHTML = '';
  }

  addHandlerUpdateBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  #renderMessage() {
    const html = `
                <div class="info">
                  <div>
                    <svg class="info__icon">
                      <use href="${svgIcons}#icon-emoji-happy"></use>
                    </svg>
                  </div>
                  <p class="info__msg">
                    No bookmarks yet. Find a recipe you love and add it to your
                    bookmarks!
                  </p>
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

export const bookmarkView = new BookmarkView();
