import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HeaderProvider from '../context/HeaderProvider';
import '@testing-library/jest-dom';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const searchIconBtnTestId = 'search-top-btn';
const searchInputTestId = 'search-input';
const searchSubmitBtnTestId = 'exec-search-btn';
const nameRadioTestId = 'name-search-radio';
const firstLetterTestId = 'first-letter-search-radio';

describe('Testa o componente search bar', () => {
  test('deveria renderizar apenas os meals certos quando digito big com o input selecionado name', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const nameRadio = screen.getByTestId(nameRadioTestId);
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'big');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const lastRenderizedMeal = await screen.findByTestId('1-recipe-card');
      const notRenderizedMeal = screen.queryByTestId('5-recipe-card');
      expect(lastRenderizedMeal).toBeInTheDocument();
      expect(notRenderizedMeal).not.toBeInTheDocument();
    });
  });

  test('deveria renderizar apenas os meals certos quando digito lettuce com o input de ingrediente selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'lettuce');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const lastRenderizedMeal = await screen.findByTestId('2-recipe-card');
      const notRenderizedMeal = screen.queryByTestId('3-recipe-card');
      expect(lastRenderizedMeal).toBeInTheDocument();
      expect(notRenderizedMeal).not.toBeInTheDocument();
    }, { timeout: 4000 });
  });

  test('deveria renderizar apenas os meals certos quando digito p com o input de first letter selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'p');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const renderizedMeal1 = await screen.findByTestId('11-card-name');
      const renderizedMeal2 = screen.getByTestId('4-card-name');
      expect(renderizedMeal1).toHaveTextContent('Provençal Omelette Cake');
      expect(renderizedMeal2).toHaveTextContent('Pork Cassoulet');
    }, { timeout: 4000 });
  });

  test('deveria renderizar apenas os drinks certos quando digito aquamarine com o input de ingredient selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const nameRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(nameRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'whiskey');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const lastRenderizedMeal = await screen.findByTestId('2-card-name');
      const notRenderizedMeal = screen.queryByTestId('3-card-name');
      expect(lastRenderizedMeal).toBeInTheDocument();
      expect(notRenderizedMeal).not.toBeInTheDocument();
      expect(lastRenderizedMeal).toHaveTextContent('Owen\'s Grandmother\'s Revenge');
    }, { timeout: 4000 });
  });

  test('deveria ser redirecionado pra tela de detalhes do aquamarine quando digitar aquamarine no input com name selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const firstLetterRadio = screen.getByTestId(nameRadioTestId);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'aquamarine');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    }, { timeout: 4000 });
  });

  test('deveria ser redirecionado pra tela de detalhes da corba quando digitar corba no input com name selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const firstLetterRadio = screen.getByTestId(nameRadioTestId);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'corba');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52977');
    }, { timeout: 4000 });
  });
  test('deveria renderizar apenas os drinks certos quando digito p com o input de first letter selecionado', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'p');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      const renderizedMeal1 = await screen.findByTestId('11-card-name');
      const renderizedMeal2 = screen.getByTestId('4-card-name');
      expect(renderizedMeal1).toHaveTextContent('Pure Passion');
      expect(renderizedMeal2).toHaveTextContent('Pink Lady');
    }, { timeout: 4000 });
  });
  test('deveria aparecer um alerta ao tentar buscar algo no first letter com mais de uma letra', async () => {
    jest.spyOn(global, 'alert');
    const { history } = renderWithRouter(
      <HeaderProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIconBtn = screen.getByTestId(searchIconBtnTestId);
    userEvent.click(searchIconBtn);
    const firstLetterRadio = screen.getByTestId(firstLetterTestId);
    userEvent.click(firstLetterRadio);
    const searchInput = screen.getByTestId(searchInputTestId);
    userEvent.type(searchInput, 'pe');
    const searchSubmitBtn = screen.getByTestId(searchSubmitBtnTestId);
    userEvent.click(searchSubmitBtn);
    await waitFor(async () => {
      expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    }, { timeout: 4000 });
  });
});
