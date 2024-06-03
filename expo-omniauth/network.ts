import { token } from "./auth";

export const ENDPOINT = "http://localhost:3000";

// Define types for the request options and response
interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  params?: string | Record<string, any>;
}

// Define a type for the response
interface ResponseError {
  status: number;
  statusText: string;
}

export const get = (path: string, opts: RequestOptions = {}): Promise<any> => {
  return makeRequest(path, opts);
};

export const post = (
  path: string,
  data: any,
  opts: RequestOptions = {}
): Promise<any> => {
  return makeRequest(path, {
    ...opts,
    method: "POST",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
};

export const put = (
  path: string,
  data: any,
  opts: RequestOptions = {}
): Promise<any> => {
  return makeRequest(path, {
    ...opts,
    method: "PUT",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
};

export const patch = (
  path: string,
  data: any,
  opts: RequestOptions = {}
): Promise<any> => {
  return makeRequest(path, {
    ...opts,
    method: "PATCH",
    params: JSON.stringify(data),
    headers: { "Content-Type": "application/json", ...opts.headers },
  });
};

export const destroy = (
  path: string,
  opts: RequestOptions = {}
): Promise<any> => {
  return makeRequest(path, { ...opts, method: "DELETE" });
};

export const makeRequest = (
  path: string,
  opts: RequestOptions
): Promise<any> => {
  const url = `${ENDPOINT}${path}`;
  const method = opts.method || "GET";

  opts.headers = opts.headers || {};
  opts.headers["Accept"] = "application/json";
  if (token) {
    opts.headers["Authorization"] = `Bearer ${token}`;
  }

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        } as ResponseError);
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      } as ResponseError);
    };

    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers![key]);
      });
    }

    let params = opts.params;
    if (params && typeof params === "object") {
      const paramsRecord: Record<string, any> = params;
      params = Object.keys(params)
        .map(function (key) {
          return (
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(paramsRecord[key])
          );
        })
        .join("&");
    }

    xhr.send(params as Document | XMLHttpRequestBodyInit | null | undefined);
  });
};
