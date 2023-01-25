import React, { useState } from 'react';
import Modal from '../../components/Modal';
import NumberInput from '../../components/NumberInput';
import Button from '../../components/Button';

export default function EditRecipeModal({
  closeModal,
  allowDelete,
  submitData,
}: EditRecipeModalProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <Modal closeModal={closeModal} title="Editar receita">
      <div className="mt-4">
        <NumberInput
          label="Material por produto"
          setValue={setQuantity}
          value={quantity}
          decimals={0}
          min={0}
        />
      </div>
      <footer className="flex gap-2 mt-0 pb-2">
        {allowDelete && (
          <Button label="Excluir" onClick={() => ''} className="secondary" />
        )}
        <Button
          label="Confirmar"
          onClick={() => {
            submitData(quantity);
            closeModal();
          }}
        />
      </footer>
    </Modal>
  );
}

type EditRecipeModalProps = {
  submitData: (qtd: number) => void;
  closeModal: () => void;
  allowDelete?: boolean;
};
