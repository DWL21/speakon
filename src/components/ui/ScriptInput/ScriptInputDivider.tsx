import React from 'react';

export const ScriptInputDivider: React.FC = () => {
  return <div style={verticalDividerStyle} />;
};

const verticalDividerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px',
  width: '1px',
  height: '100%',
  background: '#EEEEEE',
  flex: 'none',
  flexShrink: 0,
}; 