import Link from 'next/link';
import { buttonVariants, Card, CardContent, CardTitle } from '@/common/components';
import { RegisterForm } from '@/modules/auth';

export default function Register() {
  return (
    <div className='container mx-auto py-32'>
      <Card className='py-0 max-w-5xl mx-auto'>
        <CardContent className='flex p-0'>
          <div className='flex w-full max-w-sm flex-col gap-(--card-spacing) p-(--card-spacing)'>
            <div className='flex items-center justify-between'>
              <CardTitle>Регистрация</CardTitle>
              <Link href={'/login'} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                Вход в аккаунт
              </Link>
            </div>
            <RegisterForm />
          </div>
          <div className='flex-1 border-l p-(--card-spacing) text-muted-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
