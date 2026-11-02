import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/common/components';
import { SystemBreadcrumb, SystemSidebar } from '@/modules/dashboard';

export default function SystemLayout({ children }: LayoutProps<'/'>) {
  return (
    <SidebarProvider>
      <SystemSidebar />
      <SidebarInset>
        <header className='sticky top-0 z-10 flex w-full items-center gap-2 border-b bg-background p-2'>
          <SidebarTrigger />
          <SystemBreadcrumb />
        </header>
        <main className='container mx-auto px-4 py-2'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
