import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ItemsListPage from '../../pages/ItemsList';
import axios from 'axios';
import '@testing-library/jest-dom';
import { productsData } from '../mocks/product.mocks';
import { materialsData } from '../mocks/material.mocks';

jest.mock('axios');

describe('Tests for ItemsListPage', () => {
  describe('Tests /products', () => {
    beforeEach(() => {
      (axios.get as jest.Mock).mockImplementation(async () =>
        Promise.resolve({
          data: productsData,
        }),
      );
    });

    it('Should fetch the correct type of data', async () => {
      const route = '/products';

      const { findByTestId } = renderWithRouter(<ItemsListPage />, { route });
      await findByTestId('item-row-0');

      expect(axios.get).toBeCalled();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(route));
    });

    it('Should display the correct table headers and data', async () => {
      const route = '/products';
      const headers = ['Nome', 'Valor', 'Criáveis', 'Sub-total'];
      const testids = ['name', 'value', 'craftable', 'subtotal'];

      const { findByTestId, getByRole, getByTestId } = renderWithRouter(
        <ItemsListPage />,
        {
          route,
        },
      );
      await findByTestId('item-row-0');

      headers.forEach((name) => {
        expect(getByRole('columnheader', { name }));
      });

      testids.forEach((key, i) => {
        const product = productsData[i];
        const value = product[key as keyof typeof product];
        expect(getByTestId(`item-row-${i}-${key}`).textContent).toContain(
          String(value).replace('.', ','),
        );
      });
    });
  });

  describe('Tests /materials', () => {
    beforeEach(() => {
      (axios.get as jest.Mock).mockImplementation(async () =>
        Promise.resolve({
          data: materialsData,
        }),
      );
    });

    it('Should fetch the correct type of data', async () => {
      const route = '/materials';

      const { findByTestId } = renderWithRouter(<ItemsListPage />, { route });
      await findByTestId('item-row-0');

      expect(axios.get).toBeCalled();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(route));
    });

    it('Should display the correct table headers and data', async () => {
      const route = '/materials';
      const headers = ['Nome', 'Quantidade'];
      const testids = ['name', 'quantity'];

      const { findByTestId, getByRole, getByTestId } = renderWithRouter(
        <ItemsListPage />,
        {
          route,
        },
      );
      await findByTestId('item-row-0');

      headers.forEach((name) => {
        expect(getByRole('columnheader', { name }));
      });

      testids.forEach((key, i) => {
        const material = materialsData[i];
        const value = material[key as keyof typeof material];
        expect(getByTestId(`item-row-${i}-${key}`).textContent).toContain(
          String(value).replace('.', ','),
        );
      });
    });
  });
});
