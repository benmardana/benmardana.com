import { Request } from '../../types';
import { errorResponse, extractAuthToken, parseFormData } from '../../lib';
import {
  handleListManualytics,
  handleSaveManualyticsMessage,
} from '../../handlers/manualytics';

export const onRequestPost: Request = async (context) => {
  try {
    const origin = new URL(context.request.url).origin;

    const { from, message, contact } = parseFormData(
      await context.request.formData(),
      ['from', 'message', 'contact']
    );

    if (!from) {
      return Response.redirect(origin, 303);
    }

    await handleSaveManualyticsMessage(context.env.MESSAGE_REPO, {
      from,
      message,
      contact,
    });

    return Response.redirect(`${origin}/thanks-for-stopping-by`, 303);
  } catch (e) {
    return errorResponse(e);
  }
};

export const onRequestGet: Request = async (context) => {
  try {
    if (extractAuthToken(context.request.headers) !== context.env.AUTH_KEY) {
      return new Response(null, {
        status: 401,
        headers: {
          [`WWW-Authenticate`]: 'Basic',
        },
      });
    }

    const data = await handleListManualytics(context.env.MESSAGE_REPO);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>benmcgarvey.com</title>
  <meta name="description" content="benmcgarvey.com" />

  <meta property="og:title" content="benmcgarvey.com" />
  <meta property="og:description" content="benmcgarvey.com" />

  <link rel="apple-touch-icon" sizes="180x180" href="https://benmcgarvey.com/assets/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="https://benmcgarvey.com/assets/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="https://benmcgarvey.com/assets/favicon-16x16.png" />
  <link rel="manifest" href="https://benmcgarvey.com/assets/site.webmanifest" />

  <link rel="stylesheet" href="https://benmcgarvey.com/style.css" />
  <link rel="stylesheet" href="//cdn.jsdelivr.net/combine/npm/purecss@3.0.0/build/tables-min.css,npm/purecss@3.0.0/build/buttons-min.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://unpkg.com/htmx.org@1.8.4" integrity="sha384-wg5Y/JwF7VxGk4zLsJEcAojRtlVp1FKKdGy1qN+OMtdq72WRvX/EdRdqg/LOhYeV" crossorigin="anonymous"></script>
</head>
<body>
  <table class="pure-table" style="width: 90%; max-width: 90%;">
  <thead>
    <tr>
      <th>From</th>
      <th>Contact</th>
      <th>Message</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    ${data
      .map(
        ({ name, message, from, contact }) =>
          `
    <tr>
      <td>${from}</td><td>${contact}</td><td>${message}</td>
      <td>
      <button class="pure-button" hx-delete="/api/manualytics/${name}" hx-target="closest tr" hx-swap="outerHTML">
        Delete
      </button>
      </td>
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
  } catch (e) {
    return errorResponse(e);
  }
};
