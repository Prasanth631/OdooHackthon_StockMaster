const authService = {
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 1,
              name: 'Demo User',
              email: email,
              role: 'inventory_manager'
            },
            token: 'demo-token-12345'
          }
        });
      }, 500);
    });
  },

  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 1,
              name: userData.name,
              email: userData.email,
              role: 'inventory_manager'
            },
            token: 'demo-token-12345'
          }
        });
      }, 500);
    });
  },

  forgotPassword: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'OTP sent to email' } });
      }, 500);
    });
  },

  verifyOTP: async (email, otp) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { verified: true } });
      }, 500);
    });
  },

  resetPassword: async (email, otp, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Password reset successful' } });
      }, 500);
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Password changed successfully' } });
      }, 500);
    });
  }
};

export default authService;
