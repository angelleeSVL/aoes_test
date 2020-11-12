import "whatwg-fetch";
import { stringify } from "querystring";
import getStore from "../../store";

// const DOMAIN = "http://localhost:5000";

// export const server = "http://localhost:5000/api/"; //for dev
export const server = "/api/"; //for build

interface ApiResponse<T> {
  result: T;
  ok: boolean;
}

export interface ConnectionError {
  message: string;
}
{
  param1: "arg1";
}

export const rawGet = <R, P>(
  route: string,
  parameters: P,
  token?
): Promise<any> => {
  const esc = encodeURIComponent;
  const query = Object.keys(parameters)
    .map((k) => esc(k) + "=" + esc(parameters[k]))
    .join("&");

  const optionalQueryString = query !== "" ? "?" + query : "";
  const url = server + route + optionalQueryString;
  return safeFetch(url, "get").then((response) => handleResponse(response));
};

function safeFetch(route: string, method: string): Promise<Response> {
  // this fetch wrapper will catch connection errors and return a valid response

  //let headers = {
  //    Authorization: 'Bearer ' + token
  //};
  let params = {
    //headers,
    method: method ? method : undefined,
    body: undefined,
  };
  //if (body) {
  //    headers['Content-Type'] = 'application/json';
  //    params.body = JSON.stringify(body);
  //}

  return fetch(route, params).then(
    (response) => response,
    () => new Response("", { status: 599, statusText: "Connection Error" })
  );
}

export function handleResponse<T>(response) {
  if (!response.ok) {
    return Promise.reject(handleErrors(response));
  }
  switch (response.headers.get("content-type")) {
    case "application/json":
      return response.json().then(
        (r: ApiResponse<T>) => r,
        () => Promise.reject({ message: "invalid json" })
      );
    case "application/pdf":
      return response.blob();
  }
}

function handleErrors(response: Response) {
  const store = getStore();
  let message = response.statusText;
  if (response.status === 401) {
    //store.dispatch(logoutUser());
  }
  if (response.headers.get("content-type") === "application/json") {
    return response.json().then(
      (r: ApiResponse<{ internal_status_code; internal_message }>) => r,
      () => Promise.reject({ message: "invalid json" })
    );
  }
  return { message };
}

export const getRoute = (route: string, parameters: any) => {
  const promise = rawGet<string, any>(route, parameters);
  return { type: route, promise: promise, meta: { parameters: parameters } };
};
