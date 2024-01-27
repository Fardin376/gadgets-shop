'use client';

import { useState } from 'react';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { menuItems } from '@/utils/utils';
import AdminNavItem from './AdminNavItem';
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';

function AdminBurgerMenu() {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <NavbarContent >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="hide-on-large"
        />

        <NavbarMenu>
          <NavbarMenuItem className="px-4 z-10">
            <Link href={'/admin'}>
              <AdminNavItem
                label="Summary"
                icon={MdDashboard}
                selected={pathName === '/admin'}
              />
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="px-4">
            <Link href={'/admin/add-product'}>
              <AdminNavItem
                label="Add Products"
                icon={MdLibraryAdd}
                selected={pathName === '/admin/add-product'}
              />
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="px-4">
            <Link href={'/admin/manage-products'}>
              <AdminNavItem
                label="Manage Products"
                icon={MdDns}
                selected={pathName === '/admin/manage-products'}
              />
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem className="px-4">
            <Link href={'/admin/manage-orders'}>
              <AdminNavItem
                label="Manage Orders"
                icon={MdFormatListBulleted}
                selected={pathName === '/admin/manage-orders'}
              />
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </div>
  );
}
export default AdminBurgerMenu;
