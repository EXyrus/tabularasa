
import { toast } from '@/components/ui/use-toast';
import type { FetchResponseError } from '@/types/fetch';

export const checkServerErrors = (errors: FetchResponseError) => {
  if (errors.errors) {
    Object.entries(errors.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast({
          title: `Error in ${field}`,
          description: message,
          variant: 'destructive',
        });
      });
    });
    return true;
  }

  if (errors.message) {
    toast({
      title: 'Error',
      description: errors.message,
      variant: 'destructive',
    });
    return true;
  }

  return false;
};

export default checkServerErrors;
