import { now } from '../lib';

export const repository = (namespace: KVNamespace) => ({
  save: (value: any, key = now(), metadata?: any) =>
    namespace.put(key, JSON.stringify(value), { metadata }),
  list: <T>(options?: KVNamespaceListOptions) => namespace.list<T>(options),
  delete: (id: string) => namespace.delete(id),
});
