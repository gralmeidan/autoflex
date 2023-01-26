import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ItemTable from './ItemTable';
import { useItems } from '../../context/ItemsContext';

export default function ItemsListPage() {
  const { itemsList, fetchList } = useItems();
  const [includeUncraftable, setIncludeUncraftable] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    fetchList({ includeUncraftable });
  }, [includeUncraftable]);

  return (
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
  );
}
