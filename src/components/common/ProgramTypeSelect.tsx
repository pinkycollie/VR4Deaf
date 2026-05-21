import React from 'react';

const PROGRAM_TYPES = [
  { value: 'VR', label: 'Vocational Rehabilitation' },
  { value: 'TICKET_TO_WORK', label: 'SSA Ticket to Work' },
  { value: 'SBA', label: 'SBA / Entrepreneurship' },
  { value: 'WORKFORCE', label: 'Workforce Development' },
  { value: 'OTHER', label: 'Other' },
] as const;

type ProgramType = typeof PROGRAM_TYPES[number]['value'];

interface ProgramTypeSelectProps {
  value: ProgramType | '';
  onChange: (value: ProgramType) => void;
}

export const ProgramTypeSelect: React.FC<ProgramTypeSelectProps> = ({ value, onChange }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value as ProgramType)}
    className="w-full p-3 border rounded-lg"
    required
  >
    <option value="">Select Program Type</option>
    {PROGRAM_TYPES.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
