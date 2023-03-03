// import renderWithRouter from './renderWithRouter';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';

// const mockFetch = () => {
//   jest.spyOn(global, 'fetch')
//     .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(testData) }));
// };

describe('teste do página de login', () => {
//   beforeEach(mockFetch);
//   afterEach(cleanup);
  it('Inputs na página de login', async () => {
    renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const buttonInput = await screen.findByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '2356');
    expect(buttonInput).toBeDisabled();

    userEvent.type(passwordInput, '123567');
    userEvent.click(buttonInput);
  });
});
