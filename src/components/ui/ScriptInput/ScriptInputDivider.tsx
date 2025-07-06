import React from 'react';

export const ScriptInputDivider: React.FC = () => {
  return <div style={verticalDividerStyle} />;
};

const verticalDividerStyle: React.CSSProperties = {
  width: '1px',
  height: '100%',
  background: '#EEEEEE',
  flex: 'none',
}; 