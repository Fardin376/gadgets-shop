import { IconType } from 'react-icons';

function AdminNavItem({
  selected,
  icon: Icon,
  label,
}: {
  selected?: boolean;
  icon: IconType;
  label: string;
}) {
  return (
    <div className={`nav-item-wrapper ${selected ? 'selected-nav-item' : ''}`}>
      <Icon size={24} />
      <div className="nav-item-label">{label}</div>
    </div>
  );
}
export default AdminNavItem;
