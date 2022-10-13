import { core } from "../core/core";
import { persistence } from "../persistence/persistence";

const belongsToArray = <TValue>(
  value: unknown,
  allowedValues: ReadonlyArray<TValue>
): value is TValue => (allowedValues as ReadonlyArray<unknown>).includes(value);

export namespace api {
  const formFields = ["from", "message", "contact", "ip", "location"] as const;
  type FormDataFields = Partial<Record<typeof formFields[number], string>>;

  const parseFormData = (formData: FormData): FormDataFields => {
    const response: FormDataFields = {};
    for (const [key, value] of formData.entries()) {
      if (
        typeof value === "string" &&
        value.length > 1 &&
        belongsToArray(key, formFields)
      ) {
        response[key] = value;
      }
    }
    return response;
  };

  export const onRequestPost: PagesFunction<{
    ManualyticsEventEnv: KVNamespace;
  }> = async (context) => {
    try {
      const formData = parseFormData(await context.request.formData());
      const ip = formData.ip
        ? context.request.headers.get("CF-Connecting-IP") ?? undefined
        : undefined;
      const location: IncomingRequestCfProperties | undefined =
        formData.location ? context.request.cf : undefined;

      const manualyticsEvent = await core.createManualyticsEvent({
        ip,
        formData,
        city: location?.city,
        country: location?.country,
      });

      const manualyticsEventRepository =
        new persistence.ManualyticsEventRepository(
          context.env.ManualyticsEventEnv
        );

      // act
      await manualyticsEventRepository.save(manualyticsEvent);

      // announce
      const url = new URL(context.request.url);
      return Response.redirect(
        `${url.protocol}//${url.host}/thanks-for-stopping-by`,
        303
      );
    } catch (e) {
      console.log({ e });
      return new Response(undefined, {
        status: 500,
        statusText: e instanceof Error ? e.message : "Internal Server Error",
      });
    }
  };
}

export const onRequestPost = api.onRequestPost;
