import { ROUTES } from '@/common/config';
import { AuthShell, RegisterForm } from '@/modules/auth';

export default function Register() {
  return (
    <AuthShell title='Регистрация' action={{ href: ROUTES.LOGIN, label: 'Вход в аккаунт' }}>
      <RegisterForm />
    </AuthShell>
  );
}
