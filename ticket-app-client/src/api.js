import axios from "axios";

const URL_PROTOCOL = "http";
const URL_DOMAIN = "127.0.0.1";
const URL_PORT = "8080";
const URL = `${URL_PROTOCOL}://${URL_DOMAIN}:${URL_PORT}`;

const isHttpsStatusOK = status => status >= 200 && status < 300;

export async function api(endpoint, { body, method } = {}) {
  const token = localStorage.getItem("token");
  if (method === "GET" && !token) return null;
  const headers = { "Content-Type": "application/json" };

  const config = {
    method,
    url: `${URL}${endpoint}`,
    ...(body && { data: body }),
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
  let data;
  try {
    const response = await axios(config);

    data = response.data;
    if (isHttpsStatusOK(response.status)) {
      return data;
    }

    throw new Error(response.statusText);
  } catch (error) {
    const { response } = error;

    let errorToReturn = response
      ? Promise.reject(response.data.error ? response.data.error : data)
      : Promise.reject(error.message ? error.message : data);

    return errorToReturn;
  }
}

api.get = function ({ endpoint }) {
  return api(endpoint, { method: "GET" });
};

api.post = function ({ endpoint, body }) {
  return api(endpoint, { method: "POST", body });
};

api.put = function ({ endpoint, body }) {
  return api(endpoint, { method: "PUT", body });
};

api.delete = function ({ endpoint }) {
  return api(endpoint, { method: "DELETE" });
};
