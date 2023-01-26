import type React from 'react';
import { createContext, useContext } from 'react';
import { type RecipeEntry } from '../types/recipes.types';
import {
  type ProductByFindAll,
  type ProductIndividual,
} from '../types/products.types';
import { type Material } from '../types/materials.types';
import { type CreateUpdateResponse } from '../types/response.types';

type ItemsContext = {
  itemsList: ProductByFindAll[] | Material[];
  item: ProductIndividual | Required<Material> | undefined;
  fetchItem: (id?: string | number) => Promise<void>;
  fetchList: (query?: Record<string, string | number | boolean>) => void;
  appendToList: (obj: {
    name: string;
    value?: number;
    quantity?: number;
  }) => Promise<CreateUpdateResponse<unknown>>;
  updateItem: (
    id: string,
    obj: {
      name?: string | undefined;
      value?: number | undefined;
      quantity?: number | undefined;
    },
  ) => Promise<CreateUpdateResponse<Required<unknown>>>;
  removeFromList: (id: string | number) => Promise<CreateUpdateResponse<never>>;
  appendToRecipe: (
    entry: RecipeEntry,
  ) => Promise<CreateUpdateResponse<RecipeEntry>>;
  updateRecipe: (
    entry: RecipeEntry,
  ) => Promise<CreateUpdateResponse<RecipeEntry>>;
  removeFromRecipe: (
    entry: Omit<RecipeEntry, 'quantity'>,
  ) => Promise<CreateUpdateResponse<RecipeEntry>>;
};

export const itemsContext = createContext({});

export function useItems() {
  return useContext(itemsContext as unknown as React.Context<ItemsContext>);
}
