import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
// import FavoriteRecipes from '../pages/FavoriteRecipes';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testes da tela de receitas favoritas', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  //
  const favoriteRecipes = '/favorite-recipes';
  const horizontalName1 = '0-horizontal-name';
  const horizontalName2 = '1-horizontal-name';
  it('Verifica se a página contém todos os elementos necessários', () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      history.push(favoriteRecipes);
    });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
  });

  it('Verifica se ao adicionar um drink aos favoritos ele é corretamente renderizado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '13938',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Alcoholic',
        name: 'AT&T',
        image: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg',
      }]));
    });

    history.push(favoriteRecipes);

    const mealName = await screen.findByTestId(horizontalName1);
    const mealImage = screen.getByTestId('0-horizontal-image');
    const mealTopText = screen.getByTestId('0-horizontal-top-text');
    const favoriteImage = screen.getByTestId('0-horizontal-favorite-btn');
    expect(mealName).toBeInTheDocument();
    expect(mealImage).toBeInTheDocument();
    expect(mealTopText).toBeInTheDocument();
    expect(mealName).toHaveTextContent('AT&T');
    expect(mealImage.src).toBe('https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg');
    expect(favoriteImage.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  it('Verifica se ao adicionar um meal aos favoritos ele é corretamente renderizado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

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

    const mealName = await screen.findByTestId(horizontalName1);
    const mealImage = screen.getByTestId('0-horizontal-image');
    const mealTopText = screen.getByTestId('0-horizontal-top-text');
    expect(mealName).toBeInTheDocument();
    expect(mealImage).toBeInTheDocument();
    expect(mealTopText).toBeInTheDocument();
    expect(mealName).toHaveTextContent('Sushi');
    expect(mealImage.src).toBe('https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg');
  });

  it('Verifica se ao clicar no botão de filtro de bebida as receitas filtradas são mostradas', async () => {
    const {
      history,
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
      },
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
      ]));
    });

    history.push(favoriteRecipes);

    userEvent.click(await screen.findByTestId('filter-by-drink-btn'));

    const drinkName1 = await screen.findByTestId(horizontalName1);
    const drinkName2 = screen.getByTestId(horizontalName2);
    expect(drinkName1).toHaveTextContent('ABC');
    expect(drinkName2).toHaveTextContent('Aquamarine');
  });

  it('Verifica se ao clicar no botão de filtro de comidas as receitas filtradas são mostradas', async () => {
    const {
      history,
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
      },
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
      {
        id: '52978',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Kumpir',
        image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
      },
      ]));
    });

    history.push(favoriteRecipes);

    userEvent.click(await screen.findByTestId('filter-by-meal-btn'));

    const mealName1 = await screen.findByTestId(horizontalName1);
    const mealName2 = screen.getByTestId(horizontalName2);
    expect(mealName1).toHaveTextContent('Corba');
    expect(mealName2).toHaveTextContent('Kumpir');
  });

  it('Verifica se ao clicar no botão de filtro "All" todas as receitas são mostradas', async () => {
    const {
      history,
    } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    history.push(favoriteRecipes);

    userEvent.click(await screen.findByTestId('filter-by-all-btn'));

    waitFor(async () => {
      const drinkName1 = await screen.findByTestId(horizontalName1);
      const mealName1 = screen.getByTestId(horizontalName2);
      expect(drinkName1).toHaveTextContent('ABC');
      expect(mealName1).toHaveTextContent('Corba');
    });
  });
  it('Verifica se ao clickar em copiar ele copia o link certo', async () => {
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
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '52804',
        type: 'meal',
        nationality: '',
        category: 'Miscellaneous',
        alcoholicOrNot: 'Alcoholic',
        name: 'Poutine',
        image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
      }]));
    });

    history.push(favoriteRecipes);

    const copyBtn1 = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(copyBtn1);
  });
  it('Verifica se ao clickar no coração o item é removido dos favoritos', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );

    act(() => {
      window.localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '52804',
        type: 'meal',
        nationality: '',
        category: 'Miscellaneous',
        alcoholicOrNot: 'Alcoholic',
        name: 'Poutine',
        image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
      },
      {
        id: '52978',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Kumpir',
        image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
      }]));
    });

    history.push(favoriteRecipes);

    const favoriteBtn1 = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn1);
    expect(screen.getByTestId(horizontalName1)).toHaveTextContent('Kumpir');
  });
});
