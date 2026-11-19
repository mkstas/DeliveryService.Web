'use client';

import { getUserImageUrl } from '@/shared/config';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { type FC } from 'react';
import { cn } from 'cn';
import { UserIcon } from 'lucide-react';

type UserCellProps = {
  imageUrl: string | null;
  name: string;
  className?: string;
};

export const UserCell: FC<UserCellProps> = ({ imageUrl, name, className }) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Avatar>
        {imageUrl && <AvatarImage src={getUserImageUrl(imageUrl)} alt={`Аватар ${name}`} />}
        <AvatarFallback>
          <UserIcon className='size-4' />
        </AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  );
};
