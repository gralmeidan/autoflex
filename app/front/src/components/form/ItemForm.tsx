import React from 'react';
import { type CreateUpdateResponse } from '../../types/response.types';
import ItemFieldset from './ItemFieldset';

export default function ItemForm({
  submitData,
  response,
  title,
  name,
  id,
}: ItemFormProps) {
  return (
    <main className="container py-8">
      <h1>{title}</h1>
      <form>
        <ItemFieldset submitData={submitData} id={id} />
      </form>
      {response &&
        (response.error ? (
          <p>{response.error.message}</p>
        ) : (
          <ins>{name} inserido com sucesso</ins>
        ))}
    </main>
  );
}

type ItemFormProps = {
  submitData: (name: string, num: number) => void;
  response: CreateUpdateResponse<unknown> | undefined;
  title: string;
  name: string;
  id?: string;
};
