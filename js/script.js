'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

import svgIcons from 'url:../assets/sprite.svg';
import * as model from './model.js';
import { recipeView } from './recipeView';
import { resultsView } from './resultsView';
import { bookmarkView } from './boomarkView.js';
import { pagination } from './pagination.js';

document.querySelector('.search__input').focus();

const controlRecipes = async function () {
  try {
    ////Get id to load recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    ////Render loader
    recipeView.renderLoader();

    ////Get recipe details with the id
    await model.displayRecipe(id);

    ////Render the recipe details
    recipeView.renderData(model.state.recipe);

    ////Update recipe notofocation num
    model.bookmarkNum();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    ////Get search query
    const query = resultsView.getSearchQuery();

    if (!query) return;
    ////Render a loader
    resultsView.renderLoader();

    ////Get search results
    await model.displaySearch(query);

    ////Render initial search results i.e page 1
    resultsView.renderData(model.pagination());

    ////Render pages
    pagination.renderData(model.state.search);

    model.bookmarkNum();
  } catch (err) {
    resultsView.renderError(err);
    console.log(err, `Control Search`);
  }
};

const controlPagination = function (goTo) {
  ////Render next search results
  resultsView.renderData(model.pagination(goTo));

  ////Re-render the pages
  pagination.renderData(model.state.search);
};

const controlBookmarks = function () {
  ////Check if recipe is bookmared
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  ////Render bookmarked recipe
  recipeView.renderData(model.state.recipe);

  ////Update recipe notofocation num
  model.bookmarkNum();

  // console.log(model.state.recipe);
  bookmarkView.renderData(model.state.bookmarks);
};

const updateBookmarks = function () {
  ////Update bookmarks from local storage
  bookmarkView.renderData(model.state.bookmarks);

  ////Update recipe notofocation num
  model.bookmarkNum();
};

const handlers = function () {
  // recipeView.addHandlerUpdate(controlRecipes);
  resultsView.addHandlerDisplayResults(controlSearch);
  recipeView.addHandlerBookmarkRecipe(controlBookmarks);
  bookmarkView.addHandlerUpdateBookmarks(updateBookmarks);
  pagination.pageHandler(controlPagination);
};

handlers();

window.addEventListener('hashchange', function () {
  controlRecipes();
});
window.addEventListener('load', function () {
  controlRecipes();
});
