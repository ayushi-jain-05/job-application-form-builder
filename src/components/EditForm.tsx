'use client';
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FieldPanel from './FieldPanel.tsx';
import FormBuilderArea from './FormBuilderArea.tsx';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Field } from '../types/fieldTypes.ts';
import { MASTER_FIELDS } from '../utils/constants.ts';

export default function EditForm() {
  const [description, setDescription] = useState('');
  const [availableFields, setAvailableFields] = useState<Field[]>([...MASTER_FIELDS]);
  const [formFields, setFormFields] = useState<Field[]>([]);

  // Add field to right panel & remove from left
  const handleAddField = useCallback((field: Field) => {
    const newField = { ...field, id: uuidv4() }; // new unique id for right panel
    setAvailableFields((prev) => prev.filter((f) => f.id !== field.id));
    setFormFields((prev) => [...prev, newField]);
  }, []);

  // Remove field from right panel & restore to left
  const handleRemoveField = useCallback((id: string) => {
    setFormFields((prev) => {
      const removedField = prev.find((f) => f.id === id);
      if (!removedField) return prev;

      setAvailableFields((prevAvailable) => {
        // find original master field by type
        const masterField = MASTER_FIELDS.find((mf) => mf.type === removedField.type);
        if (!masterField) return prevAvailable;

        // avoid duplicates in left panel
        if (prevAvailable.some((f) => f.type === masterField.type)) return prevAvailable;

        // insert back in correct order
        const newAvailable = [...prevAvailable, masterField];
        newAvailable.sort(
          (a, b) =>
            MASTER_FIELDS.findIndex((mf) => mf.type === a.type) -
            MASTER_FIELDS.findIndex((mf) => mf.type === b.type)
        );
        return newAvailable;
      });

      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const moveFormField = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormFields((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      return updated;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("formFields", JSON.stringify(formFields));
    localStorage.setItem("description", description);
}, [formFields, description]);

  return (
  <Container className="mt-4">
    <Row>
      {/* LEFT PANEL */}
      <Col md={4}>
        <FieldPanel fields={availableFields} onAddField={handleAddField} />
      </Col>

      {/* RIGHT PANEL */}
      <Col md={8}>
        {/* Description */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Form Description (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter form description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Drag & Drop area */}
        <FormBuilderArea
          formFields={formFields}
          onRemoveField={handleRemoveField}
          moveFormField={moveFormField}
          onDropField={handleAddField}
        />
      </Col>
    </Row>
  </Container>
);
}
