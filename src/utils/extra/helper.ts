import { URLSearchParams } from "url";

/**
 * Appends queryParams into {@link URLSearchParams}. \
 * Accepts array, string and objects with arrays as values \
 * @param key Use only if typeof searchParams is not an object.
 */
const parseParams = (searchParams: URLSearchParams, params: any, key?: string) => {
  if (params instanceof Array && key) {
    params.forEach((param) => searchParams.append(key, param));
  }

  if (typeof params === "string" && key) {
    searchParams.append(key, params);
  }

  if (typeof params === "object") {
    Object.keys(params).forEach((key) => {
      const current = params[key];

      if (current instanceof Array) {
        current.forEach((paramElem) => {
          searchParams.append(key, paramElem);
        });
      }
      searchParams.append(key, current);
    });
  }
};

export default {
  parseParams: parseParams,
};
