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
        <a
          aria-label="Close"
          className="close"
          data-target="modal-example"
          onClick={closeModal}
        />
        <h3>{title}</h3>
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
