import React, { useState, useMemo } from 'react';

// ----- Type Definitions -----
export type SortDirection = 'ascending' | 'descending';
export type SortConfig<T> = { key: keyof T; direction: SortDirection } | null;

export interface FilterConfig<T> {
  key: keyof T;
  options: string[];
  label: string;
}

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableWithDetailsProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  filters?: FilterConfig<T>[];
  searchPlaceholder?: string;
  getSearchFields?: (item: T) => string[];
  renderDetails?: (item: T, onClose: () => void) => React.ReactNode;
  titleColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

export function DataTableWithDetails<T extends { id: string | number }>({
  title,
  data,
  columns,
  itemsPerPage = 10,
  filters = [],
  searchPlaceholder = 'Search...',
  getSearchFields,
  renderDetails,
  titleColor = '#6770d2',
  borderColor = '#e5e7eb',
  hoverColor = '#eef2ff',
}: DataTableWithDetailsProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // Handle sorting
  const handleSort = (key: keyof T) => {
    setSortConfig(prev => {
      if (prev?.key === key && prev.direction === 'ascending') {
        return { key, direction: 'descending' };
      }
      return { key, direction: 'ascending' };
    });
  };

  // Apply filtering, searching, and sorting
  const filteredAndSorted = useMemo(() => {
    let filtered = [...data];

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => String(item[key as keyof T]) === value);
      }
    });

    // Apply search
    if (searchTerm && getSearchFields) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        getSearchFields(item).some(field => field?.toLowerCase().includes(lower))
      );
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === valB) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;
        return sortConfig.direction === 'ascending'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return filtered;
  }, [data, activeFilters, searchTerm, sortConfig, getSearchFields]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset filters + search
  const handleReset = () => {
    setActiveFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md border space-y-4"
      style={{ borderColor }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4" style={{ color: titleColor }}>
        {title}
      </h2>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 lg:col-span-3"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        {filters.map(filter => (
          <select
            key={String(filter.key)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={activeFilters[String(filter.key)] || ''}
            onChange={e => {
              setActiveFilters(prev => ({ ...prev, [filter.key]: e.target.value }));
              setCurrentPage(1);
            }}
          >
            <option value="">All {filter.label}</option>
            {filter.options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
        {filters.length > 0 && (
          <button
            onClick={handleReset}
            className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium lg:col-start-3"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <p className="text-sm text-gray-600 mb-2">
          Showing {paginated.length} of {filteredAndSorted.length} records
        </p>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                >
                  {col.label}
                  {sortConfig?.key === col.key && (
                    <span className="ml-1 text-gray-400">
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map(item => (
              <tr
                key={item.id}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => setSelectedItem(item)}
                style={
                  { '--hover-color': hoverColor } as React.CSSProperties
                }
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Details Modal */}
      {selectedItem && renderDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {renderDetails(selectedItem, () => setSelectedItem(null))}
          </div>
        </div>
      )}
    </div>
  );
}
