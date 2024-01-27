import { IconType } from 'react-icons';

function CategorySelect({
  selected,
  label,
  icon: Icon,
  onClick,
}: {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`category-wrapper ${
        selected ? 'selected-category' : 'not-selected-category'
      }`}
    >
      <Icon size={30} />
      <div className="category-label">{label}</div>
    </div>
  );
}
export default CategorySelect;
