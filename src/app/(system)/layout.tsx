import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/common/components';
import { SystemSidebar } from '@/modules/dashboard';

export default function SystemLayout({ children }: LayoutProps<'/'>) {
  return (
    <SidebarProvider>
      <SystemSidebar />
      <SidebarInset>
        <header className='sticky w-full top-0 flex items-center p-2'>
          <SidebarTrigger />
        </header>
        <main className='container mx-auto px-4 py-2'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
