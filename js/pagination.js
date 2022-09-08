import svgIcons from 'url:../assets/sprite.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

class Pagination {
  #parentContainer = document.querySelector('.pagination');
  #data;

  /**
   *Render the received data to the DOM (pagination container)
   * @param {Object} data The data to be rendered (pages)
   * @returns(undefined)
   * @this {Object} pagination
   * @author Francis Bittok
   */
  renderData(data) {
    this.#data = data;
    const html = this.#generatePaginationMarkup();
    this.#clearContainer();
    this.#parentContainer.insertAdjacentHTML('afterbegin', html);
  }

  #clearContainer() {
    this.#parentContainer.innerHTML = '';
  }

  pageHandler(handler) {
    this.#parentContainer.addEventListener('click', function (e) {
      const clicked = e.target.closest('.pagination__btn--goto');
      if (!clicked) return;

      const page = +clicked.dataset.goto;

      handler(page);
    });
  }

  #generatePaginationMarkup() {
    const curPage = this.#data.page;
    const numOfPages = Math.ceil(
      this.#data.results.length / this.#data.RESULTS_PER_PAGE
    );

    ////Page 1 and More pages
    if (this.#data.page === 1 && numOfPages > 1)
      return `
          <div class="pagination__btn next">
              <button
                class="pagination__btn--goto pagination__btn--next"
                data-goto="${curPage + 1}"
              >
                <p>Page ${curPage + 1} of <span>${numOfPages}</span></p>

                <svg class="pagination__btn--icon pagination__btn--icon-next">
                  <use href="${svgIcons}#icon-chevron-small-right"></use>
                </svg>
              </button>
        </div>
      `;

    ////Last Page
    if (this.#data.page === numOfPages && numOfPages > 1)
      return `
          <div class="pagination__btn previous">
              <button
                class="pagination__btn--goto pagination__btn--prev"
                data-goto="${curPage - 1}"
              >
                <svg
                  class="pagination__btn--icon pagination__btn--icon-previous"
                >
                  <use href="${svgIcons}#icon-chevron-small-left"></use>
                </svg>

                <p>Page ${curPage - 1} of<span> ${numOfPages}</span></p>
              </button>
            </div>
    `;

    ////this are mid pages
    if (this.#data.page < numOfPages)
      return `
            <div class="pagination__btn previous">
              <button
                class="pagination__btn--goto pagination__btn--prev"
                data-goto="${curPage - 1}"
              >
                <svg
                  class="pagination__btn--icon pagination__btn--icon-previous"
                >
                  <use href="${svgIcons}#icon-chevron-small-left"></use>
                </svg>

                <p>Page ${curPage - 1} of<span> ${numOfPages}</span></p>
              </button>
            </div>

            <div class="pagination__btn next">
              <button
                class="pagination__btn--goto pagination__btn--next"
                data-goto="${curPage + 1}"
              >
                <p>Page ${curPage + 1} of <span> ${numOfPages}</span></p>

                <svg class="pagination__btn--icon pagination__btn--icon-next">
                  <use href="${svgIcons}#icon-chevron-small-right"></use>
                </svg>
              </button>
            </div>
    `;

    ////There are no other pages
    return '';
  }
}

export const pagination = new Pagination();
