import {
  getMeals,
  getDrinks } from '../services/apiServices';

describe('Teste dos erros funções getMeals e getDrinks', () => {
  it('Meals - Teste se uma URL de pesquisa inválida retorna um array vazio', async () => {
    const result = await getMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=teste_errado', 10);
    expect(result).toEqual([]);
  });
  it('Drinks Teste se uma URL de pesquisa inválida retorna um array vazio', async () => {
    const result = await getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=teste_errado', 10);
    expect(result).toEqual([]);
  });
});
