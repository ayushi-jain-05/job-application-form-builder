'use client';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function PublishedFormsDropdown() {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("publishedForms");
    if (saved) setForms(JSON.parse(saved));
  }, []);

  return (
    <Dropdown align="end" className="ms-3">
      <Dropdown.Toggle variant="secondary" size="sm">
        Published Forms
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {forms.map((form: any) => (
          <Dropdown.Item key={form.id} onClick={() => router.push(`/forms/${form.id}`)}>
            {form.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}