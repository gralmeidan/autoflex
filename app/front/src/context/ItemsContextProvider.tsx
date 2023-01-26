import React from 'react';
import { useState } from 'react';
import usePickService from '../hooks/usePickService';
import { type RecipeEntry } from '../types/recipes.types';
import recipeService from '../services/recipe.service';
import {
  type ProductByFindAll,
  type ProductIndividual,
} from '../types/products.types';
import { type Material } from '../types/materials.types';
import { itemsContext } from './ItemsContext';

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  const [itemsList, setItemsList] = useState(
    [] as ProductByFindAll[] | Material[],
  );
  const [item, setItem] = useState<
    ProductIndividual | Required<Material> | undefined
  >();

  const pickService = () => {
    return usePickService().service;
  };

  const fetchList = async () => {
    const resp = await pickService().fetchAll();
    setItemsList(resp);
  };

  const fetchItem = async (id: string | number = 1) => {
    const resp = await pickService().fetchOne(id);
    setItem(resp);
  };

  const appendToList = async (obj: {
    name: string;
    value?: number;
    quantity?: number;
  }) => {
    const resp = await pickService().create(obj);
    if (resp.error) {
      return resp;
    }

    void fetchList();
    return resp;
  };

  const updateItem = async (
    id: string,
    obj: {
      name?: string;
      value?: number;
      quantity?: number;
    },
  ) => {
    const resp = await pickService().update(id, obj);
    if (resp.error) {
      return resp;
    }

    void fetchList();
    void fetchItem(id);
    return resp;
  };

  const removeFromList = async (id: string) => {
    const resp = await pickService().remove(id);
    if (resp.error) {
      return resp;
    }

    void fetchList();
    return resp;
  };

  const appendToRecipe = async (entry: RecipeEntry) => {
    const resp = await recipeService.appendToRecipe(entry);
    if (resp.error) {
      return resp;
    }

    void fetchItem(item?.id);
    return resp;
  };

  const updateRecipe = async (entry: RecipeEntry) => {
    const resp = await recipeService.updateRecipe(entry);
    if (resp.error) {
      return resp;
    }

    void fetchItem(item?.id);
    return resp;
  };

  const removeFromRecipe = async (entry: Omit<RecipeEntry, 'quantity'>) => {
    const resp = await recipeService.removeFromRecipe(entry);
    if (resp.error) {
      return resp;
    }

    void fetchItem(item?.id);
    return resp;
  };

  const value = {
    itemsList,
    item,
    fetchItem,
    fetchList,
    appendToList,
    updateItem,
    removeFromList,
    appendToRecipe,
    updateRecipe,
    removeFromRecipe,
  };

  return (
    <itemsContext.Provider value={value}>{children}</itemsContext.Provider>
  );
}

type ItemsContextProviderProps = {
  children: React.ReactNode;
};
