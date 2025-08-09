export type FieldType =
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'multiselect'
  | 'singleselect'
  | 'number';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
}