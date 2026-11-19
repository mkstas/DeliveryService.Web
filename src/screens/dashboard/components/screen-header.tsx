import { FC } from 'react';
import { LucideIcon } from 'lucide-react';

type ScreenHeaderProps = {
  title: string;
  icon: LucideIcon;
};

export const ScreenHeader: FC<ScreenHeaderProps> = ({ title, icon: Icon }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
        <Icon className='size-5' />
      </div>
      <h1 className='text-xl font-bold'>{title}</h1>
    </div>
  );
};
