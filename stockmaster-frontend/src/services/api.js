// src/services/api.js
const API_BASE_URL = 'http://localhost:8083/api';

const api = {
  async request(method, url, data = null) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const options = {
      method,
      headers
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, options);
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }
      
      // Handle other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        return { data: result };
      }
      
      return { data: null };
    } catch (error) {
      console.error('API Error:', error);
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
  }
};

export default api;