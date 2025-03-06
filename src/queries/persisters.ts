
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'TABULA_RASA_QUERY_CACHE',
});
