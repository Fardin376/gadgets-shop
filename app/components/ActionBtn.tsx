import { IconType } from 'react-icons';

function ActionBtn({
  icon: Icon,
  onClick,
  disabled,
}: {
  icon: IconType;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`action-btn-styles ${
        disabled && 'disabled-action-btn-styles'
      }`}
    >
      <Icon size={18} />
    </button>
  );
}
export default ActionBtn;
