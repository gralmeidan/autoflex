import React, { type InputHTMLAttributes } from 'react';

export default function Input(props: InputProps) {
  return (
    <label>
      {props.label}
      <input
        {...props}
        value={props.value}
        onChange={({ target: { value } }) => {
          props.setValue(value);
        }}
      />
    </label>
  );
}

export type InputProps = {
  label: string;
  setValue: (value: string) => void;
  value: unknown;
} & InputHTMLAttributes<HTMLInputElement>;
