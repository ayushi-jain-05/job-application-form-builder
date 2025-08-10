'use client';
import { Card } from 'react-bootstrap';
import { Field } from '../types/fieldTypes.ts';
import { useDrag } from 'react-dnd';
import { useRef } from 'react';
import FieldIcon from './FieldIcon.tsx';
import { BiDotsVerticalRounded } from 'react-icons/bi';


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
      <div ref={ref} className="d-flex align-items-center gap-2">
        <div style={{ display: 'flex' }}>
          <BiDotsVerticalRounded size={20} color="#555" />
          <BiDotsVerticalRounded size={20} color="#555" style={{ marginLeft: '-8px' }} />
        </div>
        <FieldIcon type={field.type} />
        <span>{field.label}</span>
      </div>
    </Card>
  );
}