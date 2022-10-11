export namespace core {
  export interface ManualyticsEvent
    extends Partial<IncomingRequestCfProperties> {
    ip?: string;
    from?: string;
    message?: string;
    contact?: string;
  }

  export interface ManualyticsEventInput {
    ip?: string;
    cf?: IncomingRequestCfProperties;
    formData?: {
      from?: string;
      message?: string;
      contact?: string;
    };
  }

  export const createManualyticsEvent: (
    input: ManualyticsEventInput
  ) => Promise<ManualyticsEvent> = async ({ ip, cf, formData }) => ({
    ip,
    ...formData,
    ...cf,
  });
}
