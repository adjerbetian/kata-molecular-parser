import { config } from "../config";

interface Options {
  query?: Query;
}

export const api = {
  get,
};

async function get<T>(route: string, options?: Options): Promise<T> {
  const response = await doFetch(route, options);
  return response.json();
}

async function doFetch(route: string, options?: Options) {
  const response = await fetch(formatUrl());
  await handleError(response);
  return response;

  function formatUrl(): string {
    return addQuery(config.api + route, options?.query || {});
  }
  async function handleError(response: Response) {
    if (response.status === 200) return;
    throw new ApiError(response.status, await response.text(), route);
  }
}

type Query = Record<string, string | string[]>;
function addQuery(stringUrl: string, query: Query) {
  const url = new URL(stringUrl);
  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === "string") appendParam(value);
    if (Array.isArray(value)) value.forEach(appendParam);

    function appendParam(v: string) {
      url.searchParams.append(key, v);
    }
  });
  return url.toString();
}

class ApiError extends Error {
  status;
  url;

  constructor(status: number, message: string, url: string) {
    super(message);
    this.status = status;
    this.url = url;
  }
}
