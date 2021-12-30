import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
// import renderWithRouter from './renderWithRouter';
import Home from '../pages/Home';
import mockResponse from './mockResponse';

jest.mock('Axios');

describe('Testando a page Home', () => {
  // it('Deve conter um placeholder com a mensagem de "BUSCAR FERRAMENTA"', async () => {
  //   renderWithRouter(<Home />);
  //   const homeInput = screen.getByPlaceholderText(/BUSCAR FERRAMENTA/i);
  //   expect(homeInput).toBeTruthy();
  // });

  it('Verifica se requisição dos cards aparecem em tela com a quantidade certa', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);
    const { getAllByTestId, getByText } = render(<Home />);
    expect(getByText(/loading/i)).toBeInTheDocument();
    console.log(await getByText(/omie/i));
    const cardValues = await waitForElement(() => getAllByTestId('card').map((card) => card));
    expect(cardValues).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith('https://pluga.co/ferramentas_search.json');
    expect(axios.get).toHaveBeenCalled(1);
  });

  // it('Botão de avançar página', async () => {
  //   axios.get.mockResolvedValueOnce(mockResponse);
  //   renderWithRouter(<Home />);
  //   const cards = await screen.findAllByTestId('card');
  //   expect(cards).toBeTruthy();
  //   const button = screen.getByText(/next/i);
  //   expect(button).toBeTruthy();
  //   fireEvent.click(button);
  // });
});
