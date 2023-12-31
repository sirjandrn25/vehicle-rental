import { DictionaryType } from "../types/common.types";
import { CommonUtils } from "./common.utils";
import { ObjectUtils } from "./object.utils";

export class ArrayUtils extends CommonUtils {
  static getObject(arr: Object[], key: string, value: string | number) {
    if (!ArrayUtils.isArray(arr)) return {};
    for (let el of arr) {
      if (ObjectUtils.accessNestedValue(el, key) === value) {
        return el;
      }
    }
    return {};
  }

  static isArray(el: any) {
    return Array.isArray(el);
  }
  static isUniqueObject = (array: any[], key: string) => {
    if (!ArrayUtils.isArray(array)) return false;
    return ArrayUtils.isUnique(array.map((element) => element[key]));
  };

  static isUnique = (array: (string | number)[]) => {
    const exist_elements: any[] = [];
    for (let arr of array) {
      if (!exist_elements.includes(arr)) exist_elements.push(arr);
    }
    return exist_elements?.length === array?.length;
  };

  static removeDuplicates = (array: DictionaryType[], key: string) => {
    const filterArrays: DictionaryType[] = [];
    array.forEach((element) => {
      if (
        ObjectUtils.isEmpty(this.getObject(filterArrays, key, element[key]))
      ) {
        filterArrays.push(element);
      }
    });
    return filterArrays;
  };

  static isEmpty(el: any) {
    if (!el) return true;
    if (!ArrayUtils.isArray(el)) return false;
    return el.length === 0;
  }
}
