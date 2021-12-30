import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../pages/Home';
import MockResponse from './mockResponse';
import api from '../services/api';

jest.mock('axios');

describe('Testando a page Home', () => {
  it('Deve conter um placeholder com a mensagem de "BUSCAR FERRAMENTA"', async () => {
    const { getByPlaceholderText } = render(<Home />);
    expect(getByPlaceholderText(/BUSCAR FERRAMENTA/i)).toBeInTheDocument();
  });

  it('Verifica se requisição axios é feita', async () => {
    axios.get.mockResolvedValue(MockResponse);
    const { getByText } = render(<Home />);
    expect(getByText(/loading/i)).toBeInTheDocument();
    const response = await api();
    expect(response).toEqual(MockResponse);
  });

  it('Verifica se requisição está aparecendo com os data-testId', async () => {
    axios.get.mockResolvedValue(MockResponse);
    const { findAllByTestId } = render(<Home />);
    await waitFor(() => {
      const allCards = findAllByTestId('card');
      allCards.then((el) => {
        console.log(el);
      }).catch((error) => console.log(error));
    });
  });

  it('Verifica se a quantidade de cards é <= 12', async () => {

  });
});
