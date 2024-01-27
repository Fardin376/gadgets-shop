'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';

function CustomCheckbox({
  id,
  label,
  disabled,
  register,
}: {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
}
export default CustomCheckbox;
