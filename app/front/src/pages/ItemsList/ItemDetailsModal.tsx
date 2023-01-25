import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { type ProductIndividual } from '../../types/products.types';
import { type Material } from '../../types/materials.types';
import usePickService from '../../hooks/usePickService';
import formatingUtils from '../../utils/formating.utils';
import SmallItemCard from '../../components/SmallItemCard';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import AddRelationship from './AddRelationship';

export default function ItemDetailsModal({
  id,
  closeModal,
}: ItemDetailsModalProps) {
  const navigate = useNavigate();
  const { service, pathname } = usePickService();
  const [data, setData] = useState<
    ProductIndividual | Required<Material> | undefined
  >();

  const getRequirements = () => {
    if (!data) {
      return [];
    }

    return 'materials' in data ? data.materials : data.products;
  };

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
        <ul className="flex list-none gap-4 flex-wrap">
          {getRequirements().map((obj) => (
            <SmallItemCard {...obj} key={obj.id} />
          ))}
        </ul>
        <AddRelationship />
      </div>
      <footer className="flex  gap-2">
        <Button
          label="Excluir"
          className="secondary"
          onClick={() => {
            void service.remove(id);
          }}
        />
        <Button
          label="Editar"
          onClick={() => {
            navigate(`${pathname}/edit/${id}`);
          }}
        />
      </footer>
    </Modal>
  ) : (
    <p />
  );
}

type ItemDetailsModalProps = {
  id: number;
  closeModal: () => void;
};
