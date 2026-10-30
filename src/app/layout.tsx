import { Inter } from 'next/font/google';
import { TooltipProvider } from '@/common/components';
import { cn } from 'cn';
import { QueryProvider } from '@/common/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={cn('font-sans', inter.variable)}>
      <body className='bg-accent'>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
