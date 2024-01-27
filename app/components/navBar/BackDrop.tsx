import { Backdrop } from '@mui/material';

function BackDrop({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <Backdrop
      className="backDrop-styles"
      sx={{ color: '#fff' }}
      open={isOpen}
      onClick={onClick}
    ></Backdrop>
  );
}
export default BackDrop;
