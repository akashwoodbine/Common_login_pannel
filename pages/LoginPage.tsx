
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { LoginType, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { SMMU_DATA, BMMU_DATA } from '../constants';
import { Captcha } from '../components/Captcha';

const loginTypeMap: { [key: string]: LoginType } = {
  'bmmu': LoginType.BMMU,
  'dmmu': LoginType.DMMU,
  'smmu': LoginType.SMMU,
  'state-it-manager': LoginType.ADMIN,
};

export const LoginPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const { blockId, blockName, districtName } = location.state || {};

  const loginType = useMemo(() => type ? loginTypeMap[type] : null, [type]);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isCaptchaValid, setCaptchaValid] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const loginOptions = useMemo(() => {
    switch (loginType) {
      case LoginType.SMMU: return SMMU_DATA;
      case LoginType.BMMU: return BMMU_DATA;
      default: return [];
    }
  }, [loginType]);

  useEffect(() => {
    if (!loginType) {
      navigate('/');
      return;
    }

    if (loginType === LoginType.DMMU) {
      if (!blockId) {
        navigate('/select-district');
        return;
      }
      setUsername(blockId);
    } else if (loginOptions.length > 0) {
      setUsername(loginOptions[0].id);
    } else {
      setUsername('');
    }

    setError('');
    setPassword('');
    setFormKey(Date.now()); // Force re-render of Captcha
  }, [loginType, loginOptions, navigate, blockId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isCaptchaValid) {
      setError('Invalid Captcha. Please try again.');
      return;
    }

    if (loginType === LoginType.ADMIN && username.trim().length < 3) {
        setError('Username must be at least 3 characters long.');
        return;
    }
    
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    if (password !== '123456') {
      setError('Invalid username or password.');
      return;
    }
    
    let user: User | null = null;
    if (loginType === LoginType.ADMIN) {
        user = { id: username, type: LoginType.ADMIN, name: 'Admin' };
    } else if (loginType === LoginType.DMMU) {
        if (blockId && blockName && districtName) {
            user = {
                id: blockId,
                name: blockName,
                type: LoginType.DMMU,
                districtName: districtName
            };
        }
    } else {
        const selectedOption = loginOptions.find(opt => opt.id === username);
        if (selectedOption && loginType) {
            user = { ...selectedOption, type: loginType };
        }
    }

    if (user) {
        login(user, rememberMe);
    } else {
        setError('Invalid login details.');
    }
  };

  if (!loginType) {
    return null;
  }

  const title = `${loginType} Login`;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
        </div>
        <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            {loginType === LoginType.ADMIN ? (
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                autoFocus
              />
            ) : loginType === LoginType.DMMU ? (
                <div className="mt-1 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <p className="font-semibold text-gray-800">{districtName} / {blockName}</p>
                    <p className="text-sm text-gray-500 font-mono">{username}</p>
                </div>
            ) : (
              <select
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {loginOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name} ({opt.id})</option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification
            </label>
            <Captcha onChange={setCaptchaValid} onRefresh={() => setError('')} />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={!isCaptchaValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
