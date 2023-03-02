import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderProvider from '../context/HeaderProvider';
import Header from '../components/Header';
import '@testing-library/jest-dom';

const searchBtnTestId = 'search-top-btn';

describe('Testa o componente Header', () => {
  it('testa se mostra o titulo e o icone de profile e o icone de search', () => {
    render(
      <HeaderProvider>
        <Header headerType={ { title: 'Drinks', profileIcon: true, searchIcon: true } } />
      </HeaderProvider>,
    );
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId(searchBtnTestId)).toBeInTheDocument();
  });

  it('testa se mostra o titulo , e n mostra os icones de profile e search', () => {
    render(
      <HeaderProvider>
        <Header headerType={ { title: 'Drinks', profileIcon: false, searchIcon: false } } />
      </HeaderProvider>,
    );

    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId(searchBtnTestId)).not.toBeInTheDocument();
  });

  it('testa se ao clickar no botão de procurar o input da barra de busca aparece', () => {
    render(
      <HeaderProvider>
        <Header headerType={ { title: 'Drinks', profileIcon: true, searchIcon: true } } />
      </HeaderProvider>,
    );
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('testa se é possível digitar no search input', () => {
    render(
      <HeaderProvider>
        <Header headerType={ { title: 'Drinks', profileIcon: true, searchIcon: true } } />
      </HeaderProvider>,
    );
    const searchBtn = screen.getByTestId(searchBtnTestId);
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'bla');
    expect(searchInput).toHaveValue('bla');
  });
});
