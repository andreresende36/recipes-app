import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import HeaderProvider from '../context/HeaderProvider';
import renderWithRouter from './helpers/renderWithRouter';

jest.setTimeout(20000);
const firstButton = '0-recipe-button';

describe('Teste do componente RecipeCard', () => {
  it('Meals - Testa se ao clicar no botão de receita é redirecionado corretamente', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByTestId(firstButton)).toBeInTheDocument();
    }, { timeout: 10000 });
    userEvent.click(screen.getByTestId(firstButton));
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Drinks - Testa se ao clicar no botão de receita é redirecionado corretamente', async () => {
    const { history } = renderWithRouter(
      <HeaderProvider>
        <App />
      </HeaderProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(screen.getByTestId(firstButton)).toBeInTheDocument();
    }, { timeout: 10000 });
    userEvent.click(screen.getByTestId(firstButton));
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
