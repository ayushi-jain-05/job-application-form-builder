"use client"
import { useEffect, useState } from 'react';
import { Form, InputGroup, Button, FormControl } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function PublishToggle() {
  const [isPublished, setIsPublished] = useState(false);
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [publicLink, setPublicLink] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedFields = localStorage.getItem("formFields");
    const storedDescription = localStorage.getItem("description");

    if (!storedFields) return;

    const existingId = localStorage.getItem('formId') || uuidv4();
    setFormId(existingId);
    localStorage.setItem('formId', existingId);

    const name = `Form ${Date.now()}`;
    setFormName(name);

    // Save form-specific data
    localStorage.setItem(`form_${existingId}`, storedFields);
    localStorage.setItem(`description_${existingId}`, storedDescription || '');

    // Add to published forms list if not already added
    const publishedForms = JSON.parse(localStorage.getItem('publishedForms') || '[]');
    const exists = publishedForms.find((f: any) => f.id === existingId);
    if (!exists) {
      publishedForms.push({ id: existingId, name });
      localStorage.setItem('publishedForms', JSON.stringify(publishedForms));
    }

    const status = localStorage.getItem(`isPublished_${existingId}`);
    if (status === "true") setIsPublished(true);

    setPublicLink(`${window.location.origin}/forms/${existingId}`);
  }, []);

  const handleToggle = () => {
    const newStatus = !isPublished;
    setIsPublished(newStatus);
    localStorage.setItem(`isPublished_${formId}`, newStatus.toString());
  };

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(publicLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <Form.Check
        type="switch"
        id="publish-switch"
        label="Publish"
        checked={isPublished}
        onChange={handleToggle}
      />
      {isPublished && publicLink && (
        <InputGroup className="mt-2">
          <FormControl value={publicLink} readOnly size="sm" />
          <Button variant="light" size="sm" onClick={handleCopy}>Copy</Button>
        </InputGroup>
      )}
    </div>
  );
}