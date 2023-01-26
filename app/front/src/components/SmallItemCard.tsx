import React from 'react';
import Button from './Button';

export default function SmallItemCard({
  name,
  quantity: stock,
  info: { quantity: required },
}: SmallItemCardProps) {
  return (
    <li
      className="ul-card flex justify-between items-start list-none p-2
     border-[#18232c] border-2 rounded-md flex-grow gap-3"
    >
      <div>
        <p>{name}</p>
        <abbr title="Necessário/Estoque" style={{ borderBottom: 0 }}>
          {required}
          {typeof stock !== 'undefined' && `/${stock}`}
        </abbr>
      </div>
      <div className="flex flex-col justify-between gap-2 h-full">
        <Button
          label="delete"
          onClick={console.log}
          className="material-symbols-outlined"
        />
        <Button
          label="edit"
          onClick={console.log}
          className="material-symbols-outlined"
        />
      </div>
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
