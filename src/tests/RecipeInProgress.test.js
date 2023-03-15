import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import HeaderProvider from '../context/HeaderProvider';
import * as mockFunction from '../helpers/handleClickFavorite';

const MEAL_MOCK_URL = '/meals/53013/in-progress';
const DRINK_MOCK_URL = '/drinks/14610/in-progress';
const FIRST_INGREDIENT = '0-ingredient-step';
const BIG_MAC_URL = 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg';
const ACID_DRINK_URL = 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg';
const favoriteMockRecipes = [
  {
    id: '53013',
    type: 'meal',
    nationality: 'American',
    category: 'Beef',
    alcoholicOrNot: '',
    name: 'Big Mac',
    image: BIG_MAC_URL,
  },
  {
    id: '14610',
    type: 'drink',
    nationality: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: 'ACID',
    image: ACID_DRINK_URL,
  }];

const inProgressMockRecipes = {
  drinks: { 14610: ['151 proof rum 1 oz Bacardi '] },
  meals: { 53013: ['Minced Beef 400g', 'White Wine Vinegar 2 tsp', 'Onion Chopped', 'Paprika 1/2 tsp', 'Dill Pickles 2 large', 'Mayonnaise 1 cup '] },
};

const regexIsoString = /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/;

const doneMockRecipesMeals = [{
  id: '53013',
  type: 'meal',
  nationality: 'American',
  category: 'Beef',
  alcoholicOrNot: '',
  name: 'Big Mac',
  image: BIG_MAC_URL,
  doneDate: regexIsoString,
  tags: [],
}];

const doneMockRecipesDrinks = [{
  id: '14610',
  type: 'drink',
  nationality: '',
  category: 'Shot',
  alcoholicOrNot: 'Alcoholic',
  name: 'ACID',
  image: ACID_DRINK_URL,
  doneDate: expect.stringMatching(regexIsoString),
  tags: [],
}];

const aquamarineRoute = '/drinks/178319';
const aquamarineSrc = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';
const favoriteBtnTestID = 'favorite-btn';
const finishRecipeBtnID = 'finish-recipe-btn';

const favoriteButton = () => screen.getByTestId('favorite-btn');

