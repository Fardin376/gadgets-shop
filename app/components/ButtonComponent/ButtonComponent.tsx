'use client';

import { useGlobalState } from '@/context/context';
import { Button } from '@nextui-org/react';
import { IconType } from 'react-icons';

function ButtonComponent({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`buttonComp w-full ${
        outline ? 'buttonComp-outline' : 'bg-slate-700'
      } ${outline ? 'buttonComp-outline' : 'text-white'}
        ${small ? 'buttonComp-small' : 'text-md font-semibold'} 
        ${small ? 'buttonComp-small' : 'py-3 px-4 border-2'} 
        ${custom ? custom : ''}
  `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}
export default ButtonComponent;
