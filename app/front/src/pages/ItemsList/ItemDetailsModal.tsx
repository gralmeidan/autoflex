import React, { useEffect } from 'react';
import Modal from '../../components/Modal';
import usePickService from '../../hooks/usePickService';
import formatingUtils from '../../utils/formating.utils';
import SmallItemCard from '../../components/SmallItemCard';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import AddRelationship from './AddRelationship';
import { useItems } from '../../context/ItemsContext';

export default function ItemDetailsModal({
  id,
  closeModal,
}: ItemDetailsModalProps) {
  const navigate = useNavigate();
  const { pathname } = usePickService();
  const { item, fetchItem, removeFromList } = useItems();

  const getRequirements = () => {
    if (!item) {
      return [];
    }

    return 'materials' in item ? item.materials : item.products;
  };

  useEffect(() => {
    void fetchItem(id);
  }, [id]);

  return item ? (
    <Modal title={item.name} closeModal={closeModal}>
      <div>
        <h5>
          {'value' in item
            ? `Valor: ${formatingUtils.currency(item.value)}`
            : `Quantidade: ${item.quantity}`}
        </h5>
        <ul className="flex list-none gap-4 flex-wrap">
          {getRequirements().map((obj) => (
            <SmallItemCard {...obj} key={obj.id} />
          ))}
        </ul>
        <AddRelationship id={item.id} />
      </div>
      <footer className="flex  gap-2">
        <Button
          label="Excluir"
          className="secondary"
          onClick={() => {
            void removeFromList(id);
            closeModal();
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
