'use client';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Field } from '../types/fieldTypes.ts';
import FieldIcon from './FieldIcon.tsx';

interface Props {
  field: Field;
  index: number;
  moveFormField: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: string) => void;
}

export default function DraggableFormField({ field, index, moveFormField, onRemove }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'FIELD',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveFormField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '5px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* <span>{field.label}</span> */}
      <div className="d-flex align-items-center gap-2">
        <FieldIcon type={field.type} />

        <span>{field.label}</span>
      </div>

      <Button
        variant="danger"
        size="sm"
        onClick={() => onRemove(field.id)}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
}