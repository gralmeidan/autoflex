import type React from 'react';
import { createContext, useContext } from 'react';

type ModalContext = {
  isModalOpen: boolean;
  toggleModal: () => void;
  setModal: (isModalOpen: boolean) => void;
  id: number;
  openModal: (id: number) => void;
};

export const modalContext = createContext({});

export function useModal() {
  return useContext(modalContext as unknown as React.Context<ModalContext>);
}
