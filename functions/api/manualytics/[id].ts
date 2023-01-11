type Request = PagesFunction<{
  ManualyticsEventEnv: KVNamespace;
  AUTH_KEY: string;
  ACCOUNT_ID: string;
  API_TOKEN: string;
  NAMESPACE_ID: string;
}>;

const KEY_VALUE_URL = (
  accountID: string,
  namespaceID: string,
  key: string | string[]
) =>
  `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`;

export const onRequestDelete: Request = async (context) => {
  const auth = context.request.headers.get('authorization')?.split(' ')[1];

  if (auth !== context.env.AUTH_KEY) {
    return new Response(null, {
      status: 401,
      headers: {
        [`WWW-Authenticate`]: 'Basic',
      },
    });
  }

  const result = await fetch(
    KEY_VALUE_URL(
      context.env.ACCOUNT_ID,
      context.env.NAMESPACE_ID,
      context.params.id
    ),
    {
      headers: {
        Authorization: `Bearer ${context.env.API_TOKEN}`,
        ['Content-Type']: 'application/json',
      },
      method: 'DELETE',
    }
  );

  if (!result.ok) {
    return new Response(null, { status: 500 });
  }
  return new Response(null, { status: 200 });
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

  const { from, message, contact } = await (
    await fetch(
      KEY_VALUE_URL(
        context.env.ACCOUNT_ID,
        context.env.NAMESPACE_ID,
        context.params.id
      ),
      {
        headers: {
          Authorization: `Bearer ${context.env.API_TOKEN}`,
          ['Content-Type']: 'application/json',
        },
        method: 'GET',
      }
    )
  ).json<{ from: string; message: string; contact: string }>();

  const html = `<td>${from}</td><td>${contact}</td><td>${message}</td><td>
  <button class="pure-button" hx-delete="/api/manualytics/${context.params.id}" hx-target="closest tr" hx-swap="outerHTML">
    Delete
  </button>
</td>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
};
