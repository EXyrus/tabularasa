
import { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { queryClient } from '@/overrides/react-query.override';

// Create a persister
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'TABULA_RASA_QUERY_CACHE',
});

// Create the persist options
export const persistOptions: PersistQueryClientOptions = {
  persister: localStoragePersister,
  queryClient: queryClient,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      // Only persist specific queries
      return (
        Array.isArray(queryKey) &&
        (queryKey[0] === 'institutionTheme' || queryKey[0] === 'user')
      );
    },
  },
};
