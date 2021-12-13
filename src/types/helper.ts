import type { URLSearchParams } from "url";
import type FormData from "form-data";
/**
 * Appends queryParams into {@link URLSearchParams}. \
 * Accepts array, string and objects with arrays as values \
 * @param searchParams
 * @param params
 * @param key Use only if typeof searchParams is not an object.
 */
const parseAndSet = (
  searchParams: URLSearchParams | FormData,
  params: any,
  key?: string,
) => {
  // Strings, numbers, arrays are considered objects.
  // So I need to chain it like this.
  // I know it's cancer but it gets the job done lol.
  if (typeof params === "string" && key) {
    return searchParams.append(key, params);
  } else if (typeof params === "number" && key) {
    return searchParams.append(key, params.toString());
  } else if (params instanceof Array && key) {
    params.forEach((param) => {
      parseAndSet(searchParams, param, key);
    });
  } else if (params instanceof Object && key) {
    Object.keys(params).forEach((thisKey) => {
      parseAndSet(searchParams, params[thisKey], `${key}[${thisKey}]`);
    });
  } else if (params instanceof Object) {
    Object.keys(params).forEach((thisKey) => {
      parseAndSet(searchParams, params[thisKey], thisKey);
    });
  }
};
export default {
  parseAndSet: parseAndSet,
};
