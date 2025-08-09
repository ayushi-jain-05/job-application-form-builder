'use client';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Navbar.Brand>Job Application Form Builder</Navbar.Brand>
      <Nav className="ms-auto">
        <Link href="/" className="nav-link">Edit</Link>
        <Link href="/preview" className="nav-link">Preview</Link>
        <Link href="/publish" className="nav-link">Publish</Link>
      </Nav>
    </Navbar>
  );
}
