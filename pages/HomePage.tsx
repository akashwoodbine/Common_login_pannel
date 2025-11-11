// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LoginType } from '../types';
// import { ReusableForm } from '../components/Form'

// export const HomePage: React.FC = () => {
//   const [loginType, setLoginType] = useState<LoginType>(LoginType.BMMU);
//   const navigate = useNavigate();

//   const handleProceed = () => {
//     if (loginType === LoginType.DMMU) {
//       navigate('/select-district');
//     } else {
//       const path = loginType.toLowerCase().replace(/\s+/g, '-');
//       navigate(`/login/${path}`);
//     }
//   };

//   return (
//     <ReusableForm
//       title="Welcome"
//       themeColor="#6770d2"
//       loginType={loginType}
//       loginOptions={Object.values(LoginType).map(t => ({ id: t, name: t }))}
//       showLoginTypeSelect={true}
//       showCredentials={false}
//       onLoginTypeChange={setLoginType}
//       onSubmit={handleProceed}
//     />
//   );
// };


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginType } from '../types';
import { ReusableForm } from '../components/Form';
import HeaderLangDate from '@/components/HeaderLangDate';
import { LogoListScreen } from '@/components/SubHeader';
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
    <><HeaderLangDate />
    <LogoListScreen/>
    <ReusableForm
      title="Welcome"
      themeColor="#6770d2"
      loginType={loginType}
      loginOptions={Object.values(LoginType).map((t) => ({ id: t, name: t }))}
      showLoginTypeSelect={true}
      showCredentials={false}
      onLoginTypeChange={setLoginType}
      onSubmit={handleProceed} /></>
  );
};
