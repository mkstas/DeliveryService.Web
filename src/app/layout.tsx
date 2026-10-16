import { Inter } from 'next/font/google';
import { cn } from '@/common/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={cn('font-sans', inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
