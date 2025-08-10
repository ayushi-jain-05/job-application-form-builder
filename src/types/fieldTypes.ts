export type FieldType =
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'multiselect'
  | 'singleselect'
  | 'number'
  | 'email'
  | 'date'
  | 'url'
  | 'file';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  isNew?: boolean;
  options?: string[];
}