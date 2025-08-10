'use client';
import { Field } from '../types/fieldTypes.tsx';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DraggableFormField from './DraggableFormField.tsx';
import { useRouter } from 'next/navigation';

interface FormBuilderAreaProps {
  formFields: Field[];
  onDropField: (field: Field) => void;
  onRemoveField: (id: string) => void;
  moveFormField: (dragIndex: number, hoverIndex: number) => void;
}

export default function FormBuilderArea({
  formFields,
  onDropField,
  onRemoveField,
  moveFormField
}: FormBuilderAreaProps) {
  const router = useRouter();
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["FIELD", "FORM_FIELD"],
    drop: (item: any) => {
      if (item.type === "FIELD" && item.isNew) {
        // Drop from left panel
        onDropField({ ...item, isNew: undefined });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  drop(ref);

  return (
    <>
      <div className="mb-3">
        {formFields.map((field, index) => (
          <DraggableFormField
            key={field.id}
            field={field}
            index={index}
            moveFormField={moveFormField}
            onRemove={onRemoveField}
          />
        ))}
      </div>
      <div
        className='mb-3'
        ref={ref}
        style={{
          flex: 1,
          border: "2px dashed #ccc",
          padding: "10px",
          maxHeight: "200px",
          overflowY: "auto",
          backgroundColor: isOver ? "#f8f9fa" : "white",
          display: "flex",
          flexDirection: "column",
          color: "#6c757d",
          textAlign: "center"
        }}
      >
        Add fields by dragging it into this area
      </div>
      <div>
        <button
          style={{
            marginTop: "auto",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%"
          }}
          onClick={(e) => {
            e.preventDefault();
            router.push("/preview")
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
