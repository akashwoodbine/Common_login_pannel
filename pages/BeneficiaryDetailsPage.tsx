
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { BENEFICIARY_DATA } from '../beneficiaryData';
import { Beneficiary, LoginType } from '../types';
import { SortAscIcon, SortDescIcon } from '../components/Icons';

const ITEMS_PER_PAGE = 10;
type SortKey = keyof Beneficiary;

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <dt className="font-medium text-gray-500 truncate">{label}</dt>
    <dd className="text-gray-900 mt-1">{value || <span className="text-gray-400">N/A</span>}</dd>
  </div>
);

const BeneficiaryDetailsModal: React.FC<{ beneficiary: Beneficiary | null; onClose: () => void }> = ({ beneficiary, onClose }) => {
  if (!beneficiary) return null;

  const detailSections = {
    "Personal Information": [
      { label: "Member Name", value: beneficiary.memberName },
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
        { label: "Education", value: beneficiary.education },
        { label: "Primary Livelihood", value: beneficiary.primaryLivelihoods },
        { label: "Secondary Livelihood", value: beneficiary.secondaryLivelihoods },
        { label: "Tertiary Livelihood", value: beneficiary.tertiaryLivelihoods },
    ],
    "Bank Details": [
      { label: "Bank Name", value: beneficiary.bankName },
      { label: "Branch Name", value: beneficiary.branchName },
      { label: "Account Number", value: beneficiary.accountNumber },
      { label: "IFSC", value: beneficiary.ifsc },
      { label: "Account Type", value: beneficiary.accountType },
      { label: "Opening Date", value: beneficiary.accountOpeningDate },
    ],
    "Identification & Status": [
      { label: "Member Code", value: <span className="font-mono">{beneficiary.memberCode}</span> },
      { label: "Mobile No.", value: beneficiary.mobileNo },
      { label: "Aadhaar KYC", value: beneficiary.aadhaarKYC },
      { label: "eKYC", value: beneficiary.eKYC },
      { label: "NRLM MIS ID", value: beneficiary.nrlmMisId },
      { label: "Approval Status", value: beneficiary.approvalStatus },
      { label: "Status", value: <StatusBadge status={beneficiary.status} /> },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">{beneficiary.memberName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
          {Object.entries(detailSections).map(([title, details]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">{title}</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                {details.map(item => <DetailItem key={item.label} label={item.label} value={item.value} />)}
              </dl>
            </div>
          ))}
        </div>
        <div className="p-4 border-t text-right sticky bottom-0 bg-gray-50">
           <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: 'ACTIVE' | 'INACTIVE' }> = ({ status }) => {
  const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  const activeClasses = "bg-green-100 text-green-800";
  const inactiveClasses = "bg-red-100 text-red-800";
  return (
    <span className={`${baseClasses} ${status === 'ACTIVE' ? activeClasses : inactiveClasses}`}>
      {status}
    </span>
  );
};


export const BeneficiaryDetailsPage: React.FC = () => {
  const { user } = useAuth();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [shgNameFilter, setShgNameFilter] = useState('');
  const [socialCategoryFilter, setSocialCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'INACTIVE' | ''>('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' } | null>({ key: 'memberName', direction: 'ascending' });
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  useEffect(() => {
    if (user) {
      const filteredData = BENEFICIARY_DATA.filter(b => {
        if (user.type === LoginType.BMMU) return b.block === user.name;
        if (user.type === LoginType.DMMU) return b.district === user.districtName;
        return false;
      });
      setBeneficiaries(filteredData);
    }
  }, [user]);

  const uniqueVillages = useMemo(() => [...new Set(beneficiaries.map(b => b.village))].sort(), [beneficiaries]);
  const uniqueShgNames = useMemo(() => [...new Set(beneficiaries.map(b => b.shgName))].sort(), [beneficiaries]);
  const uniqueSocialCategories = useMemo(() => [...new Set(beneficiaries.map(b => b.socialCategory))].sort(), [beneficiaries]);

  const filteredAndSortedBeneficiaries = useMemo(() => {
    let filtered = [...beneficiaries]
      .filter(item => villageFilter ? item.village === villageFilter : true)
      .filter(item => shgNameFilter ? item.shgName === shgNameFilter : true)
      .filter(item => socialCategoryFilter ? item.socialCategory === socialCategoryFilter : true)
      .filter(item => statusFilter ? item.status === statusFilter : true)
      .filter(item => {
        if (!searchTerm) return true;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return item.memberName.toLowerCase().includes(lowerCaseSearch) ||
               item.memberCode.toLowerCase().includes(lowerCaseSearch) ||
               item.shgCode.toLowerCase().includes(lowerCaseSearch);
      });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [beneficiaries, searchTerm, villageFilter, shgNameFilter, socialCategoryFilter, statusFilter, sortConfig]);

  const resetFilters = () => {
    setSearchTerm('');
    setVillageFilter('');
    setShgNameFilter('');
    setSocialCategoryFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const paginatedBeneficiaries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedBeneficiaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedBeneficiaries, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBeneficiaries.length / ITEMS_PER_PAGE);

  const handleSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const welcomeContent = (
    <p className="text-lg">
      Viewing beneficiary data for <span className="font-semibold">{user?.type === LoginType.BMMU ? `${user.name} Block` : `${user?.districtName} District`}</span>.
    </p>
  );

  const TableHeader: React.FC<{ sortKey: SortKey, label: string }> = ({ sortKey, label }) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(sortKey)}>
      <div className="flex items-center">{label} {sortConfig?.key === sortKey && <span className="ml-1">{sortConfig.direction === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>}</div>
    </th>
  );

  return (
    <DashboardLayout title="Beneficiary Details" welcomeContent={welcomeContent}>
      {selectedBeneficiary && <BeneficiaryDetailsModal beneficiary={selectedBeneficiary} onClose={() => setSelectedBeneficiary(null)} />}
      <div className="bg-white p-6 rounded-lg shadow-md border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input type="text" placeholder="Search by name, member/SHG code..." className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 lg:col-span-3" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={villageFilter} onChange={e => { setVillageFilter(e.target.value); setCurrentPage(1); }}><option value="">All Villages</option>{uniqueVillages.map(v => <option key={v} value={v}>{v}</option>)}</select>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={shgNameFilter} onChange={e => { setShgNameFilter(e.target.value); setCurrentPage(1); }}><option value="">All SHG Names</option>{uniqueShgNames.map(name => <option key={name} value={name}>{name}</option>)}</select>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={socialCategoryFilter} onChange={e => { setSocialCategoryFilter(e.target.value); setCurrentPage(1); }}><option value="">All Social Categories</option>{uniqueSocialCategories.map(sc => <option key={sc} value={sc}>{sc}</option>)}</select>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={statusFilter} onChange={e => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}><option value="">All Statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select>
          <button onClick={resetFilters} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium lg:col-start-3">Reset Filters</button>
        </div>
        <div className="overflow-x-auto">
            <p className="text-sm text-gray-600 mb-2">Showing {paginatedBeneficiaries.length} of {filteredAndSortedBeneficiaries.length} records. Click a row to see full details.</p>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr>
                    <TableHeader sortKey="memberName" label="Member Name" />
                    <TableHeader sortKey="shgName" label="SHG Name" />
                    <TableHeader sortKey="village" label="Village" />
                    <TableHeader sortKey="designationInSHG" label="Designation" />
                    <TableHeader sortKey="socialCategory" label="Category" />
                    <TableHeader sortKey="status" label="Status" />
                </tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBeneficiaries.map(b => (
                        <tr key={b.id} className="hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => setSelectedBeneficiary(b)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.memberName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.shgName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.village}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.designationInSHG}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.socialCategory}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={b.status} /></td>
                        </tr>
                    ))}
                    {paginatedBeneficiaries.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-500">No matching beneficiaries found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
         {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
