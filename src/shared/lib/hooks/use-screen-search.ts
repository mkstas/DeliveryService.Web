import { useState } from 'react';
import { useDebouncedValue } from './use-debounced-value';

const DEFAULT_SEARCH_DEBOUNCE_MS = 400;

/**
 * Screen-level search state: the raw input value plus its debounced counterpart.
 */
export const useScreenSearch = (delayMs: number = DEFAULT_SEARCH_DEBOUNCE_MS) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, delayMs);

  return { search, setSearch, debouncedSearch };
};
