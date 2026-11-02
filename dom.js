'use strict';

(function () {
  var STORAGE_RECIPES = 'cookblog_recipes';
  var STORAGE_THEME   = 'cookblog_theme';

  var themeToggleBtn  = document.getElementById('theme-toggle');
  var toggleRecipesBtn = document.getElementById('toggle-recipes');
  var addRecipeBtn    = document.getElementById('add-recipe');
  var removeLastBtn   = document.getElementById('remove-last-recipe');
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

  function loadRecipes() {
    try {
      var raw = localStorage.getItem(STORAGE_RECIPES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Ошибка чтения рецептов из localStorage:', e);
      return [];
    }
  }

  function saveRecipes(recipes) {
    try {
      localStorage.setItem(STORAGE_RECIPES, JSON.stringify(recipes));
    } catch (e) {
      console.error('Ошибка сохранения рецептов:', e);
    }
  }

  function loadTheme() {
    try {
      return localStorage.getItem(STORAGE_THEME) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {
      console.error('Ошибка сохранения темы:', e);
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
      themeToggleBtn.textContent = 'Светлая тема';
    } else {
      document.body.classList.remove('theme-dark');
      themeToggleBtn.textContent = 'Тёмная тема';
    }
  }

  themeToggleBtn.addEventListener('click', function () {
    var next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
})();