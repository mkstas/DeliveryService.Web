import { ROUTES } from '@/common/config';
import { AuthShell, LoginForm } from '@/modules/auth';

export default function Auth() {
  return (
    <AuthShell title='Вход в аккаунт' action={{ href: ROUTES.REGISTER, label: 'Регистрация' }}>
      <LoginForm />
    </AuthShell>
  );
}
