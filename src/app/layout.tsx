import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/molecules/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pdf Compresser',
  description: 'Compress PDFs for free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='px-4 sm:px-32'>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
