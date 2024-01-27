function MenuItems({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="user-menu-items-wrapper">
      {children}
    </div>
  );
}
export default MenuItems;
