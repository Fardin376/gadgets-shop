import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        style: {
          background: 'rgb(51 65 85)',
          color: '#fff',
        },
      }}
    />
  );
}
