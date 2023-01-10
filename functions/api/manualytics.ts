import { core } from '../core/core';
import { persistence } from '../persistence/persistence';

const belongsToArray = <TValue>(
  value: unknown,
  allowedValues: ReadonlyArray<TValue>
): value is TValue => (allowedValues as ReadonlyArray<unknown>).includes(value);

export namespace api {
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

  export const onRequestPost: PagesFunction<{
    ManualyticsEventEnv: KVNamespace;
  }> = async (context) => {
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
}

export const onRequestPost = api.onRequestPost;
