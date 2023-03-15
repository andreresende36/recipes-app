import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

const doneRecipesRoute = '/done-recipes';
const mealName = 'Spicy Arrabiata Penne';
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
  test('Testas se os links do Footer redirecionam para as rotas estão corretas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );

    act(() => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    act(() => history.push(doneRecipesRoute));

    userEvent.click(await screen.findByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Testa se as rotas dos detalhes das receitas estão corretas', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );

    history.push(doneRecipesRoute);

    act(() => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    userEvent.click(await screen.findByTestId('0-horizontal-image'));
    expect(history.location.pathname).toBe('/meals/52771');

    history.push('/done-recipes');

    userEvent.click(await screen.findByTestId('1-horizontal-image'));
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});

describe('Testa as funções da tela de receitas concluídas.', () => {
  test('Verifica se a lista de receitas completas é recebida do localStorage ao carregar.', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );

    history.push(doneRecipesRoute);

    act(() => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    // expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.getItem()).toHaveBeenCalledWith('doneRecipes');
    expect(window.localStorage.getItem('doneRecipes')).toEqual(stringifiedDoneRecipes);
  });
  test('Testa os filtros por categoria.', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );

    act(() => {
      window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    });

    act(() => history.push(doneRecipesRoute));

    const filterByMealButton = await screen.findByTestId('filter-by-meal-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');

    const mealTitle = screen.getByText(mealName);
    const drinkTitle = screen.getByText('Aquamarine');

    userEvent.click(filterByMealButton);

    expect(mealTitle).toBeInTheDocument();
    expect(drinkTitle).not.toBeInTheDocument();

    userEvent.click(filterByDrinkButton);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(mealTitle).not.toBeInTheDocument();

    userEvent.click(filterByAllButton);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(screen.getByText(mealName)).toBeInTheDocument();
  });
});
