'use client';
import { Card, Button } from 'react-bootstrap';
import { Field } from '../types/fieldTypes';

interface Props {
  fields: Field[];
  onAddField: (field: Field) => void;
}

export default function FieldPanel({ fields, onAddField }: Props) {
  return (
    <div>
      <h5>Available Fields</h5>
      {fields.map((field) => (
        <Card key={field.id} className="mb-2 p-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>{field.label}</span>
            <Button size="sm" onClick={() => onAddField(field)}>
              Add
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
