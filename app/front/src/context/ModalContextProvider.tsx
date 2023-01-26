import React from 'react';
import { useState } from 'react';
import { modalContext } from './ModalContext';

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [isModalOpen, setModal] = useState(false);
  const [id, setId] = useState(1);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  const openModal = (id: number) => {
    setId(id);
    setModal(true);
  };

  const value = {
    id,
    isModalOpen,
    setModal,
    toggleModal,
    openModal,
  };

  return (
    <modalContext.Provider value={value}>{children}</modalContext.Provider>
  );
}

type ModalContextProviderProps = {
  children: React.ReactNode;
};
