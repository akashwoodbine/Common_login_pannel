// // import React, { useMemo } from 'react';
// // import { Captcha } from './Captcha';
// // import { Link } from 'react-router-dom';
// // import { LoginType } from '../types';

// // interface ReusableFormProps {
// //   title: string;
// //   themeColor?: string;

// //   // Login fields
// //   username?: string;
// //   password?: string;
// //   rememberMe?: boolean;
// //   isCaptchaValid?: boolean;
// //   error?: string;
// //   loginType?: LoginType;
// //   loginOptions?: { id: string; name: string }[];
// //   districtName?: string;
// //   blockName?: string;
// //   formKey?: number;

// //   // Controls which fields to show
// //   showLoginTypeSelect?: boolean;
// //   showCredentials?: boolean;

// //   onUsernameChange?: (v: string) => void;
// //   onPasswordChange?: (v: string) => void;
// //   onRememberChange?: (v: boolean) => void;
// //   onCaptchaChange?: (v: boolean) => void;
// //   onCaptchaRefresh?: () => void;
// //   onLoginTypeChange?: (v: LoginType) => void;
// //   onSubmit: (e?: React.FormEvent) => void;
// // }

// // export const ReusableForm: React.FC<ReusableFormProps> = ({
// //   title,
// //   themeColor = '#6770d2',
// //   username = '',
// //   password = '',
// //   rememberMe = false,
// //   isCaptchaValid = true,
// //   error = '',
// //   loginType = LoginType.BMMU,
// //   loginOptions = [],
// //   districtName,
// //   blockName,
// //   formKey = Date.now(),
// //   showLoginTypeSelect = false,
// //   showCredentials = false,
// //   onUsernameChange,
// //   onPasswordChange,
// //   onRememberChange,
// //   onCaptchaChange,
// //   onCaptchaRefresh,
// //   onLoginTypeChange,
// //   onSubmit,
// // }) => {

// //   const hoverColor = useMemo(() => {
// //     const hex = themeColor.replace('#','');
// //     const num = parseInt(hex,16);
// //     const r = Math.max(((num >> 16) & 0xFF) - 20, 0);
// //     const g = Math.max(((num >> 8) & 0xFF) - 20, 0);
// //     const b = Math.max((num & 0xFF) - 20, 0);
// //     return `rgb(${r},${g},${b})`;
// //   }, [themeColor]);

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-white p-4">
// //       <div
// //         className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border"
// //         style={{ borderColor: themeColor, boxShadow: `0 4px 12px ${themeColor}40` }}
// //       >
// //         <div className="text-center">
// //           <h1 className="text-3xl font-extrabold" style={{ color: themeColor }}>
// //             {title}
// //           </h1>
// //         </div>

// //         <form key={formKey} onSubmit={onSubmit} className="space-y-4">

// //           {showLoginTypeSelect && loginOptions && (
// //             <div>
// //               <label htmlFor="login-type" className="block text-sm font-medium text-gray-700">
// //                 Login As
// //               </label>
// //               <select
// //                 id="login-type"
// //                 value={loginType}
// //                 onChange={(e) => onLoginTypeChange && onLoginTypeChange(e.target.value as LoginType)}
// //                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md sm:text-sm"
// //                 style={{ borderColor: themeColor }}
// //               >
// //                 {loginOptions.map(opt => (
// //                   <option key={opt.id} value={opt.id}>
// //                     {opt.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           )}

// //           {showCredentials && (
// //             <>
// //               {/* Username */}
// //               <div>
// //                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
// //                   Username
// //                 </label>
// //                 <input
// //                   id="username"
// //                   type="text"
// //                   value={username}
// //                   onChange={(e) => onUsernameChange && onUsernameChange(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
// //                   style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
// //                   required
// //                   autoFocus
// //                 />
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                   Password
// //                 </label>
// //                 <input
// //                   id="password"
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => onPasswordChange && onPasswordChange(e.target.value)}
// //                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none"
// //                   style={{ borderColor: themeColor, boxShadow: `0 0 0 1px ${themeColor}20` }}
// //                   required
// //                 />
// //               </div>

// //               {/* Captcha */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Verification
// //                 </label>
// //                 <Captcha onChange={onCaptchaChange} onRefresh={onCaptchaRefresh} />
// //               </div>

// //               {/* Remember me / Forgot password */}
// //               <div className="flex items-center justify-between text-sm">
// //                 <div className="flex items-center">
// //                   <input
// //                     id="remember-me"
// //                     type="checkbox"
// //                     checked={rememberMe}
// //                     onChange={(e) => onRememberChange && onRememberChange(e.target.checked)}
// //                     className="h-4 w-4 rounded focus:ring-2"
// //                     style={{ accentColor: themeColor }}
// //                   />
// //                   <label htmlFor="remember-me" className="ml-2 block text-gray-900">
// //                     Remember me
// //                   </label>
// //                 </div>
// //                 <Link
// //                   to="/forgot-password"
// //                   style={{ color: themeColor }}
// //                   className="font-medium hover:underline"
// //                 >
// //                   Forgot your password?
// //                 </Link>
// //               </div>
// //             </>
// //           )}

