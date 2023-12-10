import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledJsxRegistry from './registry';
import StoreProvider from './storeProvider';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import ClientNavbar from './component/navbar/clientnavbar';
import Tabs from './component/tabs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schesti',
  description: 'Schesti App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledJsxRegistry>
          <StoreProvider>
            <ToastContainer />
            <ClientNavbar />
            <Tabs />
            {children}
          </StoreProvider>
        </StyledJsxRegistry>

      </body>
    </html>
  );
}
