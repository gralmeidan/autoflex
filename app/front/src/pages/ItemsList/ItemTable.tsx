import React from 'react';
import { type Material } from '../../types/materials.types';
import { type ProductByFindAll } from '../../types/products.types';
import { useLocation } from 'react-router-dom';
import ItemRow from './ItemRow';
import { useModal } from '../../context/ModalContext';
import ItemDetailsModal from './ItemDetailsModal';

export default function ItemTable({ data }: ItemTableProps) {
  const { pathname } = useLocation();
  const { isModalOpen, setModal, id } = useModal();

  return (
    <>
      <table data-testid="items-table" className="container" role="grid">
        <thead>
          <tr>
            <th>Nome</th>
            {pathname === '/products' ? (
              <>
                <th>Valor</th>
                <th className="hidden sm:table-cell">Criáveis</th>
                <th>Sub-total</th>
              </>
            ) : (
              <th>Quantidade</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <ItemRow item={item as Material | ProductByFindAll} key={i} i={i} />
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ItemDetailsModal
          id={id}
          closeModal={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
}

type ItemTableProps = {
  data: Material[] | ProductByFindAll[];
};
