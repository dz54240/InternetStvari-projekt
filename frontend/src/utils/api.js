const API_URLS = {
  primary: 'http://localhost:3000/api',
  fallback: 'http://192.168.119.59:3000/api'
};

const fetchWithFallback = async (endpoint, method, body, headers) => {
  try {
    const response = await fetch(`${API_URLS.primary}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error('Primary API request failed');
    }

    return response;
  } catch (error) {
    console.log('Primary API failed, trying fallback...');
    
    const fallbackResponse = await fetch(`${API_URLS.fallback}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!fallbackResponse.ok) {
      throw new Error('Both primary and fallback API requests failed');
    }

    return fallbackResponse;
  }
};

export const fetchApi = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const response = await fetchWithFallback(endpoint, method, body, headers);
  
  if (response.status === 204) {
    return { status: 204 };
  }
  
  try {
    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    return { status: response.status };
  }
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
