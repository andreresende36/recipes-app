import React from 'react';
import PropTypes from 'prop-types';

function IngredientCheckbox({
  ingredientEntrie,
  measureEntries,
  index,
  ingredientsUsed,
  setIngredientsUsed,
  isChecked,
  setDeleteItem }) {
  const handleCheck = ({ target: { value, checked } }) => {
    if (checked) {
      setIngredientsUsed([...ingredientsUsed, value]);
    } else {
      const newIngredients = ingredientsUsed.filter((item) => item !== value);
      setIngredientsUsed(newIngredients);
      if (newIngredients.length === 0) {
        setDeleteItem(true);
      }
    }
  };
  return (
    <div>
      <label
        data-testid={ `${index}-ingredient-step` }
        className={ isChecked ? 'checked' : '' }
      >
        <input
          type="checkbox"
          value={ `${ingredientEntrie[1]} ${measureEntries[index][1]}` }
          checked={ isChecked }
          onChange={ handleCheck }
        />
        {`Ingrediente ${index + 1}: `}
        {`${ingredientEntrie[1]} ${measureEntries[index][1]}`}
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
  ingredientsUsed: PropTypes.arrayOf(PropTypes.string).isRequired,
  setIngredientsUsed: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
};

export default IngredientCheckbox;
