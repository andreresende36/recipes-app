import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import HeaderProvider from '../context/HeaderProvider';
import '@testing-library/jest-dom';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const aquamarineRoute = '/drinks/178319';
const aquamarineSrc = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
const startRecipeBtnTestID = 'start-recipe-btn';
const favoriteBtnTestID = 'favorite-btn';

describe('Testa a página Recipe Details', () => {
  beforeEach(() => {
    window.localStorage.clear();
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
      history.push(aquamarineRoute);
    });

    await waitFor(() => {
      const drinkImage = screen.getByTestId('recipe-photo');
      expect(drinkImage.src).toBe(aquamarineSrc);
      const title = screen.getByTestId('recipe-title');
      expect(title).toHaveTextContent('Aquamarine');
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Alcoholic');
      const lastRenderizedIngredient = screen.getByTestId('2-ingredient-name-and-measure');
      const notRenderizedIngredient = screen.queryByTestId('3-ingredient-name-and-measure');
      expect(lastRenderizedIngredient).toBeInTheDocument();
      expect(lastRenderizedIngredient).toHaveTextContent('Ingrediente 3: Banana Liqueur 1 oz');
      expect(notRenderizedIngredient).not.toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toHaveTextContent('Shake well in a shaker with ice. Strain in a martini glass.');
    });
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

  test('testa se ao entrar no drink aquamarine sem mexer no localStorage aparece start Recipe', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    expect(screen.getByTestId(startRecipeBtnTestID)).toBeInTheDocument();
    expect(screen.getByTestId(startRecipeBtnTestID)).toHaveTextContent('Start Recipe');
  });

  test('testa se ao entrar no drink aquamarine e clickar em Start recipe é redirecionado corretamente', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    userEvent.click(screen.getByTestId(startRecipeBtnTestID));
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });

  test('testa se ao entrar no drink aquamarine e clickar em copiar a cópia é feita corretamente', () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    userEvent.click(screen.getByTestId('share-btn'));
    expect(mockedWriteText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
  test('testa se ao entrar no drink aquamarine com ele na doneRecipes não aparece o botão de começar a receita', () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify([{
      id: 178319,
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: aquamarineSrc,
    }]));
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    expect(screen.queryByTestId(startRecipeBtnTestID)).not.toBeInTheDocument();
  });

  test('testa se ao entrar no drink aquamarine com ele na doneRecipes não aparece o botão de começar a receita', () => {
    window.localStorage.setItem('doneRecipes', JSON.stringify([{
      id: 178319,
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: aquamarineSrc,
    }]));
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    expect(screen.queryByTestId(startRecipeBtnTestID)).not.toBeInTheDocument();
  });

  test('testa se ao entrar no drink aquamarine com ele na inProgress aparece o botão de continuar a receita', () => {
    window.localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        178319: ['ingredient1'],
      },
      meals: {

      },
    }));
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    expect(screen.getByTestId(startRecipeBtnTestID)).toHaveTextContent('Continue Recipe');
  });
  test('testa se ao entrar no drink aquamarine com ele e só ele favoritado e clickar em favoritar, ele remove a chave favoritos', async () => {
    const localStorageMock = (function bla() {
      let store = {};

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    }());

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: aquamarineSrc,
      }]));
    });

    userEvent.click(screen.getByTestId(favoriteBtnTestID));
    await waitFor(() => {
      expect(window.localStorage.getItem('favoriteRecipes')).toBeUndefined();
      const allItems = window.localStorage.getAll();
      expect(Object.keys(allItems).length).toBe(0);
    }, { timeout: 4000 });
  });

  test('testa se ao entrar no drink aquamarine com ele e mais um favoritados  e clickar em favoritar, ele remove a so a chave do aquamarine', async () => {
    const localStorageMock = (function bla() {
      let store = {};

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    }());

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: aquamarineSrc,
      },
      {
        id: '53065',
        type: 'meal',
        nationality: 'Japonese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }]));
    });

    userEvent.click(screen.getByTestId(favoriteBtnTestID));
    await waitFor(() => {
      const allItems = window.localStorage.getAll();
      expect(Object.keys(allItems).length).toBe(1);
    }, { timeout: 4000 });
  });

  test('testa se ao entrar no drink aquamarine com nenhum favoritado e clickar em favoritar, ele adiciona a so a chave do aquamarine', async () => {
    const localStorageMock = (function bla() {
      let store = {};

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    }());

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
    });

    userEvent.click(screen.getByTestId(favoriteBtnTestID));
    await waitFor(() => {
      const allItems = window.localStorage.getAll();
      expect(Object.keys(allItems).length).toBe(1);
    }, { timeout: 4000 });
  });

  test('testa se ao entrar no drink aquamarine com nenhum favoritado e clickar em favoritar, ele adiciona a so a chave do aquamarine', async () => {
    const localStorageMock = (function bla() {
      let store = {};

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    }());

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(aquamarineRoute);
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '53065',
        type: 'meal',
        nationality: 'Japonese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }]));
    });

    userEvent.click(screen.getByTestId(favoriteBtnTestID));
    await waitFor(() => {
      const allItems = window.localStorage.getAll();
      expect(Object.keys(allItems).length).toBe(1);
      expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toHaveLength(2);
    }, { timeout: 4000 });
  });
});
