import './globals.css';
import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import { GlobalStateProvider } from '@/context/context';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';

const titillium_web = Titillium_Web({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Gadgets Galore Store',
  description: 'Buy your favorite electronic products online',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${titillium_web.className} text-slate-700`}>
        <GlobalStateProvider>
          <div className="flex flex-col min-h-screen overflow-y-scroll">
            <NavBar />
            <main className="flex-grow min-h-screen">{children}</main>
            <Footer />
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
