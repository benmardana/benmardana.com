export namespace core {
  export interface ManualyticsEvent {
    from?: string;
    message?: string;
    contact?: string;
  }

  export interface ManualyticsEventInput {
    formData?: {
      from?: string;
      message?: string;
      contact?: string;
    };
  }

  export const createManualyticsEvent: (
    input: ManualyticsEventInput
  ) => ManualyticsEvent = ({ formData }) => ({
    ...formData,
  });
}
