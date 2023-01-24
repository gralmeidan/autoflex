import React from 'react';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import { useLocation } from 'react-router-dom';
import ItemRow from './ItemRow';

export default function ItemTable({ data }: ItemTableProps) {
  const { pathname } = useLocation();

  return (
    <table data-testid="items-table">
      <thead>
        <tr>
          <th>Nome</th>
          {pathname === '/products' ? (
            <>
              <th>Valor</th>
              <th>Criáveis</th>
              <th>Sub-total</th>
            </>
          ) : (
            <th>Quantidade</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <ItemRow item={item as Material | ProductByFindAll} key={i} i={i} />
        ))}
      </tbody>
    </table>
  );
}

type ItemTableProps = {
  data: Material[] | ProductByFindAll[];
};
