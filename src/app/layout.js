import "./globals.css";
import GlobalProviders from "@/contexts/GlobalProviders";
import { asset } from '@/utils/basePath';

export const metadata = {
  title: "JaneStyle",
  description: "JaneStyle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{
      '--asset-prefix': process.env.NEXT_PUBLIC_ASSET_PREFIX || '/',
    }}>
      <head>
        <link rel="icon" href={asset('img/logos/JS (BLANCO).png')} />
      </head>
      <body className={`antialiased`}>
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}