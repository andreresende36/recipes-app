// Função que lida com o clique no botão de favoritar
export const handleClickFavorite = (data, id, isFavorited, setIsFavorited) => {
  const {
    idMeal = '',
    idDrink = '',
    strArea = '',
    strMealThumb = '',
    strAlcoholic = '',
    strDrinkThumb = '',
    strMeal = '',
    strDrink = '',
    strCategory = '',
  } = data;
  const objectToSet = {
    id: idMeal || idDrink,
    type: idMeal ? 'meal' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strDrinkThumb || strMealThumb,
  };
  if (isFavorited) {
    const filteredFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    )
      .filter((favoriteRecipe) => Number(favoriteRecipe.id)
      !== Number(id));
    if (filteredFavoriteRecipes.length === 0) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));
    }
    setIsFavorited(false);
  } else {
    if (localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          [...JSON.parse(localStorage.getItem('favoriteRecipes')), objectToSet],
        ),
      );
      setIsFavorited(true);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([objectToSet]));
    setIsFavorited(true);
  }
};
