// src/components/auth/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call backend API
      const response = await authService.login(formData.email, formData.password);
      
      // Backend returns: { userId, email, fullName, role, token }
      const { token, ...userData } = response.data;

      // Update context with user data and token
      login(userData, token);

      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedEmail');
      }

      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different error types
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const email = localStorage.getItem('rememberedEmail');
    
    if (remembered === 'true' && email) {
      setFormData(prev => ({ ...prev, email }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">StockMaster</h1>
          <p className="text-gray-500 mt-2">Inventory Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Welcome back
          </h2>

          {/* Error Alert */}
          {error && (
            <Alert 
              variant="error" 
              message={error} 
              onClose={() => setError('')}
              className="mb-4" 
            />
          )}

          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoFocus
            autoComplete="email"
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 
                         focus:ring-blue-500 focus:ring-2 mr-2" 
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
            disabled={loading || !formData.email || !formData.password}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;