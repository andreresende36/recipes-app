import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HeaderProvider from '../context/HeaderProvider';
import '@testing-library/jest-dom';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testa o componente Footer', () => {
  test('testa se ao clickar no icone de bebidas é redirecionado para /drinks e ao clickar no icone de comidas vai para meals', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(history.location.pathname).toBe('/meals');
  });
});
