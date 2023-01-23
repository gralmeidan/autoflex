import React from 'react';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import { useLocation } from 'react-router-dom';
import ItemRow from './ItemRow';

export default function ItemTable({ data }: ItemTableProps) {
  const { pathname } = useLocation();

  return (
    <table>
      <tr>
        <th>Nome</th>
        {pathname === '/products' ? (
          <>
            <td>Valor</td>
            <td>Criáveis</td>
            <td>Sub-total</td>
          </>
        ) : (
          <td>Quantidade</td>
        )}
      </tr>
      {data.map((item, i) => (
        <ItemRow item={item as Material | ProductByFindAll} key={i} />
      ))}
    </table>
  );
}

type ItemTableProps = {
  data: Material[] | ProductByFindAll[];
};
