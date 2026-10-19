import { Inter } from 'next/font/google';
import { cn } from '@/common/lib/utils';
import { QueryProvider } from '@/common/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={cn('font-sans', 'font-sans', inter.variable)}>
      <body className='bg-accent'>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
