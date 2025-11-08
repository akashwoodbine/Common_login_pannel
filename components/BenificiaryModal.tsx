import React, { useState, useEffect } from 'react';
import { Beneficiary } from '../types';

export const StatusBadge: React.FC<{ status: 'ACTIVE' | 'INACTIVE' }> = ({ status }) => {
    const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    const activeClasses = "bg-green-100 text-green-800";
    const inactiveClasses = "bg-red-100 text-red-800";
    return (
        <span className={`${baseClasses} ${status === 'ACTIVE' ? activeClasses : inactiveClasses}`}>
        {status}
        </span>
    );
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <dt className="font-medium text-gray-500 truncate">{label}</dt>
    <dd className="text-gray-900 mt-1">{value || <span className="text-gray-400">N/A</span>}</dd>
  </div>
);

const EditField: React.FC<{ label: string; name: keyof Beneficiary; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; type?: 'text' | 'select'; options?: {value: string, label: string}[] }> = ({ label, name, value, onChange, type='text', options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        {type === 'select' ? (
            <select id={name} name={name} value={value} onChange={onChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        ) : (
            <input type={type} id={name} name={name} value={value} onChange={onChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        )}
    </div>
);

interface BeneficiaryModalProps {
    beneficiary: Beneficiary | null;
    onClose: () => void;
    onSave: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({ beneficiary, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Beneficiary | null>(beneficiary);

  useEffect(() => {
    setFormData(beneficiary);
    // Exit edit mode if a new beneficiary is selected
    if(isEditing && beneficiary?.id !== formData?.id) {
        setIsEditing(false);
    }
  }, [beneficiary]);

  if (!beneficiary || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSave = () => {
    if (formData) {
        onSave(formData);
        setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(beneficiary);
    setIsEditing(false);
  }

  const detailSections = {
    "Personal Information": [
      { label: "Member Name", value: beneficiary.memberName, name: "memberName" as keyof Beneficiary, editable: true },
      { label: "Date of Birth", value: beneficiary.dateOfBirth },
      { label: "Gender", value: beneficiary.gender },
      { label: "Marital Status", value: beneficiary.maritalStatus },
      { label: "Relation", value: `${beneficiary.fatherMotherSpouseName} (${beneficiary.relation})` },
      { label: "Head of Family", value: beneficiary.isHeadOfFamily },
    ],
    "SHG Information": [
      { label: "SHG Name", value: beneficiary.shgName },
      { label: "SHG Code", value: beneficiary.shgCode },
      { label: "Designation", value: beneficiary.designationInSHG },
      { label: "Date of Joining", value: beneficiary.dateOfJoiningInSHG },
      { label: "Date of Formation", value: beneficiary.dateOfFormation },
    ],
    "Social & Livelihood": [
        { label: "Social Category", value: beneficiary.socialCategory },
        { label: "Religion", value: beneficiary.religion },
        { label: "Education", value: beneficiary.education, name: "education" as keyof Beneficiary, editable: true },
        { label: "Primary Livelihood", value: beneficiary.primaryLivelihoods, name: "primaryLivelihoods" as keyof Beneficiary, editable: true },
        { label: "Secondary Livelihood", value: beneficiary.secondaryLivelihoods },
        { label: "Tertiary Livelihood", value: beneficiary.tertiaryLivelihoods },
    ],
    "Bank Details": [
      { label: "Bank Name", value: beneficiary.bankName, name: "bankName" as keyof Beneficiary, editable: true },
      { label: "Branch Name", value: beneficiary.branchName, name: "branchName" as keyof Beneficiary, editable: true },
      { label: "Account Number", value: beneficiary.accountNumber, name: "accountNumber" as keyof Beneficiary, editable: true },
      { label: "IFSC", value: beneficiary.ifsc, name: "ifsc" as keyof Beneficiary, editable: true },
      { label: "Account Type", value: beneficiary.accountType, name: "accountType" as keyof Beneficiary, editable: true },
      { label: "Opening Date", value: beneficiary.accountOpeningDate, name: "accountOpeningDate" as keyof Beneficiary, editable: true },
    ],
    "Identification & Status": [
      { label: "Member Code", value: <span className="font-mono">{beneficiary.memberCode}</span> },
      { label: "Mobile No.", value: beneficiary.mobileNo, name: "mobileNo" as keyof Beneficiary, editable: true },
      { label: "Aadhaar KYC", value: beneficiary.aadhaarKYC },
      { label: "eKYC", value: beneficiary.eKYC },
      { label: "NRLM MIS ID", value: beneficiary.nrlmMisId },
      { label: "Approval Status", value: beneficiary.approvalStatus },
      { label: "Status", value: <StatusBadge status={beneficiary.status} />, name: "status" as keyof Beneficiary, editable: true, type: 'select' as const, options: [{value: 'ACTIVE', label: 'Active'}, {value: 'INACTIVE', label: 'Inactive'}] },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">{isEditing ? `Editing: ${beneficiary.memberName}`: beneficiary.memberName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
          {Object.entries(detailSections).map(([title, details]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">{title}</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                {details.map(item => 
                  (isEditing && item.editable) ? 
                  <EditField key={item.label} label={item.label} name={item.name!} value={formData[item.name!] as string} onChange={handleChange} type={item.type} options={item.options} /> :
                  <DetailItem key={item.label} label={item.label} value={item.value} />
                )}
              </dl>
            </div>
          ))}
        </div>
        <div className="p-4 border-t text-right sticky bottom-0 bg-gray-50 flex justify-end space-x-2">
           {isEditing ? (
             <>
                <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">Save Changes</button>
             </>
           ) : (
            <>
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">Edit</button>
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Close</button>
            </>
           )}
        </div>
      </div>
    </div>
  );
};