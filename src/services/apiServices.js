const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const getMeals = async (search, numberOfResponses) => {
  const response = await fetch(`${MEALS_URL}${search}`);
  const data = await response.json();
  return data.meals.slice(0, numberOfResponses);
};

const getDrinks = async (search, numberOfResponses) => {
  const response = await fetch(`${DRINKS_URL}${search}`);
  const data = await response.json();
  return data.drinks.slice(0, numberOfResponses);
};

export { getMeals, getDrinks };
