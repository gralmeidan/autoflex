import React from 'react';

export default function Button({
  onClick,
  type = 'button',
  className = '',
  loading = false,
  label,
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      type={type || 'button'}
      className={className}
      aria-busy={loading}
    >
      {label}
    </button>
  );
}

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  label: string;
};
