
import { localStoragePersister } from '../persisters';
import { type PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

export const persistOptions: PersistQueryClientOptions = {
  persister: localStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      return !queryKey.includes('temp') && !queryKey.includes('transient');
    },
  },
};

export { localStoragePersister };
