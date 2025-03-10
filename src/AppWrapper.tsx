
import { ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from '@/overrides/react-query.override';
import * as Sentry from '@sentry/react';
import { persistOptions } from '@/queries/persisters/index';
import { ThemeProvider } from '@/context/ThemeContext';

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
};

export default Sentry.withProfiler(AppWrapper);
