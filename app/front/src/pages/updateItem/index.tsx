import React, { useEffect, useState } from 'react';
import { type CreateUpdateResponse } from '../../types/response.types';
import ItemForm from '../../components/form/ItemForm';
import usePickService from '../../hooks/usePickService';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateItemPage() {
  const [response, setResponse] = useState<
    CreateUpdateResponse<unknown> | undefined
  >();
  const { id } = useParams();
  const { isProducts, service } = usePickService();
  const navigate = useNavigate();
  const name = isProducts ? 'Produto' : 'Material';

  useEffect(() => {
    if (!Number.isInteger(Number(id))) {
      navigate('/');
    }
  });

  const submitData = async (name: string, num: number) => {
    // If id was undefined then you wouldn't be on this page
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const resp = await service.update(id!, {
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
      title={`Modificar ${name}`}
      id={id}
    />
  );
}
