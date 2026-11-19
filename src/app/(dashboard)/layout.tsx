import { ROUTES } from '@/shared/config';
import { dashboardAccessRule, RouteGuard } from '@/shared/lib/auth';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui';
import { DashboardBreadcrumb, DashboardSidebar } from '@/widgets/dashboard-sidebar';

export default function DashboardLayout({ children }: LayoutProps<'/'>) {
  return (
    <RouteGuard rule={dashboardAccessRule} section={ROUTES.DASHBOARD}>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div className='sticky top-0 z-10 flex w-full items-center gap-2 border-b bg-background p-2'>
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>
          <main className='container mx-auto px-4'>
            <div className='flex flex-col gap-6 py-6'>{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </RouteGuard>
  );
}
