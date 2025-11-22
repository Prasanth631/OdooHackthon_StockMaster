import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          email: response.data.email,
          name: response.data.fullName,
          role: response.data.role
        }));
      }
      
      return {
        data: {
          token: response.data.token,
          user: {
            id: response.data.userId,
            email: response.data.email,
            name: response.data.fullName,
            role: response.data.role
          }
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
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
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          email: response.data.email,
          name: response.data.fullName,
          role: response.data.role
        }));
      }
      
      return {
        data: {
          token: response.data.token,
          user: {
            id: response.data.userId,
            email: response.data.email,
            name: response.data.fullName,
            role: response.data.role
          }
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  },

  forgotPassword: async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      return { data: { message: 'OTP sent to your email' } };
    } catch (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    try {
      await api.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      return { data: { message: 'Password reset successful' } };
    } catch (error) {
      throw new Error(error.message || 'Password reset failed');
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('User not found');
      }
      
      await api.post('/auth/change-password', {
        userId: user.id,
        currentPassword,
        newPassword
      });
      
      return { data: { message: 'Password changed successfully' } };
    } catch (error) {
      throw new Error(error.message || 'Failed to change password');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;