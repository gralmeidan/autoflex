import React, { useEffect, useState } from 'react';
import usePickService from '../../hooks/usePickService';
import { type ProductByFindAll } from '../../types/products.types';
import { type Material } from '../../types/materials.types';
import Button from '../../components/Button';

export default function AddRelationship() {
  const [options, setOptions] = useState([] as ProductByFindAll[] | Material[]);
  const { service } = usePickService(true);

  useEffect(() => {
    (async () => {
      const resp = await service.fetchAll();

      setOptions(resp);
    })();
  }, []);

  return (
    <div className="flex gap-2 flex-wrap">
      <select name="" id="">
        {options.map((obj) => (
          <option value={obj.id} key={obj.id}>
            {obj.name}
          </option>
        ))}
      </select>
      <Button label="Adicionar" onClick={console.log} />
    </div>
  );
}
