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
  paddingTop: '20px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingBottom: '80px',
  gap: '24px',
  alignItems: 'stretch',
}; 