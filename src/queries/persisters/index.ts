import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import type { PersistQueryClientProviderProps } from '@tanstack/react-query-persist-client';
import { getAppInfo, getAppScope } from '@/helpers/app';
import { isCypress } from '@/helpers/env';
// import { globalQueryKeys } from 'queries/global';
// import { pagesQueryKeys } from 'queries/pages';
// import { getRemoteConfigBooleanValue } from 'overrides/firebase.remote-config';
import createIndexedDBPersister from './indexed-db';

const { version } = getAppInfo();

export const getPersistOptions = () => {
    let persister = createIndexedDBPersister(`reactQuery.${getAppScope()}`);

    if (isCypress()) {
        persister = createSyncStoragePersister({
            storage: window.localStorage
        });
    }

    return {
        persister,
        buster: version,
        dehydrateOptions: {
            shouldDehydrateQuery: (/* { queryKey }*/) => {
                return true;
                // if (getRemoteConfigBooleanValue('CacheAllQuery')) {
                //     return true;
                // }

                // return [
                //     // globalQueryKeys.DATABASE,
                //     // globalQueryKeys.DATABASE_INDEXED,
                //     // globalQueryKeys.COUNTRIES,
                //     // globalQueryKeys.COUNTRY_STATES,
                //     // pagesQueryKeys.HOME
                // ].includes(queryKey);
            }
        }
    } as PersistQueryClientProviderProps['persistOptions'];
};
