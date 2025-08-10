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
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <PublishedFormsDropdown/>
      <Nav className="mx-auto">
      <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          <FaEdit className="me-2" />
          Edit
        </Link>
        <Link href="/preview" className={`nav-link ${pathname === "/preview" ? "active" : ""}`}>
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