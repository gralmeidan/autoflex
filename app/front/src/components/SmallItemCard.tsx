import React, { useState } from 'react';
import Button from './Button';
import { useItems } from '../context/ItemsContext';
import EditRecipeModal from '../pages/ItemsList/EditRecipeModal';

export default function SmallItemCard({
  id,
  data: {
    id: dataId,
    name,
    quantity: stock,
    info: { quantity: required },
  },
}: SmallItemCardProps) {
  const [modal, setModal] = useState(false);
  const { removeFromRecipe, updateRecipe } = useItems();

  const getIds = () =>
    typeof stock === 'undefined'
      ? {
          productId: dataId,
          materialId: id,
        }
      : {
          productId: id,
          materialId: dataId,
        };

  return (
    <li
      className="ul-card flex justify-between items-start list-none p-2
     border-[#18232c] border-2 rounded-md flex-grow gap-3"
    >
      <div>
        <p>{name}</p>
        <abbr title="Necessário/Estoque" style={{ borderBottom: 0 }}>
          {required}
          {typeof stock !== 'undefined' && `/${stock}`}
        </abbr>
      </div>
      <div className="flex flex-col justify-between gap-2 h-full">
        <Button
          label="delete"
          onClick={() => {
            void removeFromRecipe(getIds());
          }}
          className="material-symbols-outlined"
        />
        <Button
          label="edit"
          onClick={() => {
            setModal(true);
          }}
          className="material-symbols-outlined"
        />
        {modal && (
          <EditRecipeModal
            closeModal={() => {
              setModal(false);
            }}
            submitData={(quantity: number) => {
              void updateRecipe({
                ...getIds(),
                quantity,
              });
            }}
          />
        )}
      </div>
    </li>
  );
}

type SmallItemCardProps = {
  id: string | number;
  data: {
    id: string | number;
    name: string;
    quantity?: number;
    info: {
      quantity: number;
    };
  };
};
