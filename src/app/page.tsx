'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppNavbar from '../components/NavBar.tsx';
import EditForm from '../components/EditForm.tsx';

export default function HomePage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppNavbar />
      <EditForm />
    </DndProvider>
  );
}
