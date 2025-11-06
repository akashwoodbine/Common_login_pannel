import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginType } from '../types';

export const HomePage: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.BMMU);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (loginType === LoginType.DMMU) {
      navigate('/select-district');
    } else {
      const path = loginType.toLowerCase().replace(/\s+/g, '-');
      navigate(`/login/${path}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 border">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome</h1>
          <p className="mt-2 text-sm text-gray-600">Please select your login portal</p>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="login-type" className="block text-sm font-medium text-gray-700">
              Login As
            </label>
            <select
              id="login-type"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value as LoginType)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {Object.values(LoginType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleProceed}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};