'use client';
import { Card } from 'react-bootstrap';
import { Field } from '../types/fieldTypes.ts';
import { useDrag } from 'react-dnd';
import { useRef } from 'react';

interface Props {
  fields: Field[];
  onAddField: (field: Field) => void;
}

export default function FieldPanel({ fields, onAddField }: Props) {
  return (
    <div>
      <h5>Available Fields</h5>
      {fields.map((field) => (
        <DraggableField key={field.id} field={field} onAddField={onAddField} />
      ))}
    </div>
  );
}

function DraggableField({ field, onAddField }: { field: Field; onAddField: (f: Field) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    item: field,
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onAddField(field);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Create a ref for the DOM node
  const ref = useRef<HTMLDivElement>(null);
  // Pass the DOM ref to react-dnd drag function
  drag(ref);

  return (
    <Card
      className="mb-2 p-2"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      {/* Attach ref to a div inside the Card */}
      <div ref={ref} className="d-flex justify-content-between align-items-center">
        <span>{field.label}</span>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onAddField(field)}
          disabled={isDragging}
        >
          Add
        </button>
      </div>
    </Card>
  );
}
