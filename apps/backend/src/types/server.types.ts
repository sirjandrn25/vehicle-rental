import { DictionaryType } from "core";
import type { Request } from "express";

export type WithUserRequestType = Request & {
  user?: DictionaryType;
};
