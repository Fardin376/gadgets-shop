import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import Logo from '../Logo';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import NavBarBurgerMenu from './NavBarBurgerMenu';
import { getCurrentUser } from '@/services/getCurrentUser';
import Categories from './Categories';
import SearchBar from './SearchBar';

async function NavBar() {
  const currentUser = await getCurrentUser();

  console.log('user', currentUser);

  return (
    <>
      <div className={`border-b-[2px] shadow-lg md:py-2 navBar-wrapper`}>
        <Navbar shouldHideOnScroll className="navBar-content">
          <>
            <NavbarItem className="navBar-item">
              <Link href="/">
                <Logo />
              </Link>
            </NavbarItem>

            <NavbarItem className="hide-on-mobile navBar-item">
              <SearchBar />
            </NavbarItem>

            <NavbarItem className="navBar-item">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </NavbarItem>

            <NavBarBurgerMenu />
          </>
        </Navbar>
        <Categories />
      </div>
    </>
  );
}
export default NavBar;