// //           {error && <p className="text-sm text-red-500 text-center">{error}</p>}

// //           <button
// //             type="submit"
// //             className="w-full flex justify-center py-3 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
// //             style={{
// //               backgroundColor: themeColor,
// //               color: 'white',
// //               borderColor: themeColor,
// //               boxShadow: `0 3px 8px ${themeColor}60`,
// //               opacity: isCaptchaValid ? 1 : 0.6,
// //             }}
// //             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
// //             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = themeColor)}
// //           >
// //             {showCredentials ? 'Login' : 'Proceed'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useMemo } from 'react';
// import { Captcha } from './Captcha';
// import { Link } from 'react-router-dom';
// import { LoginType } from '../types';

// interface ReusableFormProps {
//   title: string;
//   themeColor?: string;

//   // Login fields
//   username?: string;
//   password?: string;
//   rememberMe?: boolean;
//   isCaptchaValid?: boolean;
//   error?: string;
//   loginType?: LoginType;
//   loginOptions?: { id: string; name: string }[];
//   districtName?: string;
//   blockName?: string;
//   formKey?: number;

//   // Controls which fields to show
//   showLoginTypeSelect?: boolean;
//   showCredentials?: boolean;

//   onUsernameChange?: (v: string) => void;
//   onPasswordChange?: (v: string) => void;
//   onRememberChange?: (v: boolean) => void;
//   onCaptchaChange?: (v: boolean) => void;
//   onCaptchaRefresh?: () => void;
//   onLoginTypeChange?: (v: LoginType) => void;
//   onSubmit: (e?: React.FormEvent) => void;
// }

// export const ReusableForm: React.FC<ReusableFormProps> = ({
//   title,
//   themeColor = '#6770d2',
//   username = '',
//   password = '',
//   rememberMe = false,
//   isCaptchaValid = true,
//   error = '',
//   loginType = LoginType.BMMU,
//   loginOptions = [],
//   districtName,
//   blockName,
//   formKey = Date.now(),
//   showLoginTypeSelect = false,
//   showCredentials = false,
//   onUsernameChange,
//   onPasswordChange,
//   onRememberChange,
//   onCaptchaChange,
//   onCaptchaRefresh,
//   onLoginTypeChange,
//   onSubmit,
// }) => {
//   const hoverColor = useMemo(() => {
//     const hex = themeColor.replace('#', '');
//     const num = parseInt(hex, 16);
//     const r = Math.max(((num >> 16) & 0xff) - 20, 0);
//     const g = Math.max(((num >> 8) & 0xff) - 20, 0);
//     const b = Math.max((num & 0xff) - 20, 0);
//     return `rgb(${r},${g},${b})`;
//   }, [themeColor]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div
//         className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border"
//         style={{ borderColor: themeColor, boxShadow: `0 4px 12px ${themeColor}40` }}
//       >
//         <div className="text-center">
//           <h1 className="text-3xl font-extrabold" style={{ color: themeColor }}>
//             {title}
//           </h1>
//         </div>

//         <form key={formKey} onSubmit={onSubmit} className="space-y-4">

//           {/* Dropdown: Login Type */}
//           {showLoginTypeSelect && loginOptions && (
//             <div>
//               <label
//                 htmlFor="login-type"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Login As
//               </label>
//               <div className="relative">
//                 <select
//                   id="login-type"
//                   value={loginType}
//                   onChange={(e) =>
//                     onLoginTypeChange && onLoginTypeChange(e.target.value as LoginType)
//                   }
//                   className="appearance-none block w-full pl-3 pr-10 py-2.5 text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all sm:text-sm bg-white text-gray-800"
//                   style={{
//                     borderColor: themeColor,
//                     boxShadow: `0 0 0 1px ${themeColor}20`,
//                   }}
//                 >
//                   {loginOptions.map((opt) => (
//                     <option
//                       key={opt.id}
//                       value={opt.id}
//                       className="text-gray-800 bg-white hover:bg-gray-100"
//                       style={{
//                         backgroundColor: 'white',
//                         color: '#333',
//                       }}
//                     >
//                       {opt.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Custom dropdown arrow */}
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                   <svg
//                     className="h-5 w-5 text-gray-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 12a.75.75 0 01-.53-.22l-4.25-4.25a.75.75 0 011.06-1.06L10 10.19l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25A.75.75 0 0110 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Username and Password fields */}
//           {showCredentials && (
//             <>
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   type="text"
//                   value={username}
//                   onChange={(e) =>
//                     onUsernameChange && onUsernameChange(e.target.value)
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition"
//                   style={{
//                     borderColor: themeColor,
//                     boxShadow: `0 0 0 1px ${themeColor}20`,
//                   }}
//                   required
//                   autoFocus
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) =>
//                     onPasswordChange && onPasswordChange(e.target.value)
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition"
//                   style={{
//                     borderColor: themeColor,
//                     boxShadow: `0 0 0 1px ${themeColor}20`,
//                   }}
//                   required
//                 />
//               </div>

