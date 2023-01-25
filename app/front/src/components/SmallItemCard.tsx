import React from 'react';

export default function SmallItemCard({
  name,
  quantity: stock,
  info: { quantity: required },
}: SmallItemCardProps) {
  return (
    <li className="ul-card">
      <p>{name}</p>
      <abbr title="Necessário/Estoque" style={{ borderBottom: 0 }}>
        {required}
        {typeof stock !== 'undefined' && `/${stock}`}
      </abbr>
    </li>
  );
}

type SmallItemCardProps = {
  name: string;
  quantity?: number;
  info: {
    quantity: number;
  };
};
