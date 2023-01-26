import React, { useState } from 'react';
import { type CreateUpdateResponse } from '../../types/response.types';
import ItemForm from '../../components/form/ItemForm';
import usePickService from '../../hooks/usePickService';
import { useItems } from '../../context/ItemsContext';

export default function NewItemPage() {
  const [response, setResponse] = useState<
    CreateUpdateResponse<unknown> | undefined
  >();
  const { isProducts } = usePickService();
  const { appendToList } = useItems();
  const name = isProducts ? 'Produto' : 'Material';

  const submitData = async (name: string, num: number) => {
    const resp = await appendToList({
      name,
      [isProducts ? 'value' : 'quantity']: num,
    });
    setResponse(resp);
  };

  return (
    <ItemForm
      submitData={submitData}
      name={name}
      response={response}
      title={`Registrar novo ${name}`}
    />
  );
}
