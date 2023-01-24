import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NumberInput from '../../components/NumberInput';

export default function NewItemPage() {
  const [num, setNum] = useState(0);
  const isProducts = useLocation().pathname.includes('products');
  const type = isProducts ? 'Produto' : 'Material';

  return (
    <main className="container py-8">
      <h1>Registrar novo {type}</h1>
      <form>
        <fieldset>
          <label>
            Nome
            <input type="text" name="name" />
          </label>
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
        </fieldset>
      </form>
    </main>
  );
}
