'use client';
import { useEffect, useState } from 'react';
import { Field } from '../../types/fieldTypes.ts';
import AppNavbar from '../../components/NavBar.tsx';

export default function PreviewPage() {
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedFields = localStorage.getItem("formFields");
    const storedDescription = localStorage.getItem("description");

    if (storedFields) setFormFields(JSON.parse(storedFields));
    if (storedDescription) setDescription(storedDescription);
  }, []);

  return (
    <>
      <AppNavbar />
      <div style={{
        backgroundColor: "#f1f3f4",
        minHeight: "100vh",
        padding: "30px"
      }}>
        <div style={{
          maxWidth: "640px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "30px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginBottom: "10px", color: "#202124" }}>Job Application Form</h2>
          {description && (
            <p style={{ marginBottom: "20px", color: "#5f6368" }}>{description}</p>
          )}
          <form>
            {formFields.map((field) => {
              return (
                <div key={field.id} style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: 500,
                    marginBottom: "6px",
                    color: "#202124"
                  }}>
                    {field.label}
                  </label>

                  {["text", "email", "number", "date", "url"].includes(field.type) && (
                    <input
                      type={field.type}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dadce0",
                        borderRadius: "4px",
                        outline: "none",
                        fontSize: "14px"
                      }}
                      onFocus={(e) => e.target.style.border = "2px solid #673ab7"}
                      onBlur={(e) => e.target.style.border = "1px solid #dadce0"}
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dadce0",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    >
                      {field.options?.map((opt, idx) => (
                        <option key={idx}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {field.type === "multiselect" && (
                    <select
                      multiple
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dadce0",
                        borderRadius: "4px",
                        fontSize: "14px",
                        height: "100px"
                      }}
                    >
                      {field.options?.map((opt, idx) => (
                        <option key={idx}>{opt}</option>
                      ))}
                    </select>
                  )}

                  {field.type === "file" && (
                    <input
                      type="file"
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #dadce0",
                        borderRadius: "4px"
                      }}
                    />
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              style={{
                backgroundColor: "#673ab7",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
