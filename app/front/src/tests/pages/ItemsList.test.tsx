import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ItemsListPage from '../../pages/ItemsList';
import axios from 'axios';
import { productsData } from '../mocks/product.mocks';

jest.mock('axios');

describe('Tests for ItemsListPage', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation(async () =>
      Promise.resolve({
        data: productsData,
      }),
    );
  });

  describe('Tests /products', () => {
    it('Should fetch the correct type of data', async () => {
      const route = '/products';

      const { findByTestId } = renderWithRouter(<ItemsListPage />, { route });
      await findByTestId('item-row-0');

      expect(axios.get).toBeCalled();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(route));
    });
  });

  describe('Tests /materials', () => {
    it('Should fetch the correct type of data', async () => {
      const route = '/materials';

      const { findByTestId } = renderWithRouter(<ItemsListPage />, { route });
      await findByTestId('item-row-0');

      expect(axios.get).toBeCalled();
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(route));
    });
  });
});
