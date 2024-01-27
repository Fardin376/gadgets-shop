import { IconType } from 'react-icons';

function Status({
  text,
  icon: Icon,
  bg,
  color,
}: {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}) {
  return (
    <div className={`${bg} ${color} status-comp-styles`}>
      {text} <Icon size={15} />
    </div>
  );
}
export default Status;
