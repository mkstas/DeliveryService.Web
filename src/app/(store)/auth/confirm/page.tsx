import Link from 'next/link';
import {
  buttonVariants,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { ConfirmForm } from '@/modules/auth/components/confirm-form';

export default function Register() {
  return (
    <div className='container mx-auto py-32'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Подтверждение почты</CardTitle>
          <CardDescription>Отправили код на электронную почту</CardDescription>
          <CardAction>
            <Link href={ROUTES.REGISTER} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              Изменить почту
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ConfirmForm />
        </CardContent>
      </Card>
    </div>
  );
}
