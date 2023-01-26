import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ItemTable from './ItemTable';
import { useItems } from '../../context/ItemsContext';
import { ModalContextProvider } from '../../context/ModalContextProvider';

export default function ItemsListPage() {
  const { itemsList, fetchList, includeUncraftable, setIncludeUncraftable } =
    useItems();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchList();
  }, [includeUncraftable]);

  return (
    <ModalContextProvider>
      <main className="container py-8">
        <div className="flex justify-between w-full items-center py-3">
          <Link to={`${pathname}/new`} role="button">
            + Novo
          </Link>
          {pathname === '/products' && (
            <label className="select-none ">
              <input
                type="checkbox"
                data-testid="filter-includeCraftables"
                checked={includeUncraftable}
                onChange={({ target: { checked } }) => {
                  setIncludeUncraftable(checked);
                }}
              />
              Incluir não criáveis
            </label>
          )}
        </div>
        <ItemTable data={itemsList} />
      </main>
    </ModalContextProvider>
  );
}
