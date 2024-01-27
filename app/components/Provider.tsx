'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Footer from './footer/Footer';
import NavBar from './navBar/NavBar';
import { GlobalStateProvider } from '@/context/context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}
