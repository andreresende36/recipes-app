import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
// import RecipesProvider from '../context/RecipesProvider';
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const stringifiedDoneRecipes = '[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg","doneDate":"23/06/2020","tags":["Pasta","Curry"]},{"id":"178319","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","name":"Aquamarine","image":"https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg","doneDate":"23/06/2020","tags":[]}]';

describe('Testa as rotas página de receitas conclúidas.', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(() => doneRecipes),
        getItem: jest.fn(() => stringifiedDoneRecipes),
      },
      writable: true,
    });
  });
  test('Testas se os links do Footer redirecionam para as rotas estão corretas', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <DoneRecipes />
      </HeaderProvider>,
    );

    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Testa se as rotas dos detalhes das receitas estão corretas', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <DoneRecipes />
      </HeaderProvider>,
    );

    userEvent.click(screen.getByTestId('0-horizontal-image'));
    expect(history.location.pathname).toBe('/meals/52771');

    userEvent.click(screen.getByTestId('1-horizontal-image'));
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

describe('Testa as funções da tela de receitas concluídas.', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(() => doneRecipes),
        getItem: jest.fn(() => stringifiedDoneRecipes),
      },
      writable: true,
    });
  });

  test('Verifica se a lista de receitas completas é recebida do localStorage ao carregar.', async () => {
    renderWithRouter(
      <HeaderProvider>
        <DoneRecipes />
      </HeaderProvider>,
    );

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('doneRecipes');

    // window.localStorage.setItem('donerecipes', 'aaa');
    // const a = window.localStorage.getItem('doneRecipes');
    // expect(a).toEqual(stringifiedDoneRecipes);
  });
  test('Testa os filtros por categoria.', () => {
    renderWithRouter(
      <HeaderProvider>
        <DoneRecipes />
      </HeaderProvider>,
    );

    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');

    const mealCard = screen.getByTestId('0-recipe-card');
    const drinkCard = screen.getByTestId('1-recipe-card');

    userEvent.click(filterByMealButton);
    expect(mealCard).toBeInTheDocument();
    expect(drinkCard).not.toBeInTheDocument();

    userEvent.click(filterByDrinkButton);
    expect(mealCard).not.toBeInTheDocument();
    expect(drinkCard).toBeInTheDocument();

    userEvent.click(filterByAllButton);
    expect(mealCard).toBeInTheDocument();
    expect(drinkCard).toBeInTheDocument();
  });
});
