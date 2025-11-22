// src/services/authService.js
import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', {
        email: userData.email,
        password: userData.password,
        fullName: userData.name,
        role: userData.role || 'WAREHOUSE_STAFF'
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      // This endpoint might need to be added to your backend
      const response = await api.post('/auth/change-password', { 
        currentPassword, 
        newPassword 
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;