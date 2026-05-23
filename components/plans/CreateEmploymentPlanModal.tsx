import React, { useState } from 'react';
import { ProgramTypeSelect } from '../common/ProgramTypeSelect';

interface CreateEmploymentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: any) => void;
}

export const CreateEmploymentPlanModal: React.FC<CreateEmploymentPlanModalProps> = ({
  isOpen, onClose, onSave
}) => {
  const [form, setForm] = useState({
    beneficiaryName: '',
    programType: '' as '' | 'VR' | 'TICKET_TO_WORK' | 'SBA' | 'WORKFORCE' | 'OTHER',
    status: 'Draft' as 'Draft' | 'Active',
  });

  const handleSave = () => {
    const plan = {
      id: `plan_${Date.now()}`,
      ...form,
      createdAt: new Date().toISOString(),
      // Future: add consent flags, data retention metadata, etc.
    };
    onSave(plan);
    console.log('Employment Plan Draft Created:', plan); // temporary
    onClose();
    // TODO: later → call API
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">New Employment Plan</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Beneficiary Name</label>
            <input
              type="text"
              value={form.beneficiaryName}
              onChange={(e) => setForm({ ...form, beneficiaryName: e.target.value })}
              className="w-full p-3 border rounded-lg"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Program Type</label>
            <ProgramTypeSelect
              value={form.programType}
              onChange={(val) => setForm({ ...form, programType: val })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Initial Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as any })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.beneficiaryName || !form.programType}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};
