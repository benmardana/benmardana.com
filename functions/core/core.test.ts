import { expect, it } from "vitest";
import { core } from "./core";

it("should create a manualytics event", () => {
  // arrange
  const input: core.ManualyticsEventInput = {
    ip: "testIp",
    city: "testCity",
    formData: {
      from: "testForm",
      message: "testMessage",
      contact: "testContact",
    },
  };

  const expectedOutput: core.ManualyticsEvent = {
    ip: "testIp",
    city: "testCity",
    from: "testForm",
    message: "testMessage",
    contact: "testContact",
  };

  // act
  const output = core.createManualyticsEvent(input);

  // assert
  expect(output).toEqual(expectedOutput);
});
