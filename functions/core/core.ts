export namespace core {
  export interface ManualyticsEvent
    extends Partial<IncomingRequestCfProperties> {
    ip?: string;
    from?: string;
    message?: string;
    contact?: string;
  }

  export const createManualyticsEvent: (
    request: Request
  ) => Promise<ManualyticsEvent> = async (request) => ({
    ip: request.headers.get("CF-Connecting-IP") ?? undefined,
    ...(request.body ? await request.json() : undefined),
    ...request.cf,
  });
}
