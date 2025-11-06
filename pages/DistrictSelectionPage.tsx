import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DMMU_DATA, DISTRICT_BLOCK_MAP } from '../constants';

export const DistrictSelectionPage: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedBlockId, setSelectedBlockId] = useState('');
  const navigate = useNavigate();

  const blocksForSelectedDistrict = useMemo(() => {
    if (!selectedDistrictId) return [];
    return DISTRICT_BLOCK_MAP[selectedDistrictId]?.blocks || [];
  }, [selectedDistrictId]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrictId(e.target.value);
    setSelectedBlockId(''); // Reset block selection when district changes
  };

  const handleProceed = () => {
    if (!selectedDistrictId || !selectedBlockId) return;

    const district = DISTRICT_BLOCK_MAP[selectedDistrictId];
    const block = district.blocks.find(b => b.id === selectedBlockId);

    if (district && block) {
      navigate('/login/dmmu', {
        state: {
          districtName: district.name,
          blockName: block.name,
          blockId: block.id,
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 border">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">DMMU Login</h1>
          <p className="mt-2 text-sm text-gray-600">Select your district and block to continue</p>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="district-select" className="block text-sm font-medium text-gray-700">
              District Name
            </label>
            <select
              id="district-select"
              value={selectedDistrictId}
              onChange={handleDistrictChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>-- Select a District --</option>
              {DMMU_DATA.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {selectedDistrictId && (
            <div>
              <label htmlFor="block-select" className="block text-sm font-medium text-gray-700">
                Block Name
              </label>
              <select
                id="block-select"
                value={selectedBlockId}
                onChange={(e) => setSelectedBlockId(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>-- Select a Block --</option>
                {blocksForSelectedDistrict.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleProceed}
            disabled={!selectedDistrictId || !selectedBlockId}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
};