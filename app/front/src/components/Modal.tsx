import React, { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutisde';

export default function Modal({ closeModal, children, title }: ModalProps) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    closeModal();
  });

  return (
    <dialog open>
      <article
        ref={wrapperRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="pb-3 mb-2">
          <a
            aria-label="Close"
            className="close cursor-pointer"
            data-target="modal-example"
            onClick={closeModal}
          />
          <h4 className="mb-0">{title}</h4>
        </header>
        {children}
      </article>
    </dialog>
  );
}

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
  title: string;
};
