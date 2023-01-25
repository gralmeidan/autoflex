import React, { useState } from 'react';
import { type CreateUpdateResponse } from '../../types/response.types';
import ItemForm from './ItemForm';
import usePickService from '../../hooks/usePickService';

export default function NewItemPage() {
  const [response, setResponse] = useState<
    CreateUpdateResponse<unknown> | undefined
  >();
  const { isProducts, service } = usePickService();
  const name = isProducts ? 'Produto' : 'Material';

  const submitData = async (name: string, num: number) => {
    const resp = await service.create({
      name,
      [isProducts ? 'value' : 'quantity']: num,
    });

    setResponse(resp);
  };

  return (
    <main className="container py-8">
      <h1>Registrar novo {name}</h1>
      <ItemForm submitData={submitData} />
      {response &&
        (response.error ? (
          <p>{response.error.message}</p>
        ) : (
          <ins>{name} inserido com sucesso</ins>
        ))}
    </main>
  );
}
