'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

function TextArea({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}) {
  return (
    <div className="inputComp-wrapper">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`${
          errors[id] ? 'error-input-field' : ''
        } peer textArea-field`}
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
export default TextArea;
