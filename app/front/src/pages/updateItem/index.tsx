import React, { useState } from 'react';
import { type CreateUpdateResponse } from '../../types/response.types';
import ItemForm from '../../components/form/ItemForm';
import usePickService from '../../hooks/usePickService';

export default function UpdateItemPage() {
  const [response, setResponse] = useState<
    CreateUpdateResponse<unknown> | undefined
  >();
  const { isProducts, service } = usePickService();
  const name = isProducts ? 'Produto' : 'Material';

  const submitData = async (name: string, num: number) => {
    alert('Not implemented');
  };

  return (
    <ItemForm
      submitData={submitData}
      name={name}
      response={response}
      title={`Modificar ${name}`}
    />
  );
}
