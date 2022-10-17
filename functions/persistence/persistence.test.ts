import { expect, it, vi } from "vitest";
import { persistence } from "./persistence";

const ManualyticsEventEnv = {
  put: vi.fn(),
  get: vi.fn(),
  list: vi.fn(),
  getWithMetadata: vi.fn(),
  delete: vi.fn(),
};

it("should save a manualytics event", async () => {
  const event = {
    ip: "testIp",
    city: "testCity",
    formData: {
      from: "testForm",
      message: "testMessage",
      contact: "testContact",
    },
  };
  vi.setSystemTime(new Date(1991, 5, 24));
  const expectedOutput = undefined;
  const putSpy = vi.spyOn(ManualyticsEventEnv, "put");

  const repository = new persistence.ManualyticsEventRepository(
    ManualyticsEventEnv
  );

  const output = await persistence.saveManualyticsEvent(event, repository);

  expect(output).toEqual(expectedOutput);
  expect(putSpy).toBeCalledWith(
    "677685600",
    '{"ip":"testIp","city":"testCity","formData":{"from":"testForm","message":"testMessage","contact":"testContact"}}'
  );
  vi.useRealTimers();
});
