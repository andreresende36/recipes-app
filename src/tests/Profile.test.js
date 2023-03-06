// import renderWithRouter from './renderWithRouter';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';
import Profile from '../pages/Profile';

// const mockFetch = () => {
//   jest.spyOn(global, 'fetch')
//     .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(testData) }));
// };

const mockLocalStorage = (function () {
  let store = { user: JSON.stringify({ email: 'email@email.com' }) };
  return {
    getItem(key) {
      return store[key];
    },

    clear() {
      store = {};
    },
  };
}());

describe('Testes da página de Profile', () => {
  beforeEach(() => Object.defineProperty(window, 'localStorage', { value: mockLocalStorage }));
  //   afterEach(cleanup);
  it('Inputs na página de profile', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <Profile />
        </HeaderProvider>
      </RecipesProvider>,
    );
    const email = await screen.findByTestId('profile-email');
    const buttonProfileDone = await screen.findByTestId('profile-done-btn');
    const buttonFavorite = await screen.findByTestId('profile-favorite-btn');

    expect(email).toBeInTheDocument();
    expect(buttonProfileDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();

    userEvent.click(buttonFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testando Profile-done-btn', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <Profile />
        </HeaderProvider>
      </RecipesProvider>,
    );
    const email = await screen.findByTestId('profile-email');
    const buttonProfileDone = await screen.findByTestId('profile-done-btn');
    const buttonFavorite = await screen.findByTestId('profile-favorite-btn');

    expect(email).toBeInTheDocument();
    expect(buttonProfileDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();

    userEvent.click(buttonProfileDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testing localStorage', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <Profile />
        </HeaderProvider>
      </RecipesProvider>,
    );

    const buttonLogout = await screen.findByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
});
