import svgIcons from 'url:../assets/sprite.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import { KEY } from './config.js';
import { TIMEOUT_SEC } from './config.js';
import { SEARCH_URL } from './config.js';
import { RECIPE_URL } from './config.js';
import { getJSON } from './helpers.js';
import { timeout } from './helpers.js';

// const spoonacularSearch = `https://api.spoonacular.com/recipes/complexSearch?apiKey=7b8fe85accd4471fb983dce4ecf416f6&query=pizza`;
// const EmaAPI_KEY = `66db7048713415506351e8eb9fc64513	`;
// const EmaAPP_ID = `53317aba`;
// const EmaURL = `https://api.edamam.com/api/recipes/v2?q=chicken&app_id=53317aba&app_key=66db7048713415506351e8eb9fc64513`;

// const spoonAPI = 'ce87b9d489e34716800337e79fd8a89a';

export const state = {
  recipe: {},
  search: {
    query: [],
    results: [],
    page: 1,
    RESULTS_PER_PAGE: 6,
  },
  bookmarks: [],
  plan: [],
};

/**
 * Creates an state Object
 * @param {Object} data Receives data from recipe AJAX call
 * @returns {Object} {state}
 */
const createRecipeObject = function (data) {
  return {
    id: data.id,
    image: data.image,
    title: data.title,
    glutenFree: data.glutenFree,
    vegetarian: data.vegetarian,
    vegan: data.vegan,
    dairyFree: data.dairyFree,
    veryHealthy: data.veryHealthy,
    likes: data.aggregateLikes,
    cookingTime: data.readyInMinutes,
    servings: data.servings,
    ingredients: data.extendedIngredients,
    sourceUrl: data.sourceUrl,
    summary: data.summary,
  };
};

export const displayRecipe = async function (id) {
  try {
    const data = await getJSON(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=ce87b9d489e34716800337e79fd8a89a&includeNutrition=true`
    );

    state.recipe = createRecipeObject(data);
    console.log(data);

    if (state.bookmarks.some(bookmark => bookmark.id === +id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    state.search.page = 1;
  } catch (err) {
    console.error(err, 'err display recipe');
    throw err;
  }
};

export const displaySearch = async function (query) {
  try {
    state.search.query.push(query);

    const data = await getJSON(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=ce87b9d489e34716800337e79fd8a89a&query=${query}`
    );

    if (data.totalResults === 0)
      throw new Error(`No results found for your query!`);
    state.search.results = data.results;
  } catch (err) {
    console.error(err, 'err display search');
    throw err;
  }
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  saveBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);

  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  saveBookmarks();
};

export const pagination = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.RESULTS_PER_PAGE;
  const end = page * state.search.RESULTS_PER_PAGE;

  return state.search.results.slice(start, end);
};

const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const retrieveBookmarks = function () {
  const data = localStorage.getItem('bookmarks');
  if (!data) return;
  state.bookmarks = JSON.parse(data);
};
retrieveBookmarks();

function clearBookmarks() {
  localStorage.clear('bookmarks');
}
// clearBookmarks();

export const bookmarkNum = function () {
  document.querySelector('.btn__info--bookmark').textContent =
    state.bookmarks.length;
};

// console.log(state.bookmarks);
