import { useState, type ChangeEvent } from 'react';

type InputChangeHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

function useInput(defaultValue = ''): [string, InputChangeHandler, (value: string) => void] {
  const [value, setValue] = useState(defaultValue);
  const onValueChange: InputChangeHandler = (event) => setValue(event.target.value);
  return [value, onValueChange, setValue];
}

export default useInput;