'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

function InputComponent({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}) {
  return (
    <div className="inputComp-wrapper">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={`${errors[id] ? 'error-input-field' : ''} peer input-field`}
      />
      <label
        htmlFor={id}
        className={`${errors[id] ? 'error-label' : ''} input-label`}
      >
        {label}
      </label>
    </div>
  );
}
export default InputComponent;
