import { useState } from 'react';
import { FormData } from '../types/instances';

const useForm = (initialState: FormData): [FormData, (nextFormData: FormData | ((prevFormData: FormData) => FormData)) => void] => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const onChange = (nextFormData: FormData | ((prevFormData: FormData) => FormData)) => {
    setFormData((prevFormData: FormData) => {
      if (typeof nextFormData === 'function') {
        localStorage.setItem('tempRoomItem', JSON.stringify(nextFormData(prevFormData)));
        return nextFormData(prevFormData);
      } else {
        localStorage.setItem('tempRoomItem', JSON.stringify(nextFormData));
        return nextFormData;
      }
    });
  };

  return [formData, onChange];
}

export default useForm;