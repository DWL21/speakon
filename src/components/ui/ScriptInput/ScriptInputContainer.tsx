import React from 'react';

interface ScriptInputContainerProps {
  children: React.ReactNode;
}

export const ScriptInputContainer: React.FC<ScriptInputContainerProps> = ({
  children
}) => {
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '1050px',
  height: '650px',
  background: '#FFFFFF',
  borderRadius: '32px',
  overflow: 'hidden',
}; 