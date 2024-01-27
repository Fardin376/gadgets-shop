'use client';


import Link from 'next/link';
import AdminNavItem from './AdminNavItem';
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';
import Container from '../Container';

function AdminNav() {
  const pathName = usePathname();

  return (
    <div className="admin-nav-wrapper">
      <Container>
        <div className="admin-nav-items-wrapper hide-on-mobile">
          <Link href={'/admin'}>
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathName === '/admin'}
            />
          </Link>
          <Link href={'/admin/add-product'}>
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathName === '/admin/add-product'}
            />
          </Link>
          <Link href={'/admin/manage-products'}>
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === '/admin/manage-products'}
            />
          </Link>
          <Link href={'/admin/manage-orders'}>
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === '/admin/manage-orders'}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
export default AdminNav;
