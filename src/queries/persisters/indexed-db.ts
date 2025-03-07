import { get, set, del } from 'idb-keyval';
import type {
    PersistedClient,
    Persister
} from '@tanstack/react-query-persist-client';
import { captureException } from 'overrides/sentry';

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
const createPersister = (idbValidKey: IDBValidKey = 'reactQuery') => {
    return {
        persistClient: async (client: PersistedClient) => {
            await set(idbValidKey, client).catch(captureException);
        },
        restoreClient: () => {
            return get<PersistedClient>(idbValidKey).catch(captureException);
        },
        removeClient: async () => {
            await del(idbValidKey).catch(captureException);
        }
    } as Persister;
};

export default createPersister;
