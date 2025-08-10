'use client';
import Link from 'next/link.js';
import { useState } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { usePathname } from 'next/navigation.js';
import PublishToggle from './PublishToggle.tsx';
import PublishedFormsDropdown from './PublishFormsDropdown.tsx';
import { FaEdit, FaEye } from 'react-icons/fa';


export default function AppNavbar() {
  const pathname = usePathname();
  const [isPublished, setIsPublished] = useState(false);
  const handleToggle = () => { 
    setIsPublished(!isPublished);
  };
  return (
    <Navbar bg="white" variant="white" expand="lg" className="px-4">
      <PublishedFormsDropdown/>
      <Nav className="mx-auto gap-2">
        <Link
          href="/"
          className={`nav-link px-3 py-2 border border-black rounded ${
            pathname === "/" ? "bg-light text-dark" : "bg-white text-dark"
          }`}
          style={{ textDecoration: "none" }}
        >
          <FaEdit className="me-2" />
          Edit
        </Link>
        <Link
          href="/preview"
          className={`nav-link px-3 py-2 border border-black rounded ${
            pathname === "/preview" ? "bg-light text-dark" : "bg-white text-dark"
          }`}
          style={{ textDecoration: "none" }}
        >
          <FaEye className="me-2" />
          Preview
        </Link>
      </Nav>

      <div className='ms-3'>
        <PublishToggle/>
      </div>
    </Navbar>
  );
}
