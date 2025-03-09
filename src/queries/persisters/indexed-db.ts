
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { get, set, del } from 'idb-keyval';
import { dehydrate, hydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import * as Sentry from '@/overrides/sentry.override';

type StoragePersister = {
  persistClient: (client: QueryClient) => Promise<void>;
  restoreClient: (client: QueryClient) => Promise<void>;
  removeClient: () => Promise<void>;
};

const asyncStoragePersister: StoragePersister = {
  persistClient: async (client) => {
    try {
      const dehydratedState = dehydrate(client);
      await set('REACT_QUERY_OFFLINE_CACHE', dehydratedState);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error persisting cache', error);
    }
  },
  restoreClient: async (client) => {
    try {
      const dehydratedState = await get('REACT_QUERY_OFFLINE_CACHE');
      if (dehydratedState) {
        hydrate(client, dehydratedState);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error restoring cache', error);
    }
  },
  removeClient: async () => {
    try {
      await del('REACT_QUERY_OFFLINE_CACHE');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error removing cache', error);
    }
  },
};

export const syncStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default asyncStoragePersister;
