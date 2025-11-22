const API_BASE_URL = 'http://localhost:5000/api';

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
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, options);
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return { data: result };
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