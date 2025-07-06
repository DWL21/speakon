import React from 'react';

interface ScriptInputModalContentProps {
  children: React.ReactNode;
}

export const ScriptInputModalContent: React.FC<ScriptInputModalContentProps> = ({
  children
}) => {
  return (
    <div style={contentStyle}>
      <div style={contentWrapperStyle}>
        {children}
      </div>
    </div>
  );
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const contentWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  width: '100%',
  height: '100%',
  gap: '20px',
}; 