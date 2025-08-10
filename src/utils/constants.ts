import { Field } from "../types/fieldTypes.ts";

// Master list (original order)
export const MASTER_FIELDS: Field[] = [
  { id: '1', type: 'text', label: 'Candidate Name' },
  { id: '2', type: 'email', label: 'Email' },
  { id: '3', type: 'multiselect', label: 'Position Applying For', options: ['Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer'] },
  { id: '4', type: 'number', label: 'Mobile Number' },
  { id: '5', type: 'date', label: 'Last Working Day (if Any)' },
  { id: '6', type: 'multiselect', label: 'Skills', options: ['JS', 'React', 'Node', 'MongoDB'] },
  { id: '7', type: 'url', label: 'Any Website/Social Media Profile Link' },
  { id: '8', type: 'number', label: 'Expected Salary' },
  { id: '9', type: 'text', label: 'Highest Qualification' },
  { id: '10', type: 'dropdown', label: 'Experience (Years)', options: ['-', '0-2', '3-5', '6+'] },
  { id: '11', type: 'file', label: 'Upload Resume' }
];