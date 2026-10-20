import { AppHeader } from '@/modules/app-header';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <AppHeader />
      <div className='container mx-auto'>
        <main>{children}</main>
      </div>
    </>
  );
}
