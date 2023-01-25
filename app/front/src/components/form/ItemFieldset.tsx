import React, { useEffect, useState } from 'react';
import NumberInput from '../NumberInput';
import Input from '../Input';
import Button from '../Button';
import { useLocation } from 'react-router-dom';
import usePickService from '../../hooks/usePickService';

export default function ItemForm({ submitData, id }: ItemFieldSetProps) {
  const { pathname } = useLocation();
  const { service } = usePickService();
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (id) {
      (async () => {
        const resp = await service.fetchOne(id);

        setName(resp.name);
        setNum('value' in resp ? resp.value : resp.quantity);
      })();
    }
  }, []);

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
        label="Enviar"
        type="submit"
      />
    </fieldset>
  );
}

type ItemFieldSetProps = {
  submitData: (name: string, num: number) => void;
  id?: string;
};
