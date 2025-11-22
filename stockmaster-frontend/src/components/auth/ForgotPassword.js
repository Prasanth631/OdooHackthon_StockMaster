// src/components/auth/ForgotPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: OTP & new password
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword(formData.email);
      setSuccess('OTP sent successfully! Please check your email.');
      setStep(2);
    } catch (err) {
      console.error('Forgot password error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data || 
                          err.message || 
                          'Failed to send OTP. Please check your email and try again.';
      setError(typeof errorMessage === 'string' ? errorMessage : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!formData.newPassword || formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.resetPassword(
        formData.email, 
        formData.otp, 
        formData.newPassword
      );
      
      setSuccess('Password reset successful! Redirecting to login...');
      
      // Clear form data
      setFormData({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Reset password error:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data || 
                          err.message || 
                          'Failed to reset password. Please check your OTP and try again.';
      setError(typeof errorMessage === 'string' ? errorMessage : 'Invalid OTP or password reset failed');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword(formData.email);
      setSuccess('OTP resent successfully! Please check your email.');
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Go back to email step
  const handleBackToEmail = () => {
    setStep(1);
    setFormData({
      ...formData,
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">StockMaster</h1>
          <p className="text-gray-500 mt-2">
            {step === 1 ? 'Reset your password' : 'Enter OTP and new password'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert 
            variant="error" 
            message={error} 
            onClose={() => setError('')}
            className="mb-4" 
          />
        )}
        {success && (
          <Alert 
            variant="success" 
            message={success} 
            onClose={() => setSuccess('')}
            className="mb-4" 
          />
        )}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="mb-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your registered email"
                required
                autoFocus
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll send a 6-digit OTP to this email address
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              loading={loading}
              disabled={loading || !formData.email}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        )}

        {/* Step 2: OTP and Password Reset */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <Input
                label="Enter OTP"
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                autoFocus
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  OTP sent to: {formData.email}
                </p>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </div>

            <div className="mb-6">
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full" 
                loading={loading}
                disabled={loading || !formData.otp || !formData.newPassword || !formData.confirmPassword}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </Button>

              <Button 
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleBackToEmail}
                disabled={loading}
              >
                Use Different Email
              </Button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link 
              to="/login" 
              className="text-blue-600 hover:underline font-medium"
            >
              Back to Login
            </Link>
          </p>
        </div>

        {/* Help Text */}
        {step === 2 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> OTP is valid for 10 minutes. If you don't receive it, 
              please check your spam folder or request a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;