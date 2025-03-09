
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'TABULA_RASA_QUERY_CACHE',
  throttleTime: 1000,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});
