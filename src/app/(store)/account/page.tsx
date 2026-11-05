import { Card, CardContent, CardHeader, CardTitle } from '@/common/components';
import { StoreAccountBio, StoreAccountEmail, StoreAccountProfile } from '@/modules/store-account';

export default function AccountPage() {
  return (
    <div className='mx-auto flex w-full flex-col gap-6'>
      <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]'>
        <Card className='h-fit'>
          <CardContent>
            <StoreAccountProfile />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='border-b'>
            <CardTitle>Личные данные</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-6'>
            <StoreAccountBio />
            <StoreAccountEmail />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
