import { StoreHeader } from '@/modules/store-header';

export default function StoreLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <StoreHeader />
      <div className='container mx-auto py-8'>
        <main>{children}</main>
      </div>
    </>
  );
}
