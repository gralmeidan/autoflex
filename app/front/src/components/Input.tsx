import React, { type InputHTMLAttributes } from 'react';

export default function Input(props: InputProps) {
  return (
    <label>
      {props.label}
      <input
        {...props}
        value={props.value}
        onChange={({ target: { value } }) => {
          const mask =
            props.mask ??
            function () {
              return true;
            };

          if (mask(value)) {
            props.setValue(value);
          }
        }}
      />
    </label>
  );
}

type InputProps = {
  label: string;
  mask?: (value: string) => boolean;
  setValue: (value: string) => void;
  value: unknown;
} & InputHTMLAttributes<HTMLInputElement>;
