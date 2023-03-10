import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testes da tela de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const favoriteRecipes = '/favorite-recipes';
  it('Verifica se a página contém todos os elementos necessários', () => {
    const { getByTestId } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </HeaderProvider>,
    );
    // history.push(favoriteRecipes);

    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    // expect(getByTestId('0-horizontal-name')).toBeInTheDocument();
    // expect(getByTestId('0-horizontal-image')).toBeInTheDocument();
    // expect(getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    // expect(getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    // expect(getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de filtro de comida as receitas filtradas são mostradas', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    // fireEvent.click(screen.getByTestId('filter-by-meal-btn'));

    act(() => {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '53065',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }]));
    });

    history.push(favoriteRecipes);

    const filteredMeals = await screen.findByTestId('0-horizontal-name');
    expect(filteredMeals).toBeInTheDocument();
    // expect(filteredMeals.length).toBeLessThan(queryAllByTestId(/horizontal-name/).length);
  });

  it('Verifica se ao clicar no botão de filtro de bebida as receitas filtradas são mostradas', () => {
    const {
      history,
      getByTestId,
    } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '13501',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: 'ABC',
        image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      }]));
    });

    history.push(favoriteRecipes);

    fireEvent.click(getByTestId('filter-by-drink-btn'));

    expect(filteredDrinks).toBeInTheDocument();
    // expect(filteredDrinks.length).toBeLessThan(queryAllByTestId(/horizontal-name/).length);
  });

  it('Verifica se ao clicar no botão de filtro "All" todas as receitas são mostradas', () => {
    const {
      getByTestId,
      queryAllByTestId,
      history,
    } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </HeaderProvider>,
    );
    history.push(favoriteRecipes);

    fireEvent.click(getByTestId('filter-by-all-btn'));

    const allRecipes = queryAllByTestId(/horizontal-name/);
    expect(allRecipes.length).toBeGreaterThan(0);
  });
});
