import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import HeaderProvider from '../context/HeaderProvider';
import '@testing-library/jest-dom';
import Drinks from '../pages/Drinks';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const searchBtnTestId = 'search-top-btn';
const profileBtnTestId = 'profile-top-btn';

describe('Testa o componente Header', () => {
  it('testa se mostra o titulo e o icone de profile e o icone de search', () => {
    render(
      <RecipesProvider>
        <HeaderProvider>
          <Drinks />
        </HeaderProvider>
      </RecipesProvider>,
    );
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByTestId(profileBtnTestId)).toBeInTheDocument();
    expect(screen.getByTestId(searchBtnTestId)).toBeInTheDocument();
  });

  it('testa se ao clickar no botão de procurar o input da barra de busca aparece', () => {
    render(
      <RecipesProvider>
        <HeaderProvider>
          <Drinks />
        </HeaderProvider>
      </RecipesProvider>,
    );
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('testa se é possível digitar no search input', () => {
    render(
      <RecipesProvider>
        <HeaderProvider>
          <Drinks />
        </HeaderProvider>
      </RecipesProvider>,
    );
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'bla');
    expect(searchInput).toHaveValue('bla');
  });

  it('testa se ao clickar no profile é redirecionado pro profile', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const profileBtn = screen.getByTestId(profileBtnTestId);
    userEvent.click(profileBtn);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
