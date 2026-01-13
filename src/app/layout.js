import "./globals.css";
import GlobalProviders from "@/contexts/GlobalProviders";
import { asset } from '@/utils/basePath';

export const metadata = {
  title: "JaneStyle",
  description: "JaneStyle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={asset=('img/logos/JS (BLANCO).png')} />
      </head>
      <body className={`antialiased`}>
        <GlobalProviders>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}