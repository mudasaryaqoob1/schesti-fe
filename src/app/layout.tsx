import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { ReduxProvider } from '@/redux/provider';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from './(pages)/providers';

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
      <body className={`${inter.className} bg-gray-100`}>
        <GoogleOAuthProvider
          clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
        >
          <ReduxProvider>
            <ToastContainer />
            <Providers>{children}</Providers>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
