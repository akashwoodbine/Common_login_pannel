import React, { useState, useEffect, useCallback } from 'react';

interface CaptchaProps {
  onChange: (isValid: boolean) => void;
  onRefresh: () => void;
}

const generateCaptchaText = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

export const Captcha: React.FC<CaptchaProps> = ({ onChange, onRefresh }) => {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');

  const refreshCaptcha = useCallback(() => {
    const newCaptcha = generateCaptchaText();
    setCaptcha(newCaptcha);
    setUserInput('');
    onChange(false);
    onRefresh();
  }, [onChange, onRefresh]);

  useEffect(() => {
    refreshCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange(userInput.toLowerCase() === captcha.toLowerCase() && userInput.length > 0);
  }, [userInput, captcha, onChange]);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-full text-center bg-gray-200 rounded-md p-2 select-none">
          <span className="text-xl font-bold tracking-widest text-gray-800" style={{ fontFamily: 'monospace', textDecoration: 'line-through' }}>
            {captcha}
          </span>
        </div>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4l-5 5M4 20l5-5" />
          </svg>
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter Captcha"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
  );
};