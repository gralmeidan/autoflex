import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ItemsListPage from '../../pages/ItemsList';
import axios from 'axios';
import '@testing-library/jest-dom';
import { productsData } from '../mocks/product.mocks';
import { materialsData } from '../mocks/material.mocks';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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

    it('Should render a checkbox to filter uncraftables', async () => {
      const { findByTestId } = renderWithRouter(<ItemsListPage />, {
        route: '/products',
      });
      await findByTestId('item-row-0');

      const checkbox = (await findByTestId(
        'filter-includeCraftables',
      )) as HTMLInputElement;

      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBeFalsy();
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('products?includeUncraftable=false'),
      );

      await act(async () => {
        userEvent.click(checkbox);
        expect(checkbox.checked).toBeTruthy();
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('products?includeUncraftable=true'),
      );
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

    it('Should not render a checkbox to filter uncraftables', async () => {
      const { findByTestId, queryByTestId } = renderWithRouter(
        <ItemsListPage />,
        {
          route: '/materials',
        },
      );
      await findByTestId('item-row-0');

      expect(queryByTestId('filter-includeCraftables')).not.toBeInTheDocument();
    });
  });

  describe('Tests common functionalities', () => {
    beforeEach(() => {
      (axios.get as jest.Mock).mockImplementation(async () =>
        Promise.resolve({
          data: materialsData,
        }),
      );
    });

    it('Should have a link to /:pathname/new', async () => {
      const { findByRole, findByTestId } = renderWithRouter(<ItemsListPage />, {
        route: '/materials',
      });
      await findByTestId('item-row-0');

      const link = (await findByRole('button', {
        name: /novo/i,
      })) as HTMLLinkElement;

      expect(link.href).toEqual(expect.stringContaining('/materials/new'));
    });
  });
});
