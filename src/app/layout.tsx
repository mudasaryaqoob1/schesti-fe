import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { ReduxProvider } from '@/redux/provider';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from './(pages)/providers';
import 'react-photo-view/dist/react-photo-view.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
         <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100&family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap"
          rel="stylesheet"
        /> 

        <link rel="icon" href="/images/Favicon.ico?v=4" />
      </head>
      <body className={`${inter.className} bg-white`}>
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
