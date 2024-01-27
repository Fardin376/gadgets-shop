import AdminNav from '../components/admin/AdminNav';

export const metadata = {
  title: 'Gadgets Galore Admin',
  description: 'Gadgets Galore Admin Dashboard',
};

function AdminLyout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-grow min-h-screen'>
      <AdminNav />
      {children}
    </div>
  );
}
export default AdminLyout;
