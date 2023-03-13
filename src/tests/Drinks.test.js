import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import HeaderProvider from '../context/HeaderProvider';

const firstCardName = '0-card-name';
const cocktailCategory = 'Cocktail-category-filter';
jest.setTimeout(60000);

describe('Teste do componente Drinks.jsx', () => {
  it('Teste do botão de remover todos os filtros', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(screen.getByTestId(cocktailCategory)).toBeInTheDocument();
      expect(screen.getByTestId(firstCardName)).toBeInTheDocument();
    }, { timeout: 10000 });
    const initialArrayRecipeNames = [];
    const cocktailArrayRecipeNames = [];
    const finalArrayRecipeNames = [];
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      initialArrayRecipeNames.push(recipeName.textContent);
    }
    userEvent.click(screen.getByTestId(cocktailCategory));
    await waitFor(() => {
      expect(screen.getByTestId(firstCardName).textContent).toBe('155 Belmont');
    }, { timeout: 10000 });
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      cocktailArrayRecipeNames.push(recipeName.textContent);
    }
    expect(initialArrayRecipeNames).not.toEqual(cocktailArrayRecipeNames);
    userEvent.click(screen.getByTestId('All-category-filter'));
    await waitFor(() => {
      expect(screen.getByTestId(firstCardName).textContent).toBe('GG');
    }, { timeout: 10000 });
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      finalArrayRecipeNames.push(recipeName.textContent);
    }
    expect(initialArrayRecipeNames).toEqual(finalArrayRecipeNames);
  });

  it('Drinks - Testa se ao apertar 2 vezes num botão de categoria na primeira ele filtra a categoria e na segunda ele exclui o filtro', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(screen.getByTestId(cocktailCategory)).toBeInTheDocument();
      expect(screen.getByTestId(firstCardName)).toBeInTheDocument();
    }, { timeout: 10000 });
    const initialArrayRecipeNames = [];
    const cocktailArrayRecipeNames = [];
    const finalArrayRecipeNames = [];
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      initialArrayRecipeNames.push(recipeName.textContent);
    }
    userEvent.click(screen.getByTestId(cocktailCategory));
    await waitFor(() => {
      expect(screen.getByTestId(firstCardName).textContent).toBe('155 Belmont');
    }, { timeout: 10000 });
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      cocktailArrayRecipeNames.push(recipeName.textContent);
    }
    expect(initialArrayRecipeNames).not.toEqual(cocktailArrayRecipeNames);
    userEvent.click(screen.getByTestId(cocktailCategory));
    await waitFor(() => {
      expect(screen.getByTestId(firstCardName).textContent).toBe('GG');
    }, { timeout: 10000 });
    for (let i = 0; i <= 11; i += 1) {
      const recipeName = screen.getByTestId(`${i}-card-name`);
      finalArrayRecipeNames.push(recipeName.textContent);
    }
    expect(initialArrayRecipeNames).toEqual(finalArrayRecipeNames);
  });
});
