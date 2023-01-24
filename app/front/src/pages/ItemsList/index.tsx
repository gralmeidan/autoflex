import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import productService from '../../services/product.service';
import materialService from '../../services/material.service';
import ItemTable from './ItemTable';

export default function ItemsListPage() {
  const [data, setData] = useState([] as ProductByFindAll[] | Material[]);
  const [includeUncraftable, setIncludeUncraftable] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    (async () => {
      const service =
        pathname === '/products' ? productService : materialService;
      const resp = await service.fetchAll({ includeUncraftable });
      setData(resp);
    })();
  }, [setData, pathname, includeUncraftable]);

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
              checked={includeUncraftable}
              onChange={({ target: { checked } }) => {
                setIncludeUncraftable(checked);
              }}
            />
            Incluir não criáveis
          </label>
        )}
      </div>
      <ItemTable data={data} />
    </main>
  );
}
