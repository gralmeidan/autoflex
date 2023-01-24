import React from 'react';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import formattingUtils from '../../utils/formating.utils';

export default function ItemRow({ item, i }: ItemRowProps) {
  function isProduct(
    item: Material | ProductByFindAll,
  ): item is ProductByFindAll {
    return 'value' in item;
  }

  return (
    <tr data-testid={`item-row-${i}`}>
      <td>{item.name}</td>
      {isProduct(item) ? (
        <>
          <td>{formattingUtils.currency(item.value)}</td>
          <td>{item.craftable}</td>
          <td>{formattingUtils.currency(item.subtotal)}</td>
        </>
      ) : (
        <td>{item.quantity}</td>
      )}
    </tr>
  );
}

type ItemRowProps = {
  item: Material | ProductByFindAll;
  i: number;
};
