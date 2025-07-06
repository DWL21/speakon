import React from 'react';

interface ScriptInputContentProps {
  children: React.ReactNode;
}

export const ScriptInputContent: React.FC<ScriptInputContentProps> = ({
  children
}) => {
  return (
    <div style={mainContentStyle}>
      {children}
    </div>
  );
};

const mainContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  padding: '20px',
  gap: '24px',
  alignItems: 'stretch',
}; 