import React, { useEffect, useState } from 'react';
import usePickService from '../../hooks/usePickService';
import {
  type Product,
  type ProductByFindAll,
} from '../../types/products.types';
import { type Material } from '../../types/materials.types';
import Button from '../../components/Button';
import EditRecipeModal from './EditRecipeModal';
import { useItems } from '../../context/ItemsContext';

export default function AddRelationship({
  id,
  requirements,
}: AddRelationshipProps) {
  const { appendToRecipe } = useItems();
  const [selected, setSelected] = useState('0');
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([] as ProductByFindAll[] | Material[]);
  const { service, isProducts } = usePickService(true);

  useEffect(() => {
    (async () => {
      const resp = await service.fetchAll();
      const filtered = (resp as Array<{ id: number }>).filter(({ id }) => {
        return !(requirements as Array<{ id: number }>).find(
          (req) => req.id === id,
        );
      });

      setOptions(filtered as ProductByFindAll[] | Material[]);
    })();
  }, [requirements]);

  const submitData = async (quantity: number) => {
    console.log(selected);
    if (isProducts) {
      return appendToRecipe({
        productId: id,
        materialId: selected,
        quantity,
      });
    }

    return appendToRecipe({
      productId: selected,
      materialId: id,
      quantity,
    });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <select
        onChange={({ target: { value } }) => {
          setSelected(value);
        }}
      >
        {options.map((obj) => (
          <option value={obj.id} key={obj.id}>
            {obj.name}
          </option>
        ))}
      </select>
      <Button
        label="Adicionar"
        onClick={() => {
          setModal(true);
        }}
      />
      {modal && (
        <EditRecipeModal
          closeModal={() => {
            setModal(false);
          }}
          submitData={submitData}
        />
      )}
    </div>
  );
}

type AddRelationshipProps = {
  id: string | number;
  requirements: Material[] | Product[];
};
