import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { type ProductIndividual } from '../../types/products.types';
import { type Material } from '../../types/materials.types';
import usePickService from '../../hooks/usePickService';
import formatingUtils from '../../utils/formating.utils';

export default function ItemDetailsModal({
  id,
  closeModal,
}: ItemDetailsModalProps) {
  const { service } = usePickService();
  const [data, setData] = useState<ProductIndividual | Material | undefined>();

  useEffect(() => {
    (async () => {
      const response = await service.fetchOne(id);

      setData(response);
    })();
  }, []);

  return data ? (
    <Modal title={data.name} closeModal={closeModal}>
      <div>
        <h5>
          {'value' in data
            ? `Valor: ${formatingUtils.currency(data.value)}`
            : `Quantidade: ${data.quantity}`}
        </h5>
        <ul className="flex list-none">
          <li>foo</li>
        </ul>
      </div>
    </Modal>
  ) : (
    <p />
  );
}

type ItemDetailsModalProps = {
  id: number;
  closeModal: () => void;
};
