import React, { useState } from 'react';
import NumberInput from '../NumberInput';
import Input from '../Input';
import Button from '../Button';
import { useLocation } from 'react-router-dom';

export default function ItemForm({ submitData }: ItemFieldSetProps) {
  const { pathname } = useLocation();
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);

  return (
    <fieldset>
      <Input label="Nome" value={name} setValue={setName} />
      <NumberInput
        min={0}
        value={num}
        setValue={setNum}
        {...(pathname.includes('/products')
          ? {
              label: 'Valor',
              decimals: 2,
            }
          : {
              label: 'Quantidade',
              decimals: 0,
            })}
      />
      <Button
        onClick={() => {
          submitData(name, num);
        }}
        label="Criar"
        type="submit"
      />
    </fieldset>
  );
}

type ItemFieldSetProps = {
  submitData: (name: string, num: number) => void;
};
