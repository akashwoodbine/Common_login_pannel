import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LoginType, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { SMMU_DATA, BMMU_DATA } from '../constants';
import { ReusableForm } from '../components/Form';
import HeaderLangDate from '@/components/HeaderLangDate';
import { LogoListScreen } from '@/components/SubHeader';

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
    setFormKey(Date.now());
  }, [loginType, loginOptions, navigate, blockId]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
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
            user = { id: blockId, name: blockName, type: LoginType.DMMU, districtName };
        }
    } else {
        const selectedOption = loginOptions.find(opt => opt.id === username);
        if (selectedOption && loginType) {
            user = { ...selectedOption, type: loginType };
        }
    }

    if (user) login(user, rememberMe);
    else setError('Invalid login details.');
  };

  if (!loginType) return null;

  return (
    <><HeaderLangDate />
    <LogoListScreen/><ReusableForm
      title={`${loginType} Login`}
      username={username}
      password={password}
      rememberMe={rememberMe}
      isCaptchaValid={isCaptchaValid}
      error={error}
      loginType={loginType}
      loginOptions={loginOptions}
      districtName={districtName}
      blockName={blockName}
      formKey={formKey}
      showCredentials={true} // show username/password/captcha
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onRememberChange={setRememberMe}
      onCaptchaChange={setCaptchaValid}
      onCaptchaRefresh={() => setError('')}
      onSubmit={handleSubmit} /></>
  );
};
