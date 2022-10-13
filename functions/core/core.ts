export namespace core {
  export interface ManualyticsEvent {
    ip?: string;
    city?: string;
    country?: string;
    from?: string;
    message?: string;
    contact?: string;
  }

  export interface ManualyticsEventInput {
    ip?: string;
    city?: string;
    country?: string;
    formData?: {
      from?: string;
      message?: string;
      contact?: string;
    };
  }

  export const createManualyticsEvent: (
    input: ManualyticsEventInput
  ) => Promise<ManualyticsEvent> = async ({ formData, ...rest }) => ({
    ...formData,
    ...rest,
  });
}
