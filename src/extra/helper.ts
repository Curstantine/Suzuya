import type { URLSearchParams } from "url";
import type FormData from "form-data";
/**
 * Appends queryParams into {@link URLSearchParams}. \
 * Accepts array, string and objects with arrays as values \
 * @param searchParams
 * @param params
 * @param key Use only if typeof searchParams is not an object.
 */
const parseAndSet = (searchParams: URLSearchParams | FormData, params: any, key?: string) => {
  if (typeof params === "string" && key) {
    return searchParams.append(key, params);
  }

  if (typeof params === "number" && key) {
    return searchParams.append(key, params.toString());
  }

  if (params instanceof Array && key) {
    params.forEach((param) => {
      parseAndSet(searchParams, param, key);
    });
  }

  if (params instanceof Object) {
    Object.keys(params).forEach((thisKey) => {
      parseAndSet(searchParams, params[thisKey], thisKey);
    });
  }
};
export default {
  parseAndSet: parseAndSet,
};
