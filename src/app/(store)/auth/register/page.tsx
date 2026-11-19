import { AuthRegisterForm, AuthShell } from '@/screens/auth';
import { ROUTES } from '@/shared/config';

export default function RegisterPage() {
  return (
    <AuthShell
      title='Регистрация'
      description='Введите имя и электронную почту для регистрации аккаунта'
      action={{ href: ROUTES.LOGIN, label: 'Войти' }}
    >
      <AuthRegisterForm />
    </AuthShell>
  );
}
