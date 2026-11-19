import { AccountBio, AccountProfile } from '@/screens/account';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

export default function AccountPage() {
  return (
    <div className='mx-auto flex w-full flex-col gap-6'>
      <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]'>
        <Card className='h-fit'>
          <CardContent>
            <AccountProfile />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='border-b'>
            <CardTitle>Личные данные</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountBio />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
