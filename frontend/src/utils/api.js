const API_URL = "http://localhost:3000/api";

export const fetchApi = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (response.status === 204) {
    return {};
  }

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export const getToken = () => {
  return localStorage.getItem("token");
};
