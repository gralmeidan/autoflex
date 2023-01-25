import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NumberInput from '../../components/NumberInput';
import Input from '../../components/Input';
import Button from '../../components/Button';
import productService from '../../services/product.service';
import { type ServiceError } from '../../types/errors.types';
import { type CreateUpdateResponse } from '../../types/response.types';

export default function NewItemPage() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState('');
  const [response, setResponse] = useState<
    CreateUpdateResponse<unknown> | undefined
  >();
  const isProducts = useLocation().pathname.includes('products');
  const type = isProducts ? 'Produto' : 'Material';

  const submitData = async () => {
    const resp = await productService.create({
      name,
      value: num,
    });

    setResponse(resp);
  };

  return (
    <main className="container py-8">
      <h1>Registrar novo {type}</h1>
      <form>
        <fieldset>
          <Input label="Nome" value={name} setValue={setName} />
          <NumberInput
            min={0}
            value={num}
            setValue={setNum}
            {...(isProducts
              ? {
                  label: 'Valor',
                  decimals: 2,
                }
              : {
                  label: 'Quantidade',
                  decimals: 0,
                })}
          />
          <Button onClick={submitData} label="Criar" type="submit" />
        </fieldset>
        {response &&
          (response.error ? (
            <p>{response.error.message}</p>
          ) : (
            <ins>{type} inserido com sucesso</ins>
          ))}
      </form>
    </main>
  );
}
