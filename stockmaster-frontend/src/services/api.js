const API_BASE_URL = 'http://localhost:8083/api';

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  if (!response.ok) {
    if (isJson) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'Request failed');
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }
  }
  
  if (isJson) {
    return await response.json();
  } else {
    return await response.text();
  }
};

const api = {
  async request(method, url, data = null) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options = {
      method,
      headers,
      mode: 'cors'
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, options);
      const result = await handleResponse(response);
      return { data: result };
    } catch (error) {
      console.error(`API Error [${method} ${url}]:`, error.message);
      throw error;
    }
  },
  
  get(url) {
    return this.request('GET', url);
  },
  
  post(url, data) {
    return this.request('POST', url, data);
  },
  
  put(url, data) {
    return this.request('PUT', url, data);
  },
  
  delete(url) {
    return this.request('DELETE', url);
  },

  patch(url, data) {
    return this.request('PATCH', url, data);
  }
};

export default api;