import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

function Avatar({ src }: { src?: string | null | undefined }) {
  if (src) {
    return (
      <Image
        src={src}
        alt="User Avatar"
        className="rounded-full"
        width="25"
        height="35"
      />
    );
  }

  return <FaUserCircle size={24} />;
}
export default Avatar;
