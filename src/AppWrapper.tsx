import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { App as AntD } from 'antd';
import 'App.css';
import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import { queryClient } from 'overrides/react-query';
import { ErrorBoundary } from 'overrides/sentry';
import { getPersistOptions } from 'queries/persisters';

const persistOptions = getPersistOptions();

type Props = {
    children?: ReactNode;
};

const AppWrapper = ({ children }: Props) => (
    <StrictMode>
        <ErrorBoundary>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={persistOptions}
            >
                <AntD>{children}</AntD>
                <ReactQueryDevtools
                    buttonPosition={'top-right'}
                    initialIsOpen={false}
                />
            </PersistQueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);

export default AppWrapper;
