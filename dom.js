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
  function createRecipeCard(recipe, index) {
    var card = document.createElement('article');
    card.className = 'dish-card recipe-card';
    card.dataset.index = index;

    var title = document.createElement('h3');
    title.textContent = recipe.title;

    var list = document.createElement('ul');
    list.className = 'recipe-ingredients';
    recipe.ingredients.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    var delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'delete-recipe';
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', function () {
      card.remove();
      syncRecipesFromDOM();
    });

    card.appendChild(title);
    card.appendChild(list);
    card.appendChild(delBtn);
    return card;
  }

  function syncRecipesFromDOM() {
    var cards = recipesContainer.querySelectorAll('.recipe-card');
    var result = [];
    cards.forEach(function (card) {
      var titleEl = card.querySelector('h3');
      var items = card.querySelectorAll('li');
      var ingredients = [];
      items.forEach(function (li) { ingredients.push(li.textContent); });
      result.push({
        title: titleEl ? titleEl.textContent : 'Без названия',
        ingredients: ingredients
      });
    });
    saveRecipes(result);
  }

  function renderAll(recipes) {
    recipesContainer.innerHTML = '';
    recipes.forEach(function (r, i) {
      recipesContainer.appendChild(createRecipeCard(r, i));
    });
  }

  applyTheme(loadTheme());
  renderAll(loadRecipes());
  
  addRecipeBtn.addEventListener('click', function () {
    var title = prompt('Название рецепта:', 'Новый рецепт');
    if (title === null) return;
    title = title.trim();
    if (!title) {
      alert('Название не может быть пустым.');
      return;
    }

    var ingredientsRaw = prompt('Ингредиенты через запятую:', 'соль, перец');
    if (ingredientsRaw === null) return;
    var ingredients = ingredientsRaw
      .split(',')
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });

    if (ingredients.length === 0) {
      alert('Нужно указать хотя бы один ингредиент.');
      return;
    }

    var card = createRecipeCard({ title: title, ingredients: ingredients });
    recipesContainer.appendChild(card);
    syncRecipesFromDOM();
  });

  removeLastBtn.addEventListener('click', function () {
    var cards = recipesContainer.querySelectorAll('.recipe-card');
    if (cards.length === 0) {
      console.warn('Нет рецептов для удаления.');
      return;
    }
    cards[cards.length - 1].remove();
    syncRecipesFromDOM();
  });

  toggleRecipesBtn.addEventListener('click', function () {
    var hidden = recipesContainer.classList.toggle('is-hidden');
    toggleRecipesBtn.textContent = hidden ? 'Показать рецепты' : 'Скрыть рецепты';
  });

})();