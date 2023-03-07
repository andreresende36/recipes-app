import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const MEAL_MOCK_URL = '/meals/53013/in-progress';
const DRINK_MOCK_URL = '/drinks/14610/in-progress';
const FIRST_INGREDIENT = '0-ingredient-step';

describe('Teste do componente RecipeInProgress.jsx', () => {
  it('Verifica se a foto da receita está na página', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(MEAL_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT)).toBeInTheDocument();
    });
    const recipePhoto = screen.getByTestId('recipe-photo');
    const photoURLMeal = 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg';
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.alt).toBe('Big Mac');
    expect(recipePhoto.src).toBe(photoURLMeal);
    act(() => {
      history.push(DRINK_MOCK_URL);
    });
    await waitFor(() => {
      expect(screen.getByTestId(FIRST_INGREDIENT).textContent).toContain('Bacardi');
    });
    const photoURLDrink = 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg';
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
    const shareBtn = screen.getByRole('img', { name: 'share icon' });
    const favBtn = screen.getByRole('img', { name: 'favorite icon' });
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
});
