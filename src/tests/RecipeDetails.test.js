import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HeaderProvider from '../context/HeaderProvider';
import '@testing-library/jest-dom';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página Recipe Details', () => {
  test('testa se ao entrar no detalhes do drink aquamarine as informações corretas são renderizadas', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push('/drinks/178319');
    });

    await waitFor(() => {
      const drinkImage = screen.getByTestId('recipe-photo');
      expect(drinkImage.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    });
    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent('Aquamarine');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Alcoholic');
    const lastRenderizedIngredient = screen.getByTestId('2-ingredient-name-and-measure');
    const notRenderizedIngredient = screen.queryByTestId('3-ingredient-name-and-measure');
    expect(lastRenderizedIngredient).toBeInTheDocument();
    expect(lastRenderizedIngredient).toHaveTextContent('Ingrediente 3: Banana Liqueur 1 oz');
    expect(notRenderizedIngredient).not.toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toHaveTextContent('Shake well in a shaker with ice. Strain in a martini glass.');
    await waitFor(() => {
      const lastRenderizedRecommendation = screen.getByTestId('5-recommendation-card');
      const notRenderizedRecommendation = screen.queryByTestId('6-recommendation-card');
      expect(lastRenderizedRecommendation).toBeInTheDocument();
      expect(screen.getByTestId('5-recommendation-title')).toHaveTextContent('Dal fry');
      expect(notRenderizedRecommendation).not.toBeInTheDocument();
    });
  });

  test('testa se ao entrar no detalhes do drink aquamarine as informações corretas são renderizadas', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push('/meals/52844');
    });

    await waitFor(() => {
      const drinkImage = screen.getByTestId('recipe-photo');
      expect(drinkImage.src).toBe('https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg');
    });
    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent('Lasagne');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Pasta');
    await waitFor(() => {
      const lastRenderizedIngredient = screen.getByTestId('14-ingredient-name-and-measure');
      const notRenderizedIngredient = screen.queryByTestId('15-ingredient-name-and-measure');
      expect(lastRenderizedIngredient).toBeInTheDocument();
      expect(lastRenderizedIngredient).toHaveTextContent('Ingrediente 15: Basil Leaves Topping');
      expect(notRenderizedIngredient).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('instructions').textContent.includes('Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board')).toBe(true);
    await waitFor(() => {
      const lastRenderizedRecommendation = screen.getByTestId('5-recommendation-card');
      const notRenderizedRecommendation = screen.queryByTestId('6-recommendation-card');
      expect(lastRenderizedRecommendation).toBeInTheDocument();
      expect(screen.getByTestId('5-recommendation-title')).toHaveTextContent('252');
      expect(notRenderizedRecommendation).not.toBeInTheDocument();
    });
  });
});
