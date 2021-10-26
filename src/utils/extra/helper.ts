import { URLSearchParams } from "url";

/**
 * Appends queryParams into {@link URLSearchParams}. \
 * Accepts array, string and objects with arrays as values \
 * @param searchParams
 * @param params
 * @param key Use only if typeof searchParams is not an object.
 */
const parseParams = (searchParams: URLSearchParams, params: any, key?: string) => {
  if (typeof params === "string" && key) {
    searchParams.set(key, params);
  }

  if (typeof params === "number" && key) {
    searchParams.set(key, params.toString());
  }

  if (params instanceof Array && key) {
    params.forEach((param) => {
      parseParams(searchParams, param, key);
    });
  }

  if (params instanceof Object) {
    Object.keys(params).forEach((thisKey) => {
      parseParams(searchParams, params[thisKey], thisKey);
    });
  }
};
export default {
  parseParams: parseParams,
};
