import { useState } from 'react';
import { Flag } from 'lucide-react';
import { FilterDropdown } from '@/components/shared/filter-dropdown';
import { useFlowStore } from '@/store/flow-store';

export function FlowFilterBar() {
  const { filters, updateFilters } = useFlowStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const statusOptions = [
    { key: 'all', label: 'All Status' },
    { key: 'pending', label: 'Pending' },
    { key: 'awaiting', label: 'Awaiting' },
    { key: 'actioning', label: 'Actioning' },
  ];

  const priorityOptions = [
    { key: 'all', label: 'All Priority' },
    { key: 'critical', label: 'Critical', icon: <Flag className="w-3 h-3 text-red-500 fill-red-500" strokeWidth={2} /> },
    { key: 'high', label: 'High', icon: <Flag className="w-3 h-3 text-orange-400 fill-orange-400" strokeWidth={2} /> },
    { key: 'medium', label: 'Medium', icon: <Flag className="w-3 h-3 text-yellow-500 fill-yellow-500" strokeWidth={2} /> },
    { key: 'low', label: 'Low', icon: <Flag className="w-3 h-3 text-gray-300 fill-gray-300" strokeWidth={2} /> },
  ];

  const assigneeOptions = [
    { key: 'all', label: 'Everyone' },
    { key: 'me', label: 'Assigned to Me' },
    { key: 'other', label: 'Others' },
  ];

  return (
    <div className="px-6 py-3 flex items-center gap-2 shrink-0 border-b border-gray-100 bg-white relative z-30">
      <FilterDropdown
        label="Status"
        value={filters.status}
        options={statusOptions}
        isOpen={openDropdown === 'status'}
        onToggle={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
        onSelect={(k) => { updateFilters({ status: k }); setOpenDropdown(null); }}
      />
      <FilterDropdown
        label="Priority"
        value={filters.priority}
        options={priorityOptions}
        isOpen={openDropdown === 'priority'}
        onToggle={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
        onSelect={(k) => { updateFilters({ priority: k }); setOpenDropdown(null); }}
      />
      <FilterDropdown
        label="Assignee"
        value={filters.assignee}
        options={assigneeOptions}
        isOpen={openDropdown === 'assignee'}
        onToggle={() => setOpenDropdown(openDropdown === 'assignee' ? null : 'assignee')}
        onSelect={(k) => { updateFilters({ assignee: k }); setOpenDropdown(null); }}
      />

      {openDropdown && (
        <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
      )}
    </div>
  );
}
