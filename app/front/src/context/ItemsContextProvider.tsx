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
  const [includeUncraftable, setIncludeUncraftable] = useState(false);
  const [itemsList, setItemsList] = useState(
    [] as ProductByFindAll[] | Material[],
  );
  const [item, setItem] = useState<
    ProductIndividual | Required<Material> | undefined
  >();

  const { service } = usePickService();

  const fetchList = async () => {
    const resp = await service.fetchAll({ includeUncraftable });
    setItemsList(resp);
  };

  const fetchItem = async (id: string | number = 0) => {
    const resp = await service.fetchOne(id);
    setItem(resp);
  };

  const appendToList = async (obj: {
    name: string;
    value?: number;
    quantity?: number;
  }) => {
    const resp = await service.create(obj);
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
    const resp = await service.update(id, obj);
    if (resp.error) {
      return resp;
    }

    void fetchList();
    void fetchItem(id);
    return resp;
  };

  const removeFromList = async (id: string | number) => {
    const resp = await service.remove(id);
    if (resp.error) {
      return resp;
    }

    if (item?.id === id) {
      setItem(undefined);
    }

    void fetchList();
    return resp;
  };

  const appendToRecipe = async (entry: RecipeEntry) => {
    const resp = await recipeService.appendToRecipe(entry);
    if (resp.error) {
      return resp;
    }

    void fetchList();
    void fetchItem(item?.id);
    return resp;
  };

  const updateRecipe = async (entry: RecipeEntry) => {
    const resp = await recipeService.updateRecipe(entry);
    if (resp.error) {
      return resp;
    }

    void fetchList();
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
    includeUncraftable,
    setIncludeUncraftable,
  };

  return (
    <itemsContext.Provider value={value}>{children}</itemsContext.Provider>
  );
}

type ItemsContextProviderProps = {
  children: React.ReactNode;
};
