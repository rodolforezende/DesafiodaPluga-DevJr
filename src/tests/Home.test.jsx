import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../pages/Home';
import MockResponse from './mockResponse';
import api from '../services/api';

jest.mock('axios');

describe('Testando a page Home', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: MockResponse });
  });
  it('Deve conter um placeholder com a mensagem de "BUSCAR FERRAMENTA"', async () => {
    const { getByPlaceholderText } = render(<Home />);
    expect(getByPlaceholderText(/BUSCAR FERRAMENTA/i)).toBeInTheDocument();
  });

  it('Verifica se requisição axios é feita', async () => {
    const { getByText } = render(<Home />);
    expect(getByText(/loading/i)).toBeInTheDocument();
    const response = await api();
    expect(response).toEqual({ data: MockResponse });
  });

  it('Verifica se requisição está aparecendo com os data-testId', async () => {
    const { findAllByTestId } = render(<Home />);
    const allCards = await findAllByTestId('card');
    expect(allCards[0]).toBeInTheDocument();
    expect(allCards[11]).toBeInTheDocument();
  });

  it('Verifica funcionamento dos botões', async () => {
    const { findByText } = render(<Home />);
    const backButton = await findByText(/back/i);
    const nextButton = await findByText(/next/i);
    expect(backButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
    fireEvent.click(nextButton);
    expect(backButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
  });

  it('Verificar fechar botão do modal e visualizar as últimas ferramentas estão em tela', async () => {
    const { findAllByTestId, findByText } = render(<Home />);
    const allCards = await findAllByTestId('card');
    fireEvent.click(allCards[0]);
    const viewTools = await findByText(/últimas ferramentas visualizadas/i);
    expect(viewTools).toBeInTheDocument();
    const closeButton = await findByText(/close/i);
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(viewTools).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();
  });
});
