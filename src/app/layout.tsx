import { QueryProvider } from '@/shared/lib/providers';
import { TooltipProvider } from '@/shared/ui';
import { cn } from 'cn';
import { Noto_Sans } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={cn('font-sans', 'font-sans', 'font-sans', notoSans.variable)}>
      <body className='bg-accent'>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
