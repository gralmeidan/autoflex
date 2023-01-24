/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { render } from '@testing-library/react';
import NumberInput from '../../components/NumberInput';
import { type NumberInputProps } from '../../components/NumberInput';
import userEvent from '@testing-library/user-event';

describe('Unit tests for NumberInput', () => {
  const Wrapper = (props?: Partial<NumberInputProps>) => {
    const [count, setCount] = useState(0);

    return (
      <NumberInput label="label" value={count} setValue={setCount} {...props} />
    );
  };

  const setupTests = (props?: Partial<NumberInputProps>) => {
    return render(<Wrapper {...props} />);
  };

  it('Should render a label and an usable number input', async () => {
    const { getByText } = setupTests();

    const label = getByText('label');
    const input = label.querySelector(
      'input[type="number"]',
    ) as unknown as HTMLInputElement;

    expect(input).toBeInTheDocument();

    expect(input.value).toBe('');
    userEvent.type(input, '120');
    expect(input.value).toBe('120');
  });

  it('Shouldn\'t accept numbers below "min"', async () => {
    const { getByRole } = setupTests({ min: 50 });

    const input = getByRole('spinbutton') as HTMLInputElement;
    userEvent.type(input, '-10');

    expect(input.value).toBe('50');
  });

  it('Should cap the number of decimals', async () => {
    const { getByRole } = setupTests({ decimals: 3 });

    const input = getByRole('spinbutton') as HTMLInputElement;
    userEvent.type(input, '1.11111111');

    expect(input.value).toBe('1.111');
  });

  it('Shouldn\'t allow for dots when "decimals" is set to 0', async () => {
    const { getByRole } = setupTests({ decimals: 0 });

    const input = getByRole('spinbutton') as HTMLInputElement;
    userEvent.type(input, '1.');

    expect(input.value).toBe('1');
  });

  it("Shouldn't allow for left zeros", async () => {
    const { getByRole } = setupTests({ decimals: 0 });

    const input = getByRole('spinbutton') as HTMLInputElement;
    '00000000000010'.split('').forEach((letter) => {
      userEvent.type(input, letter);
    });

    expect(input.value).toBe('10');
  });
});
