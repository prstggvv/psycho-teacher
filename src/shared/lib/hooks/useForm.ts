import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { ContactFormState } from '../../../types';

const formatPhoneNumber = (numbers: string): string => {
  const limitedNumbers = numbers.slice(0, 10);

  if (limitedNumbers.length === 0) {
    return '+7';
  } if (limitedNumbers.length <= 3) {
    return `+7 (${limitedNumbers}`;
  } if (limitedNumbers.length <= 6) {
    return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3)}`;
  } if (limitedNumbers.length <= 8) {
    return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6)}`;
  }

  return `+7 (${limitedNumbers.slice(0, 3)}) ${limitedNumbers.slice(3, 6)}-${limitedNumbers.slice(6, 8)}-${limitedNumbers.slice(8)}`;
};

export const useForm = (
  values: ContactFormState,
  setValues: Dispatch<SetStateAction<ContactFormState>>,
) => {
  const handleChange = (field: keyof ContactFormState, value: string | boolean) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    const numbers = inputValue.replace(/\D/g, '');
    const cleanNumbers = numbers.startsWith('7') ? numbers.slice(1) : numbers;
    const formattedValue = formatPhoneNumber(cleanNumbers);
  
    handleChange('phone', formattedValue);
  };

  return {
    values,
    setValues,
    handleChange,
    handlePhoneChange,
  };
}