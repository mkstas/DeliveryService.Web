import { ROUTES } from '@/shared/config';
import { RouteGuard, systemAccessRule } from '@/shared/lib/auth';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui';
import { SystemBreadcrumb, SystemSidebar } from '@/widgets/system-sidebar';

export default function SystemLayout({ children }: LayoutProps<'/'>) {
  return (
    <RouteGuard rule={systemAccessRule} section={ROUTES.SYSTEM}>
      <SidebarProvider>
        <SystemSidebar />
        <SidebarInset>
          <div className='sticky top-0 z-10 flex w-full items-center gap-2 border-b bg-background p-2'>
            <SidebarTrigger />
            <SystemBreadcrumb />
          </div>
          <main className='container mx-auto px-4'>
            <div className='flex flex-col gap-6 py-6'>{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </RouteGuard>
  );
}
