import { makeRepository } from './persistence';

export interface AppENV {
  mailbox: KVNamespace;
  AUTH_KEY: string;
  ACCOUNT_ID: string;
  API_TOKEN: string;
  NAMESPACE_ID: string;
}

export type Repository = ReturnType<typeof makeRepository>;

export type Request = PagesFunction<AppENV & { MAILBOX_REPO: Repository }>;

export type MiddlewareRequest = PagesPluginFunction<
  AppENV & { MAILBOX_REPO?: Repository }
>;
