'use client';
import { useState } from 'react';
import FieldPanel from './FieldPanel';
import FormBuilderArea from './FormBuilderArea';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Field } from '../types/fieldTypes';

export default function EditForm() {
  const [availableFields, setAvailableFields] = useState<Field[]>([
    { id: uuidv4(), type: 'text', label: 'Text Field' },
    { id: uuidv4(), type: 'textarea', label: 'Text Area' },
    { id: uuidv4(), type: 'dropdown', label: 'Dropdown' },
    { id: uuidv4(), type: 'multiselect', label: 'Multi Select' },
    { id: uuidv4(), type: 'singleselect', label: 'Single Select' },
    { id: uuidv4(), type: 'number', label: 'Number' },
  ]);

  const [formFields, setFormFields] = useState<Field[]>([]);

  const handleAddField = (field: Field) => {
    setFormFields([...formFields, field]);
    setAvailableFields(availableFields.filter((f) => f.id !== field.id));
  };

  const handleRemoveField = (id: string) => {
    const removed = formFields.find((f) => f.id === id);
    if (removed) {
      setAvailableFields([...availableFields, removed]);
    }
    setFormFields(formFields.filter((f) => f.id !== id));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <FieldPanel fields={availableFields} onAddField={handleAddField} />
        </Col>
        <Col md={8}>
          <FormBuilderArea formFields={formFields} onRemoveField={handleRemoveField} />
        </Col>
      </Row>
    </Container>
  );
}
