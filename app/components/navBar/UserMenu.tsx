'use client';

import { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { AiFillCaretDown } from 'react-icons/ai';
import { useGlobalState } from '@/context/context';
import Link from 'next/link';
import MenuItems from './MenuItems';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';

function UserMenu({ currentUser }: { currentUser: SafeUser | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleBodyClass = () => {
      if (isOpen) {
        document.body.classList.add('backdrop-open');
      } else {
        document.body.classList.remove('backdrop-open');
      }
    };

    handleBodyClass();

    return () => {
      document.body.classList.remove('backdrop-open');
    };
  }, [isOpen]);

  return (
    <>
      <div className="user-menu-wrapper">
        <div onClick={() => toggleOpen()} className={`user-menu-icon`}>
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="user-menu-options-wrapper">
            {currentUser && currentUser.role === 'ADMIN' ? (
              <div>
                <Link href="/orders">
                  <MenuItems onClick={toggleOpen}>Your Orders</MenuItems>
                </Link>
                <Link href="/admin">
                  <MenuItems onClick={toggleOpen}>Admin Dashboard</MenuItems>
                </Link>
                <hr className="border-dark" />
                <MenuItems
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItems>
              </div>
            ) : currentUser && currentUser.role === 'USER' ? (
              <div>
                <Link href="/orders">
                  <MenuItems onClick={toggleOpen}>Your Orders</MenuItems>
                </Link>
                <hr className="border-dark" />
                <MenuItems
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItems>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItems onClick={toggleOpen}>Login</MenuItems>
                </Link>
                <Link href="/register">
                  <MenuItems onClick={toggleOpen}>Register</MenuItems>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen ? <BackDrop onClick={toggleOpen} isOpen={isOpen} /> : null}
    </>
  );
}
export default UserMenu;