describe('Teste do componente RecipeInProgress.jsx', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Verifica se a foto da receita está na página', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    }, { timeout: 10000 });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const photoURLMeal = BIG_MAC_URL;
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.alt).toBe('Big Mac');
    expect(recipePhoto.src).toBe(photoURLMeal);
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    const photoURLDrink = ACID_DRINK_URL;
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.alt).toBe('ACID');
    expect(recipePhoto.src).toBe(photoURLDrink);
  });

  it('Verifica se os botões de compartilhar e favoritar estão na página', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const shareBtn = screen.getByRole('img', { name: 'share-icon' });
    const favBtn = screen.getByRole('img', { name: 'favorite-icon' });
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
  });

  it('Verifica se o título e a categoria são exibidas na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Big Mac');
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Beef');
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('ACID');
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Shot');
  });

  it('Verifica se as instruções para a receita está na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    expect(instructions).toBeInTheDocument();
  });

  it('Verifica se o botão de favoritar está no modo favoritado caso a receita se encontre no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteMockRecipes));
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    expect(favoriteButton().src).toContain('blackHeartIcon');
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    expect(favoriteButton().src).toContain('blackHeartIcon');
  });

  it('Meals - Verifica se os ingredientes checkados estão sendo salvos no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    }, { timeout: 10000 });
    const inProgressRecipes = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes.meals[53013]).toEqual([]);
    userEvent.click(screen.getByTestId(FIRST_INGREDIENT));
    const inProgressRecipesAfterClick = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipesAfterClick.meals[53013]).toEqual(['Minced Beef 400g']);
  });

  it('Drinks - Verifica se os ingredientes checkados estão sendo salvos no localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const inProgressRecipes = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipes.drinks[14610]).toEqual([]);
    userEvent.click(screen.getByTestId(FIRST_INGREDIENT));
    const inProgressRecipesAfterClick = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(inProgressRecipesAfterClick.drinks[14610]).toEqual(['151 proof rum 1 oz Bacardi ']);
  });

  it('Meals - Verifica se os ingredientes abrem checkados de acordo com o localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMockRecipes));
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const allCheckbox = screen.getAllByTestId('checkbox');
    const filteredCheckboxes = allCheckbox.filter(
      (checkbox) => inProgressMockRecipes.meals[53013].some(
        (item) => item === checkbox.value,
      ),
    );
    expect(filteredCheckboxes.some((checkbox) => checkbox.checked === false)).toBeFalsy();
    filteredCheckboxes.forEach((item) => {
      userEvent.click(item);
    });
    const updatedLocalStorage = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(updatedLocalStorage.meals).toMatchObject({});
  });

  it('Drinks - Verifica se os ingredientes abrem checkados de acordo com o localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMockRecipes));
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const allCheckbox = screen.getAllByTestId('checkbox');
    const filteredCheckboxes = allCheckbox.filter(
      (checkbox) => inProgressMockRecipes.drinks[14610].some(
        (item) => item === checkbox.value,
      ),
    );
    expect(filteredCheckboxes.some((checkbox) => checkbox.checked === false)).toBeFalsy();
    filteredCheckboxes.forEach((item) => {
      userEvent.click(item);
    });
    const updatedLocalStorage = JSON.parse(window.localStorage.getItem('inProgressRecipes'));
    expect(updatedLocalStorage.meals).toMatchObject({});
  });

  it('Meals - Testa se o botão Finish Recipe só habilita ao selecionar todos os ingredientes, se é direcionado para a página Done Recipes e se é salvo no localStorage', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const allCheckbox = screen.getAllByTestId('checkbox');
    const finishBtn = screen.getByTestId(finishRecipeBtnID);
    expect(allCheckbox.some((checkbox) => checkbox.checked === true)).toBeFalsy();
    expect(finishBtn).toBeDisabled();
    allCheckbox.forEach((item) => {
      userEvent.click(item);
    });
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
    const doneRecipes = JSON.parse(window.localStorage.getItem('doneRecipes'));
    expect(doneRecipes).toMatchObject(doneMockRecipesMeals);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Drinks - Testa se o botão Finish Recipe só habilita ao selecionar todos os ingredientes, se é direcionado para a página Done Recipes e se é salvo no localStorage', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const allCheckbox = screen.getAllByTestId('checkbox');
    const finishBtn = screen.getByTestId(finishRecipeBtnID);
    expect(allCheckbox.some((checkbox) => checkbox.checked === true)).toBeFalsy();
    expect(finishBtn).toBeDisabled();
    allCheckbox.forEach((item) => {
      userEvent.click(item);
    });
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
    const doneRecipes = JSON.parse(window.localStorage.getItem('doneRecipes'));
    expect(doneRecipes).toMatchObject(doneMockRecipesDrinks);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Meals - Testa se ao entrar na refeição BIG MAC e clicar em copiar a cópia é feita corretamente', () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push(MEAL_MOCK_URL);
    });

    userEvent.click(screen.getByTestId('share-btn'));
    expect(mockedWriteText).toHaveBeenCalledWith('http://localhost:3000/meals/53013');
  });

  it('Drinks - Testa se ao entrar no drink ACID e clicar em copiar a cópia é feita corretamente', () => {
    const mockedWriteText = jest.fn();

    navigator.clipboard = {
      writeText: mockedWriteText,
    };
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );

    act(() => {
      history.push(DRINK_MOCK_URL);
    });

    userEvent.click(screen.getByTestId('share-btn'));
    expect(mockedWriteText).toHaveBeenCalledWith('http://localhost:3000/drinks/14610');
  });

  it('testa se ao entrar no drink aquamarine com ele e só ele favoritado e clickar em favoritar, ele remove a chave favoritos', async () => {
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
        <App />
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

  it('testa se ao entrar no drink aquamarine com ele e mais um favoritados  e clickar em favoritar, ele remove a so a chave do aquamarine', async () => {
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
        <App />
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

  it('testa se ao entrar no drink aquamarine com nenhum favoritado e clickar em favoritar, ele adiciona a so a chave do aquamarine', async () => {
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
        <App />
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

  it('testa se ao entrar no drink aquamarine com nenhum favoritado e clickar em favoritar, ele adiciona a so a chave do aquamarine', async () => {
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
        <App />
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

  it('Testa se a função handleClickFavorite é chamada ao se clicar no botão de favorito', async () => {
    jest.spyOn(mockFunction, 'handleClickFavorite');
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMockRecipes));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(favoriteBtnTestID));
    expect(mockFunction.handleClickFavorite).toHaveBeenCalled();
  });

  it('Testa se ao finalizar uma segunda receita ela é incluída corretamente ao localStorage', async () => {
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMockRecipes));
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneMockRecipesMeals));
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const allFalseCheckbox = screen.getAllByRole('checkbox', { checked: false });
    allFalseCheckbox.forEach((item) => {
      userEvent.click(item);
    });
    const finishBtn = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(finishBtn);
    const doneRecipes = JSON.parse(window.localStorage.getItem('doneRecipes'));
    expect(doneRecipes[1]).toMatchObject(doneMockRecipesDrinks[0]);
  });

  it('Testa se ao faltar uma medida é renderizado apenas "" no lugar', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      window.localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {
          15997: ['Galliano 2 1/2 shots ', 'Ice ', 'Ginger ale '],
        },
        meals: {},
      }));
      history.push('/drinks/15997/in-progress');
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue(/ginger ale/i).value).toBe('Ginger ale ');
    expect(screen.getByTestId('2-ingredient-step').textContent).toBe('Ingrediente 3: Ice ');
  });
  it('Testa se ao entrar na bebida B-52 in progress com ela favoritada aparece favoritada e se as tags sao setadas', async () => {
    window.localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        15853: [],
      },
      meals: {},
    }));
    window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '15853',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      alcoholicOrNot: 'Alcoholic',
      name: 'B-52',
      image: 'https://www.thecocktaildb.com/images/media/drink/5a3vg61504372070.jpg',
    }]));
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks/15853/in-progress');
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
      expect(screen.getByTestId(favoriteBtnTestID).src).toBe('http://localhost/blackHeartIcon.svg');
    });
    const allFalseCheckbox = screen.getAllByRole('checkbox', { checked: false });
    allFalseCheckbox.forEach((item) => {
      userEvent.click(item);
    });
    const finishBtn = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(finishBtn);
  });
});
