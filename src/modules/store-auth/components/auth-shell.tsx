import { FC, PropsWithChildren } from 'react';
import { cn } from 'cn';
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

type AuthShellProps = PropsWithChildren<{
  title: string;
  description: string;
  action: {
    href: string;
    label: string;
  };
}>;

export const AuthShell: FC<AuthShellProps> = ({ title, description, action, children }) => {
  return (
    <Card className='mx-auto max-w-md'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Link href={action.href} className={cn(buttonVariants({ variant: 'link', size: 'sm' }))}>
            {action.label}
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
