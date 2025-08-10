'use client';
import Link from 'next/link.js';
import { useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { usePathname } from 'next/navigation.js';

export default function AppNavbar() {
  const pathname = usePathname();
  const [isPublished, setIsPublished] = useState(false);
  const handleToggle = () => { 
    setIsPublished(!isPublished);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Navbar.Brand>Job Application Form Builder</Navbar.Brand>
      <Nav className="mx-auto">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Edit</Link>
        <Link href="/preview" className="nav-link">Preview</Link>
      </Nav>
      <Form.Switch 
        id="published-switch"
        label="Publish"
        checked={isPublished}
        onChange={handleToggle}
        className="text-white"
      />
    </Navbar>
  );
}
