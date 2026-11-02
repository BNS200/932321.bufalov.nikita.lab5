'use strict';

(function () {
  var STORAGE_RECIPES = 'cookblog_recipes';
  var STORAGE_THEME = 'cookblog_theme';

  var themeToggleBtn = document.getElementById('theme-toggle');
  var toggleRecipesBtn = document.getElementById('toggle-recipes');
  var addRecipeBtn = document.getElementById('add-recipe');
  var removeLastBtn = document.getElementById('remove-last-recipe');
  var recipesContainer = document.getElementById('recipes-container');
  var signatureSection = document.querySelector('#signature');
  var allSectionTitles = document.querySelectorAll('section > h2');

  function assertElement(el, name) {
    if (!el) {
      console.error('Элемент не найден: ' + name);
      return false;
    }
    return true;
  }

  if (!assertElement(recipesContainer, '#recipes-container') ||
      !assertElement(addRecipeBtn, '#add-recipe') ||
      !assertElement(removeLastBtn, '#remove-last-recipe') ||
      !assertElement(themeToggleBtn, '#theme-toggle') ||
      !assertElement(toggleRecipesBtn, '#toggle-recipes')) {
    return;
  }

  console.log('Найдено заголовков секций:', allSectionTitles.length);
})();