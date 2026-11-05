import { notFound } from 'next/navigation';
import { ROUTES } from '@/common/config';
import { AuthConfirmForm, AuthShell } from '@/modules/store-auth';

type ConfirmPageProps = {
  searchParams: Promise<{ emailAddress?: string }>;
};

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const { emailAddress } = await searchParams;

  if (!emailAddress) {
    return notFound();
  }

  return (
    <AuthShell
      title='Подтверждение почты'
      description={`Мы отправили код на ${emailAddress}`}
      action={{ href: ROUTES.LOGIN, label: 'Войти' }}
    >
      <AuthConfirmForm emailAddress={emailAddress} />
    </AuthShell>
  );
}
