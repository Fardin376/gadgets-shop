import Image from 'next/image';

function Logo() {
  return (
    <Image src={'/brand-logo.svg'} alt="Logo" width={250} height={100} />
  );
}
export default Logo;
