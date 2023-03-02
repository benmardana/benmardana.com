export const repository = (namespace: KVNamespace) => {
  const save = (...args: Parameters<typeof namespace.put>) =>
    namespace.put(...args);

  const list = <T>(...args: Parameters<typeof namespace.list>) =>
    namespace.list<T>(...args);

  const del = (...args: Parameters<typeof namespace.delete>) =>
    namespace.delete(...args);

  return {
    save,
    list,
    del,
  };
};
