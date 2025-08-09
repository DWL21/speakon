import React from 'react';

interface ScriptModalContainerProps {
  children: React.ReactNode;
}

export const ScriptModalContainer: React.FC<ScriptModalContainerProps> = ({
  children
}) => {
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '32px',
  width: '1050px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}; 