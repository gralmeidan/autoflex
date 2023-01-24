import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ItemsListPage from '../../pages/ItemsList';

jest.mock('axios');

describe('Tests for ItemsListPage', () => {
  describe('Tests /products', () => {
    it('Should fetch the correct type of data', () => {
      const route = '/products';
      renderWithRouter(<ItemsListPage />, { route });
    });
  });
});
