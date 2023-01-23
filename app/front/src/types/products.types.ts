import { type Material } from './materials.types';

type Materials = Omit<Material, 'products'> & {
  info: {
    quantity: number;
  };
};

export type Product = {
  id: number;
  name: string;
  value: number;
  thumb: string;
  craftable?: number;
  subtotal?: number;
  materials?: Materials[];
};

export type ProductByFindAll = Required<Omit<Product, 'materials'>>;

export type ProductIndividual = Required<
  Omit<Product, 'craftable' | 'subtotal'>
>;
