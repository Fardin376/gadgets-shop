import { useGlobalState } from '@/context/context';

function Heading({ title, center }: { title: string; center?: boolean }) {
  return (
    <div
      className={
        center ? 'heading-component-center' : 'heading-component-start'
      }
    >
      <h1 className={'heading-component-styling'}>{title}</h1>
    </div>
  );
}
export default Heading;
