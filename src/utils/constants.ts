import { Field } from "../types/fieldTypes.ts";

export const MASTER_FIELDS: Field[] = [
  { key: 'candidateName', id: '1', type: 'text', label: 'Candidate Name' },
  { key: 'email', id: '2', type: 'email', label: 'Email' },
  {
    key: 'position',
    id: '3',
    type: 'multiselect',
    label: 'Position Applying For',
    options: ['Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer']
  },
  { key: 'mobile', id: '4', type: 'number', label: 'Mobile Number' },
  { key: 'lastWorkingDay', id: '5', type: 'date', label: 'Last Working Day (if Any)' },
  {
    key: 'skills',
    id: '6',
    type: 'multiselect',
    label: 'Skills',
    options: ['JS', 'React', 'Node', 'MongoDB']
  },
  { key: 'socialLink', id: '7', type: 'url', label: 'LinkedIn Profile Link' },
  { key: 'expectedSalary', id: '8', type: 'number', label: 'Expected Salary' },
  { key: 'qualification', id: '9', type: 'text', label: 'Highest Qualification' },
  {
    key: 'experience',
    id: '10',
    type: 'dropdown',
    label: 'Experience (Years)',
    options: ['-', '0-2', '3-5', '6+']
  },
  { key: 'resume', id: '11', type: 'file', label: 'Upload Resume' }
];