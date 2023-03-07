import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCheckbox({ ingredientEntrie, measureEntries, index, recipeId }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = ({ target: { checked } }) => {
    setIsChecked(checked);
  };
  useEffect(() => {
    // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // const newArray = inProgressRecipes.map((recipe) => {
    //   if (recipe.id === recipeId) {
    //     return { id: recipe.id,
    //       ingredientIsChecked: { ...recipe.ingredientIsChecked, [index]: isChecked } };
    //   }
    //   return recipe;
    // });
    // localStorage.setItem('inProgressRecipes', JSON.stringify(newArray));
  }, [recipeId, index, isChecked]);
  return (
    <div>
      <label
        data-testid={ `${index}-ingredient-step` }
        className={ isChecked ? 'checked' : '' }
      >
        <input
          type="checkbox"
          checked={ isChecked }
          onChange={ handleCheck }
        />
        {`Ingrediente ${index + 1}: `}
        {ingredientEntrie[1]}
        {' '}
        {measureEntries[index] ? measureEntries[index][1] : ''}
        <br />
      </label>
    </div>
  );
}

IngredientCheckbox.propTypes = {
  ingredientEntrie:
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  measureEntries:
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
  index: PropTypes.number.isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default IngredientCheckbox;
