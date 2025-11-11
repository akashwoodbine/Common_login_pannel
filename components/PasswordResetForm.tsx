import React from 'react';
import { Link } from 'react-router-dom';

interface PasswordResetFormProps {
  step: 1 | 2;
  themeColor?: string;
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
  message?: string;
  onEmailChange?: (v: string) => void;
  onOTPChange?: (v: string) => void;
  onNewPasswordChange?: (v: string) => void;
  onConfirmPasswordChange?: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DEFAULT_THEME_COLOR = '#6770d2';

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  step,
  themeColor = DEFAULT_THEME_COLOR,
  email = '',
  otp = '',
  newPassword = '',
  confirmPassword = '',
  message,
  onEmailChange,
  onOTPChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => (
  <div
    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border mx-auto"
    style={{ borderColor: themeColor, boxShadow: `0 4px 12px ${themeColor}40` }}
  >
    <div className="text-center">
      <h1 className="text-3xl font-extrabold" style={{ color: themeColor }}>
        Forgot Password
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {step === 1
          ? 'Enter your registered email to reset your password.'
          : 'Enter OTP and your new password.'}
      </p>
    </div>
    {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    <form onSubmit={onSubmit} className="space-y-4">
      {step === 1 ? (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange && onEmailChange(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
            style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
            required
          />
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => onOTPChange && onOTPChange(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
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
              onChange={(e) => onNewPasswordChange && onNewPasswordChange(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
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
              onChange={(e) => onConfirmPasswordChange && onConfirmPasswordChange(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
              style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
              required
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white"
        style={{
          backgroundColor: themeColor,
          borderColor: themeColor,
          boxShadow: `0 3px 8px ${themeColor}60`
        }}
      >
        {step === 1 ? 'Send Reset Link' : 'Reset Password'}
      </button>
    </form>
    <div className="text-sm text-center">
      <Link to="/" className="font-medium" style={{ color: themeColor }}>
        Back to Home
      </Link>
    </div>
  </div>
);
