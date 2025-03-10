
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'TABULA_RASA_QUERY_CACHE',
  throttleTime: 1000,
  // Use 24 hours for serialized data
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});
