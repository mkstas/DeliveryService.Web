import { ROUTES } from '@/common/config';
import { AuthRegisterForm, AuthShell } from '@/modules/store-auth';

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
