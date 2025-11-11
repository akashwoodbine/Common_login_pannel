// import React, { useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DMMU_DATA, DISTRICT_BLOCK_MAP } from '../constants';

// export const DistrictSelectionPage: React.FC = () => {
//   const [selectedDistrictId, setSelectedDistrictId] = useState('');
//   const [selectedBlockId, setSelectedBlockId] = useState('');
//   const navigate = useNavigate();

//   const blocksForSelectedDistrict = useMemo(() => {
//     if (!selectedDistrictId) return [];
//     return DISTRICT_BLOCK_MAP[selectedDistrictId]?.blocks || [];
//   }, [selectedDistrictId]);

//   const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDistrictId(e.target.value);
//     setSelectedBlockId(''); // Reset block selection when district changes
//   };

//   const handleProceed = () => {
//     if (!selectedDistrictId || !selectedBlockId) return;

//     const district = DISTRICT_BLOCK_MAP[selectedDistrictId];
//     const block = district.blocks.find(b => b.id === selectedBlockId);

//     if (district && block) {
//       navigate('/login/dmmu', {
//         state: {
//           districtName: district.name,
//           blockName: block.name,
//           blockId: block.id,
//         },
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-4">
//       <div
//         className="w-full max-w-md bg-white rounded-2xl p-8 space-y-8 border"
//         style={{ borderColor: '#6770d2', boxShadow: '0 4px 12px #6770d240' }}
//       >
//         <div className="text-center">
//           <h1 className="text-3xl font-extrabold text-gray-900">DMMU Login</h1>
//           <p className="mt-2 text-sm text-gray-600">Select your district and block to continue</p>
//         </div>
//         <div className="space-y-6">
//           <div>
//             <label htmlFor="district-select" className="block text-sm font-medium text-gray-700">
//               District Name
//             </label>
//             <select
//               id="district-select"
//               value={selectedDistrictId}
//               onChange={handleDistrictChange}
//               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md  focus:ring-2 focus:ring-[#6770d2] focus:border-[#6770d2] sm:text-sm"
//             >
//               <option value="" disabled>
//                 -- Select a District --
//               </option>
//               {DMMU_DATA.map((district) => (
//                 <option key={district.id} value={district.id}>
//                   {district.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedDistrictId && (
//             <div>
//               <label htmlFor="block-select" className="block text-sm font-medium text-gray-700">
//                 Block Name
//               </label>
//               <select
//                 id="block-select"
//                 value={selectedBlockId}
//                 onChange={(e) => setSelectedBlockId(e.target.value)}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6770d2] focus:border-[#6770d2] sm:text-sm"
//               >
//                 <option value="" disabled>
//                   -- Select a Block --
//                 </option>
//                 {blocksForSelectedDistrict.map((block) => (
//                   <option key={block.id} value={block.id}>
//                     {block.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <button
//             onClick={handleProceed}
//             disabled={!selectedDistrictId || !selectedBlockId}
//             className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-[#6770d2] hover:bg-[#5561b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6770d2] disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
//           >
//             Proceed to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useMemo, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { DMMU_DATA, DISTRICT_BLOCK_MAP } from '../constants';
import HeaderLangDate from '@/components/HeaderLangDate';

export const DistrictSelectionPage: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedBlockId, setSelectedBlockId] = useState('');
  const navigate = useNavigate();

  const themeColor = '#6770d2';

  const blocksForSelectedDistrict = useMemo(() => {
    if (!selectedDistrictId) return [];
    return DISTRICT_BLOCK_MAP[selectedDistrictId]?.blocks || [];
  }, [selectedDistrictId]);

  const selectedDistrict = selectedDistrictId
    ? DMMU_DATA.find((d) => d.id === selectedDistrictId)
    : null;

  const selectedBlock = selectedBlockId
    ? blocksForSelectedDistrict.find((b) => b.id === selectedBlockId)
    : null;

  const handleProceed = () => {
    if (!selectedDistrict || !selectedBlock) return;

    navigate('/login/dmmu', {
      state: {
        districtName: selectedDistrict.name,
        blockName: selectedBlock.name,
        blockId: selectedBlock.id,
      },
    });
  };

  return (
    <><HeaderLangDate /><div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl p-8 space-y-8 border shadow-lg"
        style={{ borderColor: themeColor, boxShadow: `0 4px 12px ${themeColor}40` }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold" style={{ color: '#6770d2' }}>DMMU Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Select your district and block to continue
          </p>
        </div>

        <div className="space-y-6">
          {/* District Dropdown */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
      District Name
    </label> */}

            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: '#6770d2' }}
            >
              Block Name
            </label>

            <Listbox
              value={selectedDistrictId}
              onChange={(value) => {
                setSelectedDistrictId(value);
                setSelectedBlockId('');
              } }
            >
              <div className="relative mt-1">
                <Listbox.Button
                  className="relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6770d2] sm:text-sm"
                  style={{ borderColor: themeColor }}
                >
                  <span className="block truncate">
                    {selectedDistrict?.name || '-- Select a District --'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {DMMU_DATA.map((district) => (
                      <Listbox.Option
                        key={district.id}
                        value={district.id}
                        className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'text-gray-900'}`}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                            >
                              {district.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Block Dropdown */}
          {selectedDistrictId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block Name
              </label>
              <Listbox
                value={selectedBlockId}
                onChange={(value) => setSelectedBlockId(value)}
              >
                <div className="relative mt-1">
                  <Listbox.Button
                    className="relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6770d2] sm:text-sm"
                    style={{ borderColor: themeColor }}
                  >
                    <span className="block truncate">
                      {selectedBlock?.name || '-- Select a Block --'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {blocksForSelectedDistrict.map((block) => (
                        <Listbox.Option
                          key={block.id}
                          value={block.id}
                          className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active
                              ? 'bg-indigo-100 text-indigo-900'
                              : 'text-gray-900'}`}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                              >
                                {block.name}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              )}
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

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!selectedDistrictId || !selectedBlockId}
            className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-[#6770d2] hover:bg-[#5561b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6770d2] disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div></>
  );
};
