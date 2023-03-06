export const belongsToArray = <TValue>(
  value: unknown,
  allowedValues: ReadonlyArray<TValue>
): value is TValue => (allowedValues as ReadonlyArray<unknown>).includes(value);

export const parseFormData = <K extends string>(
  formData: FormData,
  formFields: ReadonlyArray<K>
): Partial<Record<K, string>> => {
  const response: Partial<Record<K, string>> = {};
  for (const [key, value] of formData.entries()) {
    if (
      typeof value === 'string' &&
      value.length > 1 &&
      belongsToArray(key, formFields)
    ) {
      response[key] = value;
    }
  }
  return response;
};

/**
 * Seconds since the unix epoch
 */
export const now = () => {
  const unixEpochTimeUTC = Math.floor(Date.now() / 1000);
  return unixEpochTimeUTC.toString();
};

export const errorResponse = (e?: unknown) =>
  new Response(e instanceof Error ? e.message : 'Internal Server Error', {
    status: 500,
    statusText: e instanceof Error ? e.message : 'Internal Server Error',
  });

export const extractAuthToken = (headers: Headers) =>
  headers.get('authorization')?.split(' ')[1];
