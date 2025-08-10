'use client';
import {
  FaFont, FaEnvelope, FaHashtag, FaCalendarAlt,
  FaList, FaLink, FaFileUpload, FaUserTie
} from 'react-icons/fa';

export default function FieldIcon({ type }: { type: string }) {
  const icon = getIcon(type);
  const bgColor = getColor(type);

  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      {icon}
    </div>
  );
}

// Icon lookup
function getIcon(type: string) {
  switch (type) {
    case 'text':
      return <FaFont size={12} />;
    case 'email':
      return <FaEnvelope size={12} />;
    case 'number':
      return <FaHashtag size={12} />;
    case 'date':
      return <FaCalendarAlt size={12} />;
    case 'dropdown':
    case 'multiselect':
      return <FaList size={12} />;
    case 'url':
      return <FaLink size={12} />;
    case 'file':
      return <FaFileUpload size={12} />;
    default:
      return <FaUserTie size={12} />;
  }
}

// Color lookup
function getColor(type: string): string {
  switch (type) {
    case 'text':
      return 'pink';
    case 'email':
      return 'purple';
    case 'number':
      return 'lightgreen';
    case 'date':
      return '#ffcc00';
    case 'dropdown':
    case 'multiselect':
      return '#00bcd4';
    case 'url':
      return '#ff5722';
    case 'file':
      return '#607d8b';
    default:
      return 'gray';
  }
}
