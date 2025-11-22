import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
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
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(formData.email);
      setSuccess('OTP sent to your email');
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyOTP(formData.email, formData.otp);
      setStep(3);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(formData.email, formData.otp, formData.newPassword);
      setSuccess('Password reset successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">StockMaster</h1>
          <p className="text-gray-500 mt-2">Reset your password</p>
        </div>

        {error && <Alert variant="error" message={error} className="mb-4" />}
        {success && <Alert variant="success" message={success} className="mb-4" />}

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <Input
              label="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter the OTP sent to your email"
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Verify OTP
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
            <Button type="submit" className="w-full" loading={loading}>
              Reset Password
            </Button>
          </form>
        )}

        <p className="text-center text-gray-600 mt-6">
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;