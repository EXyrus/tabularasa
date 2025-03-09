
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import checkServerErrors from '@/helpers/check-server-errors';
import type { FetchResponseError } from '@/types/fetch';

export function useOnError() {
  const onError = useCallback((error: unknown) => {
    const errorResponse = error as { response?: { data: FetchResponseError } };
    
    if (errorResponse?.response?.data) {
      const serverError = errorResponse.response.data;
      checkServerErrors(serverError);
    } else {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  }, []);

  return onError;
}

export default useOnError;