//               {/* Captcha */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Verification
//                 </label>
//                 <Captcha
//                   onChange={onCaptchaChange}
//                   onRefresh={onCaptchaRefresh}
//                 />
//               </div>

//               {/* Remember Me / Forgot Password */}
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) =>
//                       onRememberChange && onRememberChange(e.target.checked)
//                     }
//                     className="h-4 w-4 rounded focus:ring-2"
//                     style={{ accentColor: themeColor }}
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-2 block text-gray-900"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <Link
//                   to="/forgot-password"
//                   style={{ color: themeColor }}
//                   className="font-medium hover:underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//             </>
//           )}

//           {error && <p className="text-sm text-red-500 text-center">{error}</p>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full flex justify-center py-3 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
//             style={{
//               backgroundColor: themeColor,
//               color: 'white',
//               borderColor: themeColor,
//               boxShadow: `0 3px 8px ${themeColor}60`,
//               opacity: isCaptchaValid ? 1 : 0.6,
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = hoverColor)
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = themeColor)
//             }
//           >
//             {showCredentials ? 'Login' : 'Proceed'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useMemo, Fragment } from 'react';
import { Captcha } from './Captcha';
import { Link } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { LoginType } from '../types';

interface ReusableFormProps {
  title: string;
  themeColor?: string;

  username?: string;
  password?: string;
  rememberMe?: boolean;
  isCaptchaValid?: boolean;
  error?: string;
  loginType?: LoginType;
  loginOptions?: { id: string; name: string }[];
  districtName?: string;
  blockName?: string;
  formKey?: number;

  showLoginTypeSelect?: boolean;
  showCredentials?: boolean;

  onUsernameChange?: (v: string) => void;
  onPasswordChange?: (v: string) => void;
  onRememberChange?: (v: boolean) => void;
  onCaptchaChange?: (v: boolean) => void;
  onCaptchaRefresh?: () => void;
  onLoginTypeChange?: (v: LoginType) => void;
  onSubmit: (e?: React.FormEvent) => void;
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
  title,
  themeColor = '#6770d2',
  username = '',
  password = '',
  rememberMe = false,
  isCaptchaValid = true,
  error = '',
  loginType = LoginType.BMMU,
  loginOptions = [],
  formKey = Date.now(),
  showLoginTypeSelect = false,
  showCredentials = false,
  onUsernameChange,
  onPasswordChange,
  onRememberChange,
  onCaptchaChange,
  onCaptchaRefresh,
  onLoginTypeChange,
  onSubmit,
}) => {
  const hoverColor = useMemo(() => {
    const hex = themeColor.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.max(((num >> 16) & 0xff) - 20, 0);
    const g = Math.max(((num >> 8) & 0xff) - 20, 0);
    const b = Math.max((num & 0xff) - 20, 0);
    return `rgb(${r},${g},${b})`;
  }, [themeColor]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border"
        style={{
          borderColor: themeColor,
          boxShadow: `0 4px 12px ${themeColor}40`,
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold" style={{ color: themeColor }}>
            {title}
          </h1>
        </div>

        <form key={formKey} onSubmit={onSubmit} className="space-y-4">

          {/* Custom Dropdown using Headless UI */}
          {showLoginTypeSelect && loginOptions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Login As
              </label>

              <Listbox
                value={loginType}
                onChange={(val) =>
                  onLoginTypeChange && onLoginTypeChange(val as LoginType)
                }
              >
                <div className="relative mt-1">
                  <Listbox.Button
                    className="relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    style={{ borderColor: themeColor }}
                  >
                    <span className="block truncate">{loginType}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                      {loginOptions.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          value={option.id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-indigo-100 text-indigo-900'
                                : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {option.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}

          {/* Username / Password Section */}
          {showCredentials && (
            <>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    onUsernameChange && onUsernameChange(e.target.value)
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    borderColor: themeColor,
                  }}
                  required
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    onPasswordChange && onPasswordChange(e.target.value)
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    borderColor: themeColor,
                  }}
                  required
                />
              </div>

              {/* Captcha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification
                </label>
                <Captcha
                  onChange={onCaptchaChange}
                  onRefresh={onCaptchaRefresh}
                />
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      onRememberChange && onRememberChange(e.target.checked)
                    }
                    className="h-4 w-4 rounded focus:ring-2"
                    style={{ accentColor: themeColor }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  style={{ color: themeColor }}
                  className="font-medium hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
            style={{
              backgroundColor: themeColor,
              color: 'white',
              borderColor: themeColor,
              boxShadow: `0 3px 8px ${themeColor}60`,
              opacity: isCaptchaValid ? 1 : 0.6,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = themeColor)
            }
          >
            {showCredentials ? 'Login' : 'Proceed'}
          </button>
        </form>
      </div>
    </div>
  );
};
