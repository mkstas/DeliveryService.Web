import * as React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './input';

type SearchInputProps = Omit<React.ComponentProps<typeof Input>, 'type' | 'className'>;

/**
 * Text input with a leading search icon and no native clear ("×") button.
 */
function SearchInput(props: SearchInputProps) {
  return (
    <div className='relative w-full sm:max-w-xs'>
      <SearchIcon className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        type='search'
        className='pl-8 [&::-ms-clear]:hidden [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'
        {...props}
      />
    </div>
  );
}

export { SearchInput };
