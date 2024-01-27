'use client';

import { useState } from 'react';
import {
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { menuItems } from '@/utils/utils';


function NavBarBurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="hide-on-large"
      />

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.id} className="px-4">
            <Link
              color={index === 1 ? 'primary' : 'foreground'}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </div>
  );
}
export default NavBarBurgerMenu;
