import React, { useEffect, useState } from 'react';
import usePickService from '../../hooks/usePickService';
import { type ProductByFindAll } from '../../types/products.types';
import { type Material } from '../../types/materials.types';
import Button from '../../components/Button';
import EditRecipeModal from './EditRecipeModal';
import recipeService from '../../services/recipe.service';

export default function AddRelationship({ id }: AddRelationshipProps) {
  const [selected, setSelected] = useState('0');
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([] as ProductByFindAll[] | Material[]);
  const { service, isProducts } = usePickService(true);

  useEffect(() => {
    (async () => {
      const resp = await service.fetchAll();

      setOptions(resp);
      setSelected(String(resp[0].id));
    })();
  }, []);

  const submitData = async (quantity: number) => {
    if (isProducts) {
      await recipeService.appendToRecipe({
        productId: id,
        materialId: selected,
        quantity,
      });
    } else {
      await recipeService.appendToRecipe({
        productId: selected,
        materialId: id,
        quantity,
      });
    }
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
};
