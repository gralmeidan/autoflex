import { type Product } from './products.types';

type Products = Omit<Product, 'materials'> & {
  info: {
    quantity: number;
  };
};

export type Material = {
  id: number;
  name: string;
  quantity: number;
  thumb: string;
  products?: Products;
};
