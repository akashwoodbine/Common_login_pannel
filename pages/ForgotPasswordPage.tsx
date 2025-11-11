import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 👉 Change this if your backend runs on a different port or host
  const API_URL = 'http://localhost:5000';

  // === STEP 1: Send OTP ===
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(`${API_URL}/send-otp`, { email });
      setMessage(res.data.message || 'OTP sent successfully!');
      setStep(2);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // === STEP 2: Verify OTP & Reset Password ===
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
        newPassword,
      });

      alert(res.data.message || 'Password reset successful!');
      navigate('/login/bmmu');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Forgot Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1
              ? 'Enter your registered email to reset your password.'
              : 'Enter OTP and your new password.'}
          </p>
        </div>

        {message && (
          <p
            className={`text-sm text-center ${
              message.toLowerCase().includes('error') || message.toLowerCase().includes('invalid')
                ? 'text-red-600'
                : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white 
                         ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Sending OTP...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white 
                         ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Verifying...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="text-sm text-center">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
