import { expect, it, vi } from 'vitest';
import { persistence } from './persistence';

const ManualyticsEventEnv = {
  put: vi.fn(),
  get: vi.fn(),
  list: vi.fn(),
  getWithMetadata: vi.fn(),
  delete: vi.fn(),
};

it('should save a manualytics event', async () => {
  const event = {
    from: 'testForm',
    message: 'testMessage',
    contact: 'testContact',
  };
  const date = new Date(1991, 5, 24);
  vi.setSystemTime(date);
  const expectedOutput = undefined;
  const putSpy = vi.spyOn(ManualyticsEventEnv, 'put');

  const repository = new persistence.ManualyticsEventRepository(
    ManualyticsEventEnv
  );

  const output = await persistence.saveManualyticsEvent(event, repository);

  expect(output).toEqual(expectedOutput);
  expect(putSpy).toBeCalledWith(
    Math.floor(Date.now() / 1000).toString(),
    '{"from":"testForm","message":"testMessage","contact":"testContact"}'
  );
  vi.useRealTimers();
});
