import type { Fetcher } from 'swr';
import useSWRImmutable from 'swr/immutable';

interface Mail {
  id: string;
  from?: string;
  message?: string;
  contact?: string;
}

const mailFetcher: Fetcher<Mail[]> = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json().then((json) => json.data));

export const deleteMail = async (id: string, onDelete?: () => void) => {
  try {
    const res = await fetch(`/api/mailbox/${id}`, { method: 'DELETE' });
    res.ok && onDelete?.();
  } catch (e) {
    alert('Something went wrong. Check the console for more info.');
    console.log(e instanceof Error ? e.message : 'Internal Server Error');
  }
};

export const useMail = () => useSWRImmutable('/api/mailbox', mailFetcher);
