'use client';
import { Card, Button } from 'react-bootstrap';
import { Field } from '../types/fieldTypes';

interface Props {
  formFields: Field[];
  onRemoveField: (id: string) => void;
}

export default function FormBuilderArea({ formFields, onRemoveField }: Props) {
  return (
    <div>
      <h5>Form Preview</h5>
      {formFields.length === 0 && <p>No fields added yet</p>}
      {formFields.map((field) => (
        <Card key={field.id} className="mb-2 p-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>{field.label}</span>
            <Button size="sm" variant="danger" onClick={() => onRemoveField(field.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
