import React, { useState } from 'react';
import Modal from '../../components/Modal';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';

export default function EditRecipeModal({
  closeModal,
  allowDelete,
  submitData,
}: EditRecipeModalProps) {
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleClick = () => {
    if (quantity <= 0) {
      setMessage('A quantidade deve ser maior que 0');
      return;
    }

    submitData(quantity);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} title="Editar receita">
      <div className="mt-4 mb-2">
        <NumberInput
          label="Material por produto"
          setValue={setQuantity}
          value={quantity}
          decimals={0}
          min={0}
        />
        {message}
      </div>
      <footer className="flex gap-2 mt-0 pb-2">
        {allowDelete && (
          <Button label="Excluir" onClick={() => ''} className="secondary" />
        )}
        <Button label="Confirmar" onClick={handleClick} />
      </footer>
    </Modal>
  );
}

type EditRecipeModalProps = {
  submitData: (qtd: number) => void;
  closeModal: () => void;
  allowDelete?: boolean;
};
