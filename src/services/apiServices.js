const MEALS_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const getMeals = async (search, numberOfResponses) => {
  const response = await fetch(`${MEALS_SEARCH_URL}${search}`);
  const data = await response.json();
  return data.meals.slice(0, numberOfResponses);
};

const getDrinks = async (search, numberOfResponses) => {
  const response = await fetch(`${DRINKS_SEARCH_URL}${search}`);
  const data = await response.json();
  return data.drinks.slice(0, numberOfResponses);
};

const getMealsCategories = async () => {
  const response = await fetch(MEALS_CATEGORIES_URL);
  const data = await response.json();
  return data.meals;
};

const getDrinksCategories = async () => {
  const response = await fetch(DRINKS_CATEGORIES_URL);
  const data = await response.json();
  return data.drinks;
};

export { getMeals, getDrinks, getMealsCategories, getDrinksCategories };
