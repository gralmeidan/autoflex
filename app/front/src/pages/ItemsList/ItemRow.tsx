import React from 'react';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import formattingUtils from '../../utils/formating.utils';
import { useModal } from '../../context/ModalContext';

export default function ItemRow({ item, i }: ItemRowProps) {
  const { openModal } = useModal();

  function isProduct(
    item: Material | ProductByFindAll,
  ): item is ProductByFindAll {
    return 'value' in item;
  }

  return (
    <>
      <tr
        data-testid={`item-row-${i}`}
        onClick={() => {
          openModal(item.id);
        }}
        className="cursor-pointer"
      >
        <td data-testid={`item-row-${i}-name`}>{item.name}</td>
        {isProduct(item) ? (
          <>
            <td data-testid={`item-row-${i}-value`}>
              {formattingUtils.currency(item.value)}
            </td>
            <td
              data-testid={`item-row-${i}-craftable`}
              className="hidden sm:table-cell"
            >
              {item.craftable}
            </td>
            <td data-testid={`item-row-${i}-subtotal`}>
              {formattingUtils.currency(item.subtotal)}
            </td>
          </>
        ) : (
          <td data-testid={`item-row-${i}-quantity`}>{item.quantity}</td>
        )}
      </tr>
    </>
  );
}

type ItemRowProps = {
  item: Material | ProductByFindAll;
  i: number;
};
