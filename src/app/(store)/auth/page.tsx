import { ROUTES } from '@/common/config';
import { AuthLoginForm, AuthShell } from '@/modules/store-auth';

type AuthPageProps = {
  searchParams: Promise<{ emailAddress?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const { emailAddress } = await searchParams;

  return (
    <AuthShell
      title='Вход в аккаунт'
      description='Введите электронную почту для входа в аккаунт'
      action={{ href: ROUTES.REGISTER, label: 'Регистрация' }}
    >
      <AuthLoginForm defaultEmailAddress={emailAddress} />
    </AuthShell>
  );
}
