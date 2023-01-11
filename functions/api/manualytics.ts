import { core } from '../core/core';
import { persistence } from '../persistence/persistence';

const belongsToArray = <TValue>(
  value: unknown,
  allowedValues: ReadonlyArray<TValue>
): value is TValue => (allowedValues as ReadonlyArray<unknown>).includes(value);

export namespace api {
  type Request = PagesFunction<{
    ManualyticsEventEnv: KVNamespace;
    AUTH_KEY: string;
    ACCOUNT_ID: string;
    API_TOKEN: string;
    NAMESPACE_ID: string;
  }>;

  export const formFields = ['from', 'message', 'contact'] as const;
  type FormDataFields = Partial<Record<typeof formFields[number], string>>;

  const parseFormData = (formData: FormData): FormDataFields => {
    const response: FormDataFields = {};
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

  export const onRequestPost: Request = async (context) => {
    try {
      const formData = parseFormData(await context.request.formData());
      const origin = new URL(context.request.url).origin;

      if (!('from' in formData)) {
        return Response.redirect(origin, 303);
      }

      const manualyticsEvent = core.createManualyticsEvent({
        formData,
      });

      const manualyticsEventRepository =
        new persistence.ManualyticsEventRepository(
          context.env.ManualyticsEventEnv
        );

      // act
      await manualyticsEventRepository.save(manualyticsEvent);

      // announce
      return Response.redirect(`${origin}/thanks-for-stopping-by`, 303);
    } catch (e) {
      console.log({ e });
      return new Response(undefined, {
        status: 500,
        statusText: e instanceof Error ? e.message : 'Internal Server Error',
      });
    }
  };

  export const onRequestGet: Request = async (context) => {
    const auth = context.request.headers.get('authorization')?.split(' ')[1];

    if (auth !== context.env.AUTH_KEY) {
      return new Response(null, {
        status: 401,
        headers: {
          [`WWW-Authenticate`]: 'Basic',
        },
      });
    }

    const KEYS_URL = (accountID: string, namespaceID: string) =>
      `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/keys`;

    const KEY_VALUE_URL = (
      accountID: string,
      namespaceID: string,
      key: string
    ) =>
      `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`;

    const keys = (
      await (
        await fetch(
          KEYS_URL(context.env.ACCOUNT_ID, context.env.NAMESPACE_ID),
          {
            headers: {
              Authorization: `Bearer ${context.env.API_TOKEN}`,
              ['Content-Type']: 'application/json',
            },
            method: 'GET',
          }
        )
      ).json<{ result: { name: string }[] }>()
    ).result;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>benmcgarvey.com</title>
  <meta name="description" content="benmcgarvey.com" />

  <meta property="og:title" content="benmcgarvey.com" />
  <meta property="og:description" content="benmcgarvey.com" />

  <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
  <link rel="manifest" href="assets/site.webmanifest" />

  <link rel="stylesheet" href="style.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/tables-min.css" crossorigin="anonymous">
  <script src="https://unpkg.com/htmx.org@1.8.4" integrity="sha384-wg5Y/JwF7VxGk4zLsJEcAojRtlVp1FKKdGy1qN+OMtdq72WRvX/EdRdqg/LOhYeV" crossorigin="anonymous"></script>
</head>
<body>
  <table class="pure-table">
  <thead>
    <tr>
      <th>From</th>
      <th>Contact</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    ${keys
      .map(
        ({ name }) =>
          `<tr hx-get="/api/manualytics/${name}" hx-trigger="revealed">
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>`
      )
      .join('\n')}
  </tbody>
  </table>
</body>`;

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  };
}

export const onRequestPost = api.onRequestPost;
export const onRequestGet = api.onRequestGet;
