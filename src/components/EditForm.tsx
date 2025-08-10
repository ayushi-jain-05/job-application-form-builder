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

  // Add field to form
  const handleAddField = useCallback((field: Field) => {
    const newField = {
      ...field,
      id: uuidv4(), // Unique instance id
    };
    setAvailableFields((prev) => prev.filter((f) => f.key !== field.key));
    setFormFields((prev) => [...prev, newField]);
  }, []);

  // Remove field from form
  const handleRemoveField = useCallback((id: string) => {
    setFormFields((prev) => {
      const removedField = prev.find((f) => f.id === id);
      if (!removedField || !removedField.key) return prev;

      setAvailableFields((prevAvailable) => {
        const masterField = MASTER_FIELDS.find((mf) => mf.key === removedField.key);
        if (!masterField) return prevAvailable;

        const alreadyExists = prevAvailable.some((f) => f.key === masterField.key);
        if (alreadyExists) return prevAvailable;

        const updatedAvailable = [...prevAvailable, masterField];

        // Sort to preserve original order
        updatedAvailable.sort(
          (a, b) =>
            MASTER_FIELDS.findIndex((mf) => mf.key === a.key) -
            MASTER_FIELDS.findIndex((mf) => mf.key === b.key)
        );

        return updatedAvailable;
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
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* LEFT PANEL */}
        <Col md={3} className="pt-4">
          <FieldPanel fields={availableFields} onAddField={handleAddField} />
        </Col>

        {/* RIGHT PANEL */}
        <Col
          md={9}
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url('/gradient.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/kroolo_icon.jpg"
              alt="Kroolo Icon"
              style={{
                width: "60px",
                marginBottom: "12px",
                border: "1px solid #ccc", // Light black border
                borderRadius: "4px", // Minor border radius
                padding: "4px", // Optional: adds space inside border
                backgroundColor: "#fff"
              }}
            />

            <h3 style={{ marginBottom: "16px", color: "#333" }}>
              Job Application Form
            </h3>

            <Form.Group
              controlId="formDescription"
              className="mb-3"
              style={{ width: "100%" }}
            >
              <Form.Label>Add Form Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter form description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <div style={{ width: "100%", flex: 1, overflowY: "auto" }}>
              <FormBuilderArea
                formFields={formFields}
                onRemoveField={handleRemoveField}
                moveFormField={moveFormField}
                onDropField={handleAddField}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  );
}