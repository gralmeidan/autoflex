import React from 'react';
import Input, { type InputProps } from './Input';

export default function NumberInput(props: NumberInputProps) {
  return (
    <Input
      {...props}
      setValue={(v: string) => {
        const value = Number(v).toFixed(props.decimals);
        props.setValue(Math.max(props.min ?? 0, Number(value)));
      }}
      onKeyDown={(e) => {
        if (!props.decimals && e.key === '.') {
          e.preventDefault();
        }
      }}
      value={props.value === 0 ? ' ' : props.value}
      type="number"
      step="any"
    />
  );
}

export type NumberInputProps = {
  decimals?: number;
  min?: number;
  setValue: (v: number) => void;
} & Omit<InputProps, 'type' | 'setValue'>;
