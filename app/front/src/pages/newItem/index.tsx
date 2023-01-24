import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NumberInput from '../../components/NumberInput';

export default function NewItemPage() {
  const [num, setNum] = useState(0);
  const isProducts = useLocation().pathname.includes('products');
  const type = isProducts ? 'Produto' : 'Material';
  console.log(num);

  return (
    <main className="container py-8">
      <h1>Registrar novo {type}</h1>
      <form>
        <fieldset>
          <label>
            Nome
            <input type="text" name="name" />
          </label>
          <label>
            Quantidade
            <input className="" type="number" name="" id="" />
          </label>
          <NumberInput
            label="Quantidade"
            value={num}
            setValue={setNum}
            min={0}
          />
        </fieldset>
      </form>
    </main>
  );
}
