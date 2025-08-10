'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Field } from '../../../types/fieldTypes.ts';

export default function PublicFormPage() {
  const { id } = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [description, setDescription] = useState('');
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (typeof window === 'undefined' || !id) return;

    const published = localStorage.getItem(`isPublished_${id}`) === 'true';
    if (!published) return;

    const fields = localStorage.getItem(`form_${id}`);
    const desc = localStorage.getItem(`description_${id}`);

    if (fields) setFormFields(JSON.parse(fields));
    if (desc) setDescription(desc);
    setIsPublished(true);
  }, [id]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Optional: Save submission
    const submissionsKey = `submissions_${id}`;
    const existing = JSON.parse(localStorage.getItem(submissionsKey) || '[]');
    existing.push(formData);
    localStorage.setItem(submissionsKey, JSON.stringify(existing));

    alert('✅ Application submitted!');
    setFormData({});
  };

  if (!isPublished) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "#d9534f" }}>
        <h2>This form is not published.</h2>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "640px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "10px" }}>Job Application Form</h2>
      {description && <p style={{ marginBottom: "20px", color: "#666" }}>{description}</p>}

      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.id} style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
              {field.label}
            </label>

            {["text", "email", "number", "date", "url"].includes(field.type) && (
              <input
                type={field.type}
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            )}

            {field.type === "dropdown" && (
              <select
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="">Select an option</option>
                {field.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "multiselect" && (
              <select
                multiple
                required={field.required}
                onChange={(e) =>
                  handleChange(
                    field.id,
                    Array.from(e.target.selectedOptions).map((o) => o.value)
                  )
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  height: "100px"
                }}
              >
                {field.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "file" && (
              <input
                type="file"
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.files?.[0])}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
