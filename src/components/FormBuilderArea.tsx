'use client';
import { Field } from '../types/fieldTypes.tsx';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import DraggableFormField from './DraggableFormField.tsx';

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
    <div
      ref={ref}
      style={{
        flex: 1,
        border: "2px dashed #ccc",
        padding: "10px",
        minHeight: "400px",
        backgroundColor: isOver ? "#f8f9fa" : "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h3>Form Builder Area</h3>
      {formFields.length === 0 && (
        <p style={{ color: "#888" }}>Drag fields here</p>
      )}
      {formFields.map((field, index) => (
        <DraggableFormField
          key={field.id}
          field={field}
          index={index}
          moveFormField={moveFormField}
          onRemove={onRemoveField}
        />
      ))}

      {/* Submit button below form fields */}
      {formFields.length > 0 && (
        <button
          style={{
            marginTop: "auto",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => alert("Form submitted!")}
        >
          Submit
        </button>
      )}
    </div>
  );
}
