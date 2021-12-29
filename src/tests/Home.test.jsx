import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Home from '../pages/Home';

describe('Testando a page Home', () => {
  it('Deve conter um placeholder com a mensagem de "BUSCAR FERRAMENTA"', () => {
    renderWithRouter(<Home />);

    const homeInput = screen.getByPlaceholderText(/BUSCAR FERRAMENTA/i);
    expect(homeInput).toBeTruthy();
  });

  it('Verificar DataTestId dos cards', () => {
    renderWithRouter(<Home />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toBeTruthy();
  });

  it('Botão para carregar mais itens', () => {
    renderWithRouter(<Home />);

    const button = screen.getByText(/Carregar mais/i);
    expect(button).toBeTruthy();
    fireEvent.click(button);
  });
});
