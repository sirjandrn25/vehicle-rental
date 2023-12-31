import { CommonUtils } from "./common.utils";

export class FunctionUtils extends CommonUtils {
  static IsFunction = (value: any) => {
    if (!value) return false;
    return typeof value === "function";
  };
}
