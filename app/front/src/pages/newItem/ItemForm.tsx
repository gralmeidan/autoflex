import React, { useState } from 'react';
import NumberInput from '../../components/NumberInput';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom';

export default function ItemForm({ submitData }: ItemFormProps) {
  const { pathname } = useLocation();
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);

  return (
    <form>
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
    </form>
  );
}

type ItemFormProps = {
  submitData: (name: string, num: number) => void;
};
